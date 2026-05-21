from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import cases

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BankOps AI Hub", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cases.router)

@app.get("/")
def root():
    return {"message": "BankOps AI Hub API is running"}
