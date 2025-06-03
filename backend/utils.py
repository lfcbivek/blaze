import pandas as pd


def clean_numeric_column(series):
    # Remove common currency symbols and commas, then convert to float
    return pd.to_numeric(
        series.astype(str)
        .str.replace(r'[^\d\.\-]', '', regex=True), 
        errors='coerce'
    )

def is_mostly_string(series, threshold=0.8):
    cleaned = clean_numeric_column(series)
    numeric_ratio = cleaned.notna().mean()
    return numeric_ratio < (1 - threshold)

# Takes in the list of columns and returns sum of numeric columns
def get_columns_sum(df, columns):
    column_sums = {}
    numeric_columns = []
    print(columns)
    for column in columns:
        is_column_string = is_mostly_string(df[column])
        if not is_column_string:
            cleaned_column = clean_numeric_column(df[column])
            if cleaned_column.notna().sum() > 0:
                col_sum = cleaned_column.sum()
                column_sums[column] = float(col_sum)
                numeric_columns.append(column)
        else:
            continue
    
    return {
        'numeric_columns': numeric_columns,
        'column_sums': column_sums
    }

