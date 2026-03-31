import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "farmer_ai_db")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_config = Database()

def get_db():
    return db_config.db
