# backend/routes/restaurant.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Restaurant, MenuItem
from database import SessionLocal
from schemas import RestaurantCreate, Restaurant as RestaurantSchema
from typing import List

router = APIRouter()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[RestaurantSchema])
def get_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(Restaurant).all()
    return restaurants

@router.post("/", response_model=RestaurantSchema)
def create_restaurant(restaurant: RestaurantCreate, db: Session = Depends(get_db)):
    new_restaurant = Restaurant(
        name=restaurant.name,
        description=restaurant.description,
    )
    # If any menu items are provided, create them and associate with this restaurant.
    if restaurant.menu_items:
        for item in restaurant.menu_items:
            new_menu_item = MenuItem(
                name=item.name,
                description=item.description,
                price=item.price,
            )
            new_restaurant.menu_items.append(new_menu_item)
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return new_restaurant