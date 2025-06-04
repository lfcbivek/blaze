# main.py
import pandas as pd
from io import StringIO
from fastapi import FastAPI, UploadFile, File
import csv


from utils import get_columns_sum
from core.middleware import add_cors_middleware

app = FastAPI()
add_cors_middleware(app)

@app.get("/")
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
    res['headers'] = headers
    return res

@app.get("/get-kpi-data")
def get_kpi_data():
    res = {
        "totals" : [
            {
                'Title': 'Total Purchase',
                'Total': 1000,
            },
            {
                'Title': 'Total Cost',
                'Total': 9000
            }
        ]
    }
    return res
