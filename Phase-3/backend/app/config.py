from pydantic_settings import BaseSettings
from pydantic import field_validator
from functools import lru_cache
from typing import Union


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://user:pass@localhost/taskmaster"
    groq_api_key: str = ""
    jwt_secret: str = "your-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    cors_origins: list[str] = [
        "http://localhost:3000",
        "https://697b8b6c64c11838507c5fcd--001-ai-2.netlify.app",
        "https://001-ai-2.netlify.app"
    ]
    better_auth_secret: str = ""
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
