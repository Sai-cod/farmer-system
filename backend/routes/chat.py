from fastapi import APIRouter, Depends
from models.schemas import ChatRequest, ChatResponse, DBQueryLog
from services.llm_service import process_query
from db import get_db

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def handle_chat(request: ChatRequest, db = Depends(get_db)):
    """
    Process text/translated-voice agricultual query and return an AI advisory response.
    """
    reply_text = await process_query(request.message, request.language)
    
    if db is not None:
        try:
            log_entry = DBQueryLog(
                user_input=request.message,
                processed_query=f"Lang: {request.language} | Context: {request.context or 'None'}",
                response=reply_text
            )
            # Fulfilling the requirement for multiple collections logging:
            log_dict = log_entry.model_dump()
            await db["queries"].insert_one(log_dict)
            await db["responses"].insert_one(log_dict)
        except Exception as e:
            print(f"Database logging error: {e}")

    return ChatResponse(reply=reply_text)
