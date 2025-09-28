from pydantic import BaseModel

class SamplingParams(BaseModel):
    samplingType: str
    sizeMode: str
    confidenceLevel: str
    marginOfError: float
    manualSize: int
    stratifyColumn: str | None = None
    clusterColumn: str | None = None
    numClusters: int | None = None
