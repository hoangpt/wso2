from sqlalchemy import Column, Integer, String
from app.database import Base

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    type = Column(String)
    description = Column(String, nullable=True)
