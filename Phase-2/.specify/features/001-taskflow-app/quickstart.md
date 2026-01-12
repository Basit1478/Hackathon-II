# Quickstart Guide: TaskFlow Pro

**Created:** 2026-01-10
**Feature:** 001-taskflow-app

## Prerequisites

- Python 3.13+
- Node.js 20+
- UV package manager (Python)
- Neon PostgreSQL account
- Git

## 1. Clone and Setup

```bash
# Clone repository
git clone <repository-url>
cd taskflow-pro

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## 2. Database Setup (Neon)

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project named "taskflow-pro"
3. Copy the connection string
4. Add to `backend/.env`:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

## 3. Backend Setup

```bash
cd backend

# Initialize UV and install dependencies
uv init
uv add fastapi sqlmodel python-jose bcrypt uvicorn psycopg2-binary python-dotenv

# Create .env file
cat > .env << EOF
DATABASE_URL=your_neon_connection_string
BETTER_AUTH_SECRET=your_random_32_char_secret_key
CORS_ORIGINS=http://localhost:3000
EOF

# Run development server
uv run uvicorn app.main:app --reload --port 8000
```

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Neon PostgreSQL connection string | postgresql://... |
| BETTER_AUTH_SECRET | JWT signing secret (32+ chars) | supersecretkey123... |
| CORS_ORIGINS | Allowed frontend origins | http://localhost:3000 |

## 4. Frontend Setup

```bash
cd frontend

# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false

# Install dependencies
npm install framer-motion zod react-hook-form zustand axios
npm install @hookform/resolvers

# Install shadcn/ui
npx shadcn@latest init

# Add shadcn components
npx shadcn@latest add button input card dialog checkbox

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

# Run development server
npm run dev
```

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API base URL | http://localhost:8000 |

## 5. Verify Setup

### Backend Health Check
```bash
curl http://localhost:8000/health
# Expected: {"status": "ok"}
```

### Frontend
Open http://localhost:3000 in your browser.

## 6. Project Structure

```
taskflow-pro/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI app entry
│   │   ├── database.py       # SQLModel engine setup
│   │   ├── models.py         # User, Task models
│   │   ├── schemas.py        # Pydantic request/response
│   │   ├── security.py       # JWT, bcrypt functions
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── auth.py       # /api/auth/* routes
│   │       └── tasks.py      # /api/{uid}/tasks/* routes
│   ├── pyproject.toml
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing/redirect
│   │   ├── login/
│   │   │   └── page.tsx      # Login form
│   │   ├── signup/
│   │   │   └── page.tsx      # Signup form
│   │   └── dashboard/
│   │       └── page.tsx      # Task list
│   ├── components/
│   │   ├── ui/               # shadcn components
│   │   ├── TaskCard.tsx
│   │   └── CreateTaskModal.tsx
│   ├── lib/
│   │   ├── api.ts            # Axios instance
│   │   └── validations.ts    # Zod schemas
│   ├── store/
│   │   └── authStore.ts      # Zustand auth store
│   ├── package.json
│   └── .env.local
│
└── .specify/                  # Specification artifacts
```

## 7. Development Workflow

### Start Both Servers
```bash
# Terminal 1: Backend
cd backend && uv run uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Create Database Tables
Tables are auto-created by SQLModel on first run. To reset:
```bash
# Connect to Neon and drop tables
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

## 8. Common Issues

### CORS Errors
- Ensure `CORS_ORIGINS` includes your frontend URL
- Check that frontend is making requests to correct backend URL

### Database Connection
- Verify Neon connection string includes `?sslmode=require`
- Check Neon project is not suspended (auto-suspends after inactivity)

### JWT Errors
- Ensure `BETTER_AUTH_SECRET` is the same value in all environments
- Check token is being sent in `Authorization: Bearer <token>` header

## 9. Testing API Endpoints

```bash
# Signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Create Task (replace TOKEN and USER_ID)
curl -X POST http://localhost:8000/api/{USER_ID}/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{"title": "My first task", "description": "Test description"}'

# List Tasks
curl http://localhost:8000/api/{USER_ID}/tasks \
  -H "Authorization: Bearer {TOKEN}"
```

## 10. Next Steps

1. Complete backend implementation (see `plan.md`)
2. Complete frontend implementation
3. Deploy backend to Render
4. Deploy frontend to Vercel
5. Run end-to-end tests
