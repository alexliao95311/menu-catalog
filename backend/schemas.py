from pydantic import BaseModel
from typing import List, Optional

class MenuItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[float] = None

class MenuItem(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[float] = None

    class Config:
        orm_mode = True

class RestaurantCreate(BaseModel):
    name: str
    description: Optional[str] = None
    # Optionally, the client may provide a password; otherwise one will be generated.
    admin_password: Optional[str] = None
    menu_items: Optional[List[MenuItemCreate]] = []

class Restaurant(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    admin_password: str  # Returned so the admin can see their password
    menu_items: List[MenuItem] = []

    class Config:
        orm_mode = True