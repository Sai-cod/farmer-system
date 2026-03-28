from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.post("/detect-disease")
async def detect_disease(file: UploadFile = File(...)):
    # Placeholder for CNN plant disease base detection
    return {"disease": "Unknown", "confidence": 0.0}
