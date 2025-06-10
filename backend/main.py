# main.py
import pandas as pd
from io import StringIO
from fastapi import FastAPI, UploadFile, File
import csv


from utils import get_columns_sum
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
    res = get_columns_sum(df, df.columns)
    # Get headers
    headers = df.columns.tolist()
    res['has_headers'] = True
    res['columns'] = headers
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
