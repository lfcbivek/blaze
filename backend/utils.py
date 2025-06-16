import pandas as pd
import json
from collections import defaultdict
import re
import numpy as np
import ast

SAFE_FORMULAS = {
    'sum': lambda df, col: clean_column_for_numeric(df[col]).sum(),
    'mean': lambda df, col: clean_column_for_numeric(df[col]).mean(),
    'count': lambda df, col: df[col].notna().sum(),
    'max': lambda df, col: clean_column_for_numeric(df[col]).max(),
    'min': lambda df, col: clean_column_for_numeric(df[col]).min()
}

def extract_tool_data_as_json(message):
    """
    Extract tool data from Claude's response and return as JSON string
    
    Args:
        message: Claude API response message
        
    Returns:
        str: JSON string of tool data, or None if no tool was used
    """
    try:
        # Look for tool usage in response
        for content_block in message.content:
            if content_block.type == 'tool_use':
                return content_block.input
        
        # No tool was used
        return None
        
    except Exception as e:
        print(f"Error extracting tool data: {e}")
        return None


def clean_column_for_numeric(series):
    """Safely convert any column to numeric, handling common edge cases"""
    # Convert to string first to handle mixed types
    series_str = series.astype(str)
    
    # Handle common patterns
    cleaned = (series_str
               .str.replace('$', '', regex=False)
               .str.replace(',', '', regex=False)
               .str.replace('%', '', regex=False)
               .str.replace('(', '-', regex=False)  # Accounting format
               .str.replace(')', '', regex=False)
               .str.replace(' ', '', regex=False)
               .replace(['', '-', 'N/A', 'NA', 'null', 'NULL', 'None'], np.nan))
    
    return pd.to_numeric(cleaned, errors='coerce')


def preprocess_csv(df):
    """Clean and standardize CSV data before analysis"""
    df_clean = df.copy()
    
    # Identify likely numeric columns
    numeric_columns = []
    non_numeric_columns = []
    for col in df.columns:
        # Check if column contains mostly numeric-looking data
        sample = df[col].astype(str).str.replace(r'[$,%-]', '', regex=True)
        numeric_count = pd.to_numeric(sample, errors='coerce').notna().sum()
        if numeric_count > len(df) * 0.5:  # More than 50% convertible to numeric
            numeric_columns.append(col)
        else:
            non_numeric_columns.append(col)
    
    # Clean numeric columns
    for col in numeric_columns:
        df_clean[col] = clean_column_for_numeric(df[col])
    
    return df_clean, numeric_columns, non_numeric_columns


def safe_calculate(df, operation, column):
    """Execute calculations safely"""
    try:
        if column not in df.columns:
            return f"Column '{column}' not found"
        print(operation)
        if operation not in SAFE_FORMULAS:
            return f"Operation '{operation}' not supported"
        
        result = SAFE_FORMULAS[operation](df, column)
        
        # Handle NaN results
        if pd.isna(result):
            return f"No valid numeric data found in column '{column}'"
        
        return result
    except Exception as e:
        return f"Calculation error: {str(e)}"

def get_kpi_for_numeric_data(df, numeric_cols, claude_kpi):
    res = defaultdict(list)
    # for col in numeric_cols:
    #     col_data = {}
    #     col_data['col'] = col
    #     for operation in SAFE_FORMULAS.keys():
    #         calculation = safe_calculate(df, operation, col)
    #         col_data[operation] = calculation
    #     res.append(col_data)
    for data in claude_kpi:
        col = data["column"]
        operation = data["operation_name"]

        # Compute the value
        calculation = safe_calculate(df, operation, col)

        # Convert numpy types to native Python types for JSON serialization
        if isinstance(calculation, (np.integer, np.int64, np.int32)):
            calculation = int(calculation)
        elif isinstance(calculation, (np.floating, np.float64, np.float32)):
            calculation = float(calculation)
        elif isinstance(calculation, np.bool_):
            calculation = bool(calculation)
        elif hasattr(calculation, 'item'):  # For numpy scalars
            calculation = calculation.item()

        # Avoid mutating input
        data_copy = data.copy()
        data_copy["value"] = calculation

        # Add to result
        res[col].append(data_copy)
    return res

