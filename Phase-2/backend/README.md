# TaskFlow Pro Backend

FastAPI backend for TaskFlow Pro task management application.

## Setup

1. Install dependencies:
```bash
uv sync
```

2. Configure environment variables in `.env` file

3. Run the server:
```bash
uv run uvicorn app.main:app --reload
```

## Tech Stack

- FastAPI
- SQLModel
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt password hashing
