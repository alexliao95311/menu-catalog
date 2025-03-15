# backend/routes/restaurant.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Restaurant
from database import SessionLocal
from schemas import RestaurantCreate

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
def create_restaurant(restaurant: RestaurantCreate, db: Session = Depends(get_db)):
    new_restaurant = Restaurant(
        name=restaurant.name,
        description=restaurant.description,
        menu=restaurant.menu,
        price=restaurant.price,
    )
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return new_restaurant