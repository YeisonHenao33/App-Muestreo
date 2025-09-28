from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from app.services import file_service, sampling_service
from app.models.sampling_models import SamplingParams
import io

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:3000",  # La URL de tu frontend de React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return await file_service.process_and_summarize_file(file)

@app.post("/sample/")
def create_sample(params: SamplingParams):
    result = sampling_service.perform_sampling(params)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/export/")
def export_sample(params: SamplingParams):
    result = sampling_service.perform_sampling(params)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    # Convert list of dicts to DataFrame
    sample_df = file_service.pd.DataFrame(result['sample_data'])
    
    stream = io.StringIO()
    sample_df.to_csv(stream, index=False)
    
    response = StreamingResponse(iter([stream.getvalue()]), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=muestra.csv"
    return response