def identify_date_columns(df, threshold=0.5):
    """
    Identify columns that likely contain date/datetime values
    
    Args:
        df: pandas DataFrame
        threshold: minimum percentage of values that must be parseable as dates (0.5 = 50%)
    
    Returns:
        dict: {column_name: {'confidence': float, 'sample_formats': list, 'parsed_sample': datetime}}
    """
    date_columns = {}
    
    # Common date patterns to look for
    date_patterns = [
        r'\d{4}-\d{2}-\d{2}',  # YYYY-MM-DD
        r'\d{2}-\d{2}-\d{4}',  # MM-DD-YYYY or DD-MM-YYYY
        r'\d{4}/\d{2}/\d{2}',  # YYYY/MM/DD
        r'\d{2}/\d{2}/\d{4}',  # MM/DD/YYYY or DD/MM/YYYY
        r'\d{1,2}/\d{1,2}/\d{4}',  # M/D/YYYY
        r'\d{4}\.\d{2}\.\d{2}',  # YYYY.MM.DD
        r'\d{2}\.\d{2}\.\d{4}',  # MM.DD.YYYY
        r'\w{3}\s+\d{1,2},?\s+\d{4}',  # Jan 1, 2024 or Jan 1 2024
        r'\d{1,2}\s+\w{3}\s+\d{4}',  # 1 Jan 2024
        r'\w{3}-\d{2}-\d{4}',  # Jan-01-2024
        r'\d{4}-\w{3}-\d{2}',  # 2024-Jan-01
    ]
    
    # Date keywords that might appear in column names
    date_keywords = ['date', 'time', 'timestamp', 'created', 'updated', 'modified', 
                     'published', 'started', 'ended', 'due', 'expire', 'birth', 'dob']
    
    for column in df.columns:
        try:
            # Skip if column is already datetime
            if pd.api.types.is_datetime64_any_dtype(df[column]):
                date_columns[column] = {
                    'confidence': 1.0,
                    'sample_formats': ['already_datetime'],
                    'parsed_sample': df[column].dropna().iloc[0] if len(df[column].dropna()) > 0 else None
                }
                continue
            
            # Convert to string for analysis
            series_str = df[column].astype(str).str.strip()
            non_null_series = series_str[series_str.notna() & (series_str != '') & (series_str != 'nan')]
            
            if len(non_null_series) == 0:
                continue
            
            # Check column name for date keywords
            name_score = 0
            column_lower = column.lower()
            for keyword in date_keywords:
                if keyword in column_lower:
                    name_score = 0.3
                    break
            
            # Pattern matching score
            pattern_matches = 0
            sample_formats = []
            
            for pattern in date_patterns:
                matches = non_null_series.str.contains(pattern, regex=True, na=False).sum()
                if matches > 0:
                    pattern_matches += matches
                    sample_formats.append(pattern)
            
            pattern_score = min(pattern_matches / len(non_null_series), 1.0)
            
            # Try to parse a sample of values
            parse_success = 0
            parsed_sample = None
            sample_size = min(100, len(non_null_series))
            sample_data = non_null_series.sample(sample_size) if len(non_null_series) > sample_size else non_null_series
            
            for value in sample_data:
                try:
                    parsed = pd.to_datetime(value, errors='raise', infer_datetime_format=True)
                    if parsed_sample is None:
                        parsed_sample = parsed
                    parse_success += 1
                except:
                    continue
            
            parse_score = parse_success / len(sample_data) if len(sample_data) > 0 else 0
            
            # Combined confidence score
            confidence = max(pattern_score, parse_score) + name_score
            confidence = min(confidence, 1.0)  # Cap at 1.0
            
            # Only include if confidence meets threshold
            if confidence >= threshold:
                date_columns[column] = {
                    'confidence': confidence,
                    'sample_formats': sample_formats,
                    'parsed_sample': parsed_sample,
                    'parse_success_rate': parse_score
                }
                
        except Exception as e:
            continue
    
    return date_columns