# TaskFlow Pro - Database Quick Reference

## Connection Information

**Database URL** (already configured in `.env`):
```
postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Project Details**:
- Project Name: phase-2-todo-app
- Project ID: solitary-morning-51056982
- Region: AWS US-East-2
- PostgreSQL Version: 17

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX ix_users_email ON users(email);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description VARCHAR,
    completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX ix_tasks_user_id ON tasks(user_id);
CREATE INDEX ix_tasks_completed ON tasks(completed);
CREATE INDEX ix_tasks_user_completed ON tasks(user_id, completed);
```

## Key Features

1. **User Authentication**: Unique email index for fast lookups
2. **User Isolation**: Tasks linked to users via foreign key
3. **Cascade Delete**: Deleting a user automatically deletes their tasks
4. **Optimized Queries**: Composite indexes for filtering user tasks by status

## Common Queries

### Get user's tasks
```python
# In FastAPI with SQLModel
def get_user_tasks(user_id: str, session: Session):
    statement = select(Task).where(Task.user_id == user_id)
    return session.exec(statement).all()
```

### Get completed tasks for user
```python
def get_completed_tasks(user_id: str, session: Session):
    statement = select(Task).where(
        Task.user_id == user_id,
        Task.completed == True
    )
    return session.exec(statement).all()
```

### Create user with hashed password
```python
from app.security import hash_password

def create_user(email: str, password: str, session: Session):
    user = User(
        email=email,
        password_hash=hash_password(password),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
```

## Database Connection (Already Configured)

File: `backend/app/database.py`

```python
from sqlmodel import create_engine, Session, SQLModel
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL,
    echo=True,              # Shows SQL queries in logs
    pool_pre_ping=True,     # Tests connections before use
    pool_recycle=300,       # Recycle connections every 5 min
    pool_size=10,           # Connection pool size
    max_overflow=20         # Max additional connections
)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

## Verification Status

All database requirements have been verified and are working:

- [x] Database tables created (users, tasks)
- [x] Proper indexes on users.email
- [x] Proper indexes on tasks.user_id
- [x] Proper indexes on tasks.completed
- [x] Composite index on tasks(user_id, completed)
- [x] Foreign key with CASCADE DELETE
- [x] User isolation working
- [x] Connection pooling configured
- [x] SSL connection enabled

## Testing

To test the database connection:

```bash
cd backend
python -c "from app.database import engine; from sqlmodel import Session, select; from app.models import User; session = Session(engine); users = session.exec(select(User)).all(); print(f'Connected! Found {len(users)} users')"
```

## Maintenance

For database maintenance tasks, see: `backend/database_maintenance.sql`

Common maintenance operations:
- Check table sizes
- Verify indexes
- Monitor performance
- Clean up old data

## Support

- Neon Console: https://console.neon.tech
- Project ID: solitary-morning-51056982
- Documentation: https://neon.tech/docs
