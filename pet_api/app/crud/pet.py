from sqlalchemy.orm import Session
from app.models.pet import Pet
from app.schemas.pet import PetCreate

def get_pet(db: Session, pet_id: int):
    return db.query(Pet).filter(Pet.id == pet_id).first()

def get_pets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Pet).offset(skip).limit(limit).all()

def create_pet(db: Session, pet: PetCreate):
    db_pet = Pet(**pet.dict())
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet

def delete_pet(db: Session, pet_id: int):
    db.query(Pet).filter(Pet.id == pet_id).delete()
    db.commit()

def update_pet(db: Session, pet_id: int, pet_data: PetCreate):
    db_pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if db_pet:
        for key, value in pet_data.dict().items():
            setattr(db_pet, key, value)
        db.commit()
        db.refresh(db_pet)
    return db_pet
