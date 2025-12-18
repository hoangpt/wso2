from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.pet import PetCreate, PetResponse
from app.crud import pet as crud

router = APIRouter(
    prefix="/pets",
    tags=["pets"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=PetResponse)
def create_pet(pet: PetCreate, db: Session = Depends(get_db)):
    return crud.create_pet(db=db, pet=pet)

@router.get("/", response_model=List[PetResponse])
def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets = crud.get_pets(db, skip=skip, limit=limit)
    return pets

@router.get("/{pet_id}", response_model=PetResponse)
def read_pet(pet_id: int, db: Session = Depends(get_db)):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return db_pet

@router.put("/{pet_id}", response_model=PetResponse)
def update_pet(pet_id: int, pet: PetCreate, db: Session = Depends(get_db)):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return crud.update_pet(db=db, pet_id=pet_id, pet_data=pet)

@router.delete("/{pet_id}")
def delete_pet(pet_id: int, db: Session = Depends(get_db)):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    crud.delete_pet(db=db, pet_id=pet_id)
    return {"message": "Pet deleted successfully"}
