
from utils import SAFE_FORMULAS
CLAUDE_OUTPUT_FORMAT = """
Expected output format:
{
    "columns": ["Title", "Worldwide", "Domestic", "Domestic percent", "Foreign", "Foreign_percent"],
    "kpi": [
        {
            "column": "Worldwide",
            "kpi_name": "Total Revenue",
            "operation_name": "sum",
            "prefix_symbol": "$",
            "suffix_symbol": ""
        },
        {
            "column": "Domestic percent",
            "kpi_name": "Average Domestic Share",
            "operation_name": "mean",
            "prefix_symbol": "",
            "suffix_symbol": "%"
        },
        // ... more KPI objects
    ]
}
"""

tools = [
    {
        "name": "key_performance_indices_info",
        "description": "Extract key performance indices from the data",
        "input_schema": {
            "type": "object",
            "properties": {
                "columns": {
                    "type": "array",
                    "description": "Column names in the csv data",
                    "items": {
                        "type": "string"
                    }
                },
                "numeric_columns": {
                    "type": "array",
                    "description": "Columns where numeric operations can be performed",
                    "items": {
                        "type": "string"
                    }
                },
                "string_columns": {
                    "type": "array",
                    "description": "Columns with string values where string operation can be performed",
                    "items": {
                        "type": "string"
                    }
                },
                "date_columns": {
                    "type": "array",
                    "description": "Columns with date values in it",
                    "items": {
                        "type": "string"
                    }
                },
                "supported_numeric_operations": {
                    "type": "array",
                    "description": "Numeric operations that are supported by the app for numeric columns",
                    "items": {
                        "type": "string"
                    }
                },
                "kpi": {
                    "type": "array",
                    "description": "KPI operations for each column - array of objects with column name, KPI name, and pandas formula",
                    "items": {
                        "type": "object",
                        "properties": {
                            "column": {"type": "string", "description": "Column name"},
                            "operation_name": {"type": "string", "description": "Name of the operation best suited to perform for the column"},
                            "prefix_symbol": {"type": "string", "description": "Any prefix symbol attached to the data like currency. If no, return empty string"},
                            "suffix_symbol": {"type": "string", "description": "Any suffix symbol attached to the data like %. If no, return empty string"},
                        },
                        "required": ["column", "kpi_name", "operation_name","prefix_symbol", "suffix_symbol"]
                    }
                }
            },
            "required": ["columns", "kpi"]
        }
    }
]

SUPPORTED_NUMERIC_OPERATIONS = str(SAFE_FORMULAS.keys())

def generate_claude_prompt(columns, rows):
    CLAUDE_ANALYST_PROMPT = f'''
        You are a data analyst. Always respond with only valid JSON. Given a dataset with columns {columns} and the first 5 rows of the data {rows} .
        Please provide: 3 key KPIs for each column along with the operation to perform. The supported operations are {SUPPORTED_NUMERIC_OPERATIONS}.
        Output format reference: {CLAUDE_OUTPUT_FORMAT}

    '''
    return CLAUDE_ANALYST_PROMPT