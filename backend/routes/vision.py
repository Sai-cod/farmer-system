from fastapi import APIRouter, File, UploadFile, Depends
from models.schemas import VisionResponse, DBImageLog
from db import get_db

router = APIRouter()

@router.post("/analyze", response_model=VisionResponse)
async def analyze_crop_image(file: UploadFile = File(...), db = Depends(get_db)):
    """
    Upload a crop image and run it against a disease detection model.
    """
    # contents = await file.read()
    # TODO: Connect to PyTorch/Tensorflow model located in /ml-model/
    
    mock_diagnosis = "Placeholder Diagnosis: Healthy Crop detected. No signs of infection."
    confidence_val = 0.98
    
    if db is not None:
        try:
            log_entry = DBImageLog(
                filename=file.filename,
                diagnosis=mock_diagnosis,
                confidence=confidence_val
            )
            await db["image_logs"].insert_one(log_entry.model_dump())
        except Exception as e:
            print(f"Database logging error: {e}")
            
    return VisionResponse(
        diagnosis=mock_diagnosis,
        confidence=confidence_val
    )
