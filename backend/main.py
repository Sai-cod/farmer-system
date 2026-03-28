from fastapi import FastAPI
from .routes import chat, image

app = FastAPI(title="Farmer AI Advisory System", description="API for chatbot and image prediction")

app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(image.router, prefix="/api/image", tags=["Image"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Farmer AI Advisory System API"}
