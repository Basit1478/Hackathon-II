import os
from datetime import datetime, timedelta
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, InvalidHashError
from jose import jwt, JWTError
from dotenv import load_dotenv
import bcrypt

load_dotenv()

SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "fallback-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7

# Use Argon2 for password hashing (more secure and modern than bcrypt)
ph = PasswordHasher()

def hash_password(password: str) -> str:
    """Hash a password using Argon2."""
    return ph.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash. Supports both Argon2 (new) and bcrypt (legacy)."""
    # Try Argon2 first (new hashes)
    if hashed_password.startswith('$argon2'):
        try:
            ph.verify(hashed_password, plain_password)
            return True
        except (VerifyMismatchError, InvalidHashError):
            return False
    # Fall back to bcrypt for legacy hashes
    elif hashed_password.startswith('$2b$') or hashed_password.startswith('$2a$'):
        try:
            return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
        except Exception:
            return False
    return False

def create_access_token(user_id: str) -> str:
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode = {"sub": user_id, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None
