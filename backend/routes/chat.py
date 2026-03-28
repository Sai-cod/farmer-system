from fastapi import APIRouter

router = APIRouter()

@router.post("/text")
async def chat_text(message: str):
    # Placeholder for NLP model and RAG pipeline
    return {"response": f"Echo in Marathi/English: {message}"}

@router.post("/voice")
async def chat_voice():
    # Placeholder for Speech-to-Text in Marathi
    return {"response": "Processed voice input"}
