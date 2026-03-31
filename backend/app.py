from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from routes import chat, vision
from db import db_config, MONGODB_URI, DATABASE_NAME

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    logger.info("Connecting to MongoDB Atlas...")
    try:
        db_config.client = AsyncIOMotorClient(MONGODB_URI)
        db_config.db = db_config.client[DATABASE_NAME]
        
        # Ping to confirm
        await db_config.db.command('ping')
        logger.info("Successfully connected to MongoDB Atlas.")
    except Exception as e:
        logger.error(f"MongoDB connection failed: {e}")
    
    yield
    
    # Shutdown: Close connection
    logger.info("Closing MongoDB connection...")
    if db_config.client:
        db_config.client.close()

app = FastAPI(
    title="Farmer AI Advisory System API",
    description="Backend API services for crop advising and disease detection",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Keep open for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount isolated route controllers
app.include_router(chat.router, prefix="/api/chat", tags=["Chat & Voice"])
app.include_router(vision.router, prefix="/api/vision", tags=["Computer Vision"])

@app.get("/health", tags=["Status"])
async def health_check():
    """Service health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
