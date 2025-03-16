from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Restaurant, MenuItem
from database import SessionLocal
from schemas import RestaurantCreate, Restaurant as RestaurantSchema
import secrets

router = APIRouter()

# Dependency to get a DB session.
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

@router.get("/{restaurant_id}", response_model=RestaurantSchema)
def get_restaurant_detail(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@router.post("/", response_model=RestaurantSchema)
def create_restaurant(restaurant: RestaurantCreate, db: Session = Depends(get_db)):
    admin_password = restaurant.admin_password if restaurant.admin_password else secrets.token_hex(4)
    new_restaurant = Restaurant(
        name=restaurant.name,
        description=restaurant.description,
        admin_password=admin_password
    )
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

@router.put("/{restaurant_id}", response_model=RestaurantSchema)
def update_restaurant(restaurant_id: int, restaurant_update: RestaurantCreate, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    if not restaurant_update.admin_password or restaurant_update.admin_password != restaurant.admin_password:
        raise HTTPException(status_code=403, detail="Invalid admin password")

    restaurant.name = restaurant_update.name
    restaurant.description = restaurant_update.description

    for menu_item in restaurant.menu_items:
        db.delete(menu_item)
    restaurant.menu_items = []

    if restaurant_update.menu_items:
        for item in restaurant_update.menu_items:
            new_menu_item = MenuItem(
                name=item.name,
                description=item.description,
                price=item.price,
            )
            restaurant.menu_items.append(new_menu_item)
    
    db.commit()
    db.refresh(restaurant)
    return restaurant