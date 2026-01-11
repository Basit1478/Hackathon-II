import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .database import create_db_and_tables
from .routes.auth import router as auth_router
from .routes.tasks import router as tasks_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create database tables
    create_db_and_tables()
    yield
    # Shutdown: cleanup if needed

app = FastAPI(
    title="TaskFlow Pro API",
    description="Backend API for TaskFlow Pro task management application",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Include routers
app.include_router(auth_router)
app.include_router(tasks_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "TaskFlow Pro API", "version": "1.0.0"}
