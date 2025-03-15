# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import restaurant
from database import engine, Base

# Create all tables (using SQLite for demo)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for local development (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(restaurant.router, prefix="/restaurants", tags=["restaurants"])

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend!"}