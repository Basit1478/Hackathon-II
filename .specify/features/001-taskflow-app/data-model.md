# Data Model: TaskFlow Pro

**Created:** 2026-01-10
**Feature:** 001-taskflow-app
**Spec Reference:** spec.md

## Entity Relationship Diagram

```
┌─────────────────────────────────────┐
│              USERS                  │
├─────────────────────────────────────┤
│ id          UUID PK                 │
│ name        VARCHAR(100) NOT NULL   │
│ email       VARCHAR(255) UNIQUE     │
│ password_hash VARCHAR(255) NOT NULL │
│ created_at  TIMESTAMPTZ DEFAULT NOW │
└─────────────────────────────────────┘
                 │
                 │ 1:N (CASCADE DELETE)
                 ▼
┌─────────────────────────────────────┐
│              TASKS                  │
├─────────────────────────────────────┤
│ id          UUID PK                 │
│ user_id     UUID FK → users.id      │
│ title       VARCHAR(255) NOT NULL   │
│ description TEXT                    │
│ completed   BOOLEAN DEFAULT FALSE   │
│ created_at  TIMESTAMPTZ DEFAULT NOW │
│ updated_at  TIMESTAMPTZ DEFAULT NOW │
└─────────────────────────────────────┘
```

---

## Entity: User

### Purpose
Represents a registered user who can authenticate and manage tasks.

### Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto-generated | Unique identifier using gen_random_uuid() |
| name | VARCHAR(100) | NOT NULL | User's display name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login identifier, case-insensitive |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hash (cost factor 12) |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Account creation timestamp |

### Validation Rules
- `name`: 1-100 characters, trimmed whitespace
- `email`: Valid email format, lowercase normalized, unique across all users
- `password`: Minimum 8 characters (validated before hashing)

### Indexes
- Primary: `id` (implicit)
- Unique: `email` (for login lookup)

### SQLModel Definition
```python
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(max_length=100)
    email: str = Field(max_length=255, unique=True, index=True)
    password_hash: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

---

## Entity: Task

### Purpose
Represents a todo item belonging to a specific user.

### Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto-generated | Unique identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner reference |
| title | VARCHAR(255) | NOT NULL | Task title |
| description | TEXT | NULLABLE | Optional detailed description |
| completed | BOOLEAN | DEFAULT FALSE | Completion status |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Last modification timestamp |

### Validation Rules
- `title`: 1-255 characters, trimmed whitespace, required
- `description`: Max 2000 characters, optional
- `completed`: Boolean only, no null

### Indexes
- Primary: `id` (implicit)
- Foreign Key: `user_id` → `users.id` ON DELETE CASCADE
- Composite: `(user_id, completed)` for filtered queries

### SQLModel Definition
```python
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional

class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id", index=True)
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

---

## Relationships

### User → Tasks (One-to-Many)
- One user can have many tasks
- Tasks are deleted when user is deleted (CASCADE)
- User ID in JWT token must match task's user_id for access

### Access Control Matrix

| Operation | Owner | Other User | Unauthenticated |
|-----------|-------|------------|-----------------|
| Create Task | ✅ | ❌ 403 | ❌ 401 |
| Read Tasks | ✅ | ❌ 403 | ❌ 401 |
| Update Task | ✅ | ❌ 403 | ❌ 401 |
| Delete Task | ✅ | ❌ 403 | ❌ 401 |

---

## Database Schema (SQL)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email index for login lookup
CREATE INDEX idx_users_email ON users(email);

-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for task queries
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_user_completed ON tasks(user_id, completed);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## Frontend Types (TypeScript)

```typescript
// types/models.ts

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// Never expose password_hash to frontend
```

---

## Zod Schemas (Frontend Validation)

```typescript
// lib/validations.ts
import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().max(2000).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
```

---

## Pydantic Schemas (Backend Validation)

```python
# app/schemas.py
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

# Auth Schemas
class SignupRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    user: "UserResponse"
    token: str

class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    created_at: datetime

# Task Schemas
class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)

class TaskResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime

class TaskListResponse(BaseModel):
    tasks: list[TaskResponse]
```
