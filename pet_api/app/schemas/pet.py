from pydantic import BaseModel
from typing import Optional

class PetBase(BaseModel):
    name: str
    age: int
    type: str
    description: Optional[str] = None

class PetCreate(PetBase):
    pass

class PetResponse(PetBase):
    id: int

    class Config:
        from_attributes = True
