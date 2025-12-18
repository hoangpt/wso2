from fastapi import FastAPI
from app.database import engine, Base
from app.routers import pet

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Pet Management API",
    description="A simple REST API for managing pets",
    version="1.0.0"
)

app.include_router(pet.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Pet Management API"}
