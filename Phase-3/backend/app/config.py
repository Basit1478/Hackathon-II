from pydantic_settings import BaseSettings
from pydantic import field_validator
from functools import lru_cache
from typing import Union


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://user:pass@localhost/taskmaster"
    gemini_api_key: str = ""
    jwt_secret: str = "your-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    cors_origins: Union[str, list[str]] = ["https://taskmaster-frontend-pi.vercel.app"]
    better_auth_secret: str = ""
    
    @field_validator('cors_origins', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            # Handle empty string
            if not v or v.strip() == '':
                return ["https://taskmaster-frontend-pi.vercel.app"]
            # Handle comma-separated values
            if ',' in v:
                return [origin.strip() for origin in v.split(',')]
            # Handle single value
            return [v.strip()]
        # Already a list
        return v
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
