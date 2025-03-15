# backend/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Restaurant(Base):
    __tablename__ = "restaurants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    # Relationship: a restaurant has many menu items
    menu_items = relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")

class MenuItem(Base):
    __tablename__ = "menu_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    
    restaurant = relationship("Restaurant", back_populates="menu_items")
    