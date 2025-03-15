# backend/schemas.py
from pydantic import BaseModel

class RestaurantCreate(BaseModel):
    name: str
    description: str = None
    menu: str = None
    price: float = None