# backend/routes/restaurant.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Restaurant
from database import SessionLocal

router = APIRouter()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(Restaurant).all()
    return restaurants

@router.post("/")
def create_restaurant(
    name: str,
    description: str = None,
    menu: str = None,
    price: float = None,
    db: Session = Depends(get_db)
):
    new_restaurant = Restaurant(name=name, description=description, menu=menu, price=price)
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return new_restaurant