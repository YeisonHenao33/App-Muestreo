import pandas as pd
from fastapi import UploadFile
import io

# Simple in-memory storage for the DataFrame. 
# For a real multi-user app, you'd use a more robust solution (e.g., Redis, a database).
data_storage = {}

async def process_and_summarize_file(file: UploadFile):
    """
    Reads an uploaded file, stores its DataFrame in memory, and returns a summary.
    """
    try:
        content = await file.read()
        
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(content))
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(io.BytesIO(content))
        else:
            return {"error": "Unsupported file format. Please upload a CSV or Excel file."}

        # Store the dataframe in our in-memory storage
        data_storage['latest_df'] = df

        num_rows, num_cols = df.shape
        columns = df.columns.tolist()
        head_data = df.head().to_dict(orient='records')

        return {
            "filename": file.filename,
            "rows": num_rows,
            "columns": num_cols,
            "column_names": columns,
            "head": head_data,
        }
    except Exception as e:
        return {"error": f"An error occurred while processing the file: {str(e)}"}