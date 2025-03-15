# backend/main.py
import aiohttp
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import restaurant, translate
from database import engine, Base
from dotenv import load_dotenv
import os

# Adjust the path if necessary. This assumes main.py is in backend/
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))


# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up - creating aiohttp session")
    app.state.session = aiohttp.ClientSession()
    logger.debug(f"Session created: {app.state.session}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutting down - closing aiohttp session")
    await app.state.session.close()
    logger.debug("Session closed")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(restaurant.router, prefix="/restaurants", tags=["restaurants"])
app.include_router(translate.router, prefix="/translate", tags=["translate"])

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend!"}