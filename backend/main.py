from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, List

app = FastAPI()

# In-memory storage for demonstration
restaurant_db: Dict[int, "Restaurant"] = {}
menu_db: Dict[int, List["MenuItem"]] = {}
restaurant_id_counter = 1
menu_item_id_counter = 1

class Restaurant(BaseModel):
    id: int = None
    name: str
    address: str

class MenuItem(BaseModel):
    id: int = None
    item_name: str
    price: float
    category: str

@app.post("/api/restaurants", response_model=Restaurant)
def create_restaurant(restaurant: Restaurant):
    global restaurant_id_counter
    restaurant.id = restaurant_id_counter
    restaurant_db[restaurant_id_counter] = restaurant
    menu_db[restaurant_id_counter] = []  # Initialize empty menu list for this restaurant
    restaurant_id_counter += 1
    return restaurant

@app.post("/api/restaurants/{restaurant_id}/menus", response_model=MenuItem)
def create_menu_item(restaurant_id: int, menu_item: MenuItem):
    global menu_item_id_counter
    if restaurant_id not in restaurant_db:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    menu_item.id = menu_item_id_counter
    menu_db[restaurant_id].append(menu_item)
    menu_item_id_counter += 1
    return menu_item