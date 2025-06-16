# main.py
import pandas as pd
from io import StringIO
from fastapi import FastAPI, UploadFile, File
from fastapi.encoders import jsonable_encoder
import csv
from claude import claude_api
from prompts import generate_claude_prompt



from utils import preprocess_csv, safe_calculate, get_kpi_for_numeric_data, identify_date_columns
from core.middleware import add_cors_middleware

app = FastAPI()
add_cors_middleware(app)

@app.post("/analyze-file")
async def get_csv_headers(file: UploadFile= File(...)):
    content = await file.read()

    data = content.decode("utf-8")
    #For sniffer
    sample = data[:2048]
    
    #Sniffer to guess if there is header or not
    sniffer = csv.Sniffer()
    has_header = sniffer.has_header(sample)

    if not has_header:
        return {
            "has_headers": False
        }

    # Convert to a DataFrame using pandas
    df = pd.read_csv(StringIO(data))
    res = {}
    # Get headers
    headers = df.columns.tolist()
    res['has_headers'] = True
    res['columns'] = headers
    df_clean, numeric_cols, non_numeric_cols = preprocess_csv(df)
    date_columns = identify_date_columns(df)
    for date_column in date_columns.keys():
        if date_column in numeric_cols:
            numeric_cols.remove(date_column)
        if date_column in non_numeric_cols:
            non_numeric_cols.remove(date_column)
    claude_message_prompt = generate_claude_prompt(headers, df.head())
    claude_response = claude_api(claude_message_prompt)

    numeric_res = get_kpi_for_numeric_data(df, numeric_cols, claude_response["kpi"])
    res['kpi'] = numeric_res
    # res["kpi"] = numeric_res
    # result = arrange_kpi_by_column(claude_response, df)
    return res

@app.get("/get-kpi-data")
def get_kpi_data():
    res = {
        "totals" : [
            {
                'title': 'Purchase',
                'total': 1000,
                'data': [
                    { "time": '2024-01-01', "value": 120 },
                    { "time": '2024-01-02', "value": 130 },
                    { "time": '2024-01-03', "value": 125 },
                    { "time": '2024-01-04', "value": 140 },
                ]
            },
            {
                'title': 'Cost',
                'total': 9000,
                'data': [
                    { "time": '2024-01-01', "value": 830 },
                    { "time": '2024-01-02', "value": 430 },
                    { "time": '2024-01-03', "value": 125 },
                    { "time": '2024-01-04', "value": 740 },
                ]
            },
            {
                'title': 'Revenue',
                'total': 900000000,
                'data': [
                    { "time": '2024-01-01', "value": 830000 },
                    { "time": '2024-01-02', "value": 430000 },
                    { "time": '2024-01-03', "value": 125 },
                    { "time": '2024-01-04', "value": 740000 },
                ]
            },
            {
                'title': 'Revenue',
                'total': 900000000,
                'data': [
                    { "time": '2024-01-01', "value": 830000 },
                    { "time": '2024-01-02', "value": 430000 },
                    { "time": '2024-01-03', "value": 125 },
                    { "time": '2024-01-04', "value": 740000 },
                ]
            }
        ]
    }
    return res
