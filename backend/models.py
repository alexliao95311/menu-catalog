# backend/models.py
from sqlalchemy import Column, Integer, String, Float
from database import Base

class Restaurant(Base):
    __tablename__ = "restaurants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    menu = Column(String, nullable=True)  # e.g. Dish name
    price = Column(Float, nullable=True)