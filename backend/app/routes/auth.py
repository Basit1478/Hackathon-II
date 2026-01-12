import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from ..database import get_session
from ..models import User
from ..schemas import SignupRequest, LoginRequest, AuthResponse, UserResponse
from ..security import hash_password, verify_password, create_access_token

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def signup(request: SignupRequest, session: Session = Depends(get_session)):
    try:
        logger.info(f"Signup attempt for email: {request.email}")

        # Check if email already exists
        existing_user = session.exec(
            select(User).where(User.email == request.email.lower())
        ).first()

        if existing_user:
            logger.warning(f"Signup failed: Email already exists: {request.email}")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )

        # Hash password and create user
        hashed_password = hash_password(request.password)
        user = User(
            name=request.name,
            email=request.email.lower(),
            password_hash=hashed_password
        )

        session.add(user)
        session.commit()
        session.refresh(user)

        logger.info(f"User created successfully with ID: {user.id}")

        # Generate JWT token
        token = create_access_token(str(user.id))

        return AuthResponse(
            user=UserResponse(
                id=user.id,
                name=user.name,
                email=user.email,
                created_at=user.created_at
            ),
            token=token
        )
    except Exception as e:
        logger.error(f"Signup failed with error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during signup: {str(e)}"
        )

@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest, session: Session = Depends(get_session)):
    try:
        logger.info(f"Login attempt for email: {request.email}")

        # Find user by email
        user = session.exec(
            select(User).where(User.email == request.email.lower())
        ).first()

        if not user:
            logger.warning(f"Login failed: User not found for email: {request.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Verify password
        if not verify_password(request.password, user.password_hash):
            logger.warning(f"Login failed: Invalid password for email: {request.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        logger.info(f"Login successful for user ID: {user.id}")

        # Generate JWT token
        token = create_access_token(str(user.id))

        return AuthResponse(
            user=UserResponse(
                id=user.id,
                name=user.name,
                email=user.email,
                created_at=user.created_at
            ),
            token=token
        )
    except Exception as e:
        logger.error(f"Login failed with error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during login: {str(e)}"
        )
