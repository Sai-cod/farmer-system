from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "mr-IN"
    context: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    status: str = "success"

class VisionResponse(BaseModel):
    diagnosis: str
    confidence: float
    status: str = "success"

class DBQueryLog(BaseModel):
    user_input: str
    processed_query: str
    response: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DBImageLog(BaseModel):
    filename: str
    diagnosis: str
    confidence: float
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
