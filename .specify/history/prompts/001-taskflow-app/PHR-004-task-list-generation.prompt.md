---
id: PHR-004
title: "TaskFlow Pro Task List Generation"
stage: tasks
feature: 001-taskflow-app
created: 2026-01-10
tags: [tasks, implementation, checklist, user-stories]
---

# TaskFlow Pro Task List Generation

## Prompt

```text
# Task Checklist

## Backend Setup
Initialize UV project
Add dependencies: fastapi, uvicorn, sqlmodel, psycopg2-binary, python-jose, passlib
Create .env file with DATABASE_URL, BETTER_AUTH_SECRET, CORS_ORIGINS
Create app directory structure

## Backend Implementation
Create database.py with engine and session
Create models.py with User and Task SQLModel classes
Create security.py with hash, verify, and JWT functions
Create deps.py with get_current_user dependency
Create routes/auth.py with signup and login endpoints
Create routes/tasks.py with GET, POST, DELETE, PATCH endpoints
Create main.py with FastAPI app, CORS, router includes, startup event
Test locally with uvicorn

## Frontend Setup
Create Next.js app with TypeScript and Tailwind
Install dependencies: framer-motion, lucide-react, zod, react-hook-form, zustand, axios
Initialize shadcn/ui
Add components: button, input, card, dialog, checkbox, toast
Create .env.local with NEXT_PUBLIC_API_URL

## Frontend Implementation
Configure tailwind.config.ts with custom colors and keyframes
Create lib/api.ts with axios instance and JWT interceptor
Create lib/validations.ts with Zod schemas
Create lib/animations.ts with Framer Motion variants
Create store/authStore.ts with Zustand
Create app/(auth)/signup/page.tsx
Create app/(auth)/login/page.tsx
Create components/tasks/TaskCard.tsx
Create components/tasks/CreateTaskModal.tsx
Create app/(dashboard)/dashboard/page.tsx
Create middleware.ts for protected routes

## Database
Sign up at neon.tech
Create new project
Copy connection string
Add to backend .env
Verify tables created on first run

## Testing
Test signup flow end-to-end
Test login flow end-to-end
Test creating tasks
Test toggling complete status
Test deleting tasks
Test user isolation - different users see different tasks
Test responsive design on mobile, tablet, desktop
Test dark mode toggle
Test all animations are smooth

## Deployment
Deploy backend to Render or Railway
Set environment variables
Test API endpoints in production
Deploy frontend to Vercel
Set NEXT_PUBLIC_API_URL
Test full flow in production
```

## Response

Generated comprehensive task list with 140 tasks organized into 13 phases.

**Task Organization:**

| Phase | Name | Tasks | Parallel |
|-------|------|-------|----------|
| 1 | Backend Setup | 5 | 3 |
| 2 | Frontend Setup | 5 | 3 |
| 3 | Database Setup | 3 | 0 |
| 4 | Foundational Backend | 10 | 2 |
| 5 | Foundational Frontend | 12 | 5 |
| 6 | US1: Signup | 13 | 1 |
| 7 | US2: Login | 13 | 1 |
| 8 | US3: View Tasks | 16 | 2 |
| 9 | US4: Create Task | 15 | 1 |
| 10 | US5: Complete | 11 | 0 |
| 11 | US6: Delete | 11 | 0 |
| 12 | Polish | 11 | 6 |
| 13 | Deployment | 15 | 1 |

**User Story Mapping:**
- US1: User Registration (13 tasks)
- US2: User Login (13 tasks)
- US3: View Tasks (16 tasks)
- US4: Create Task (15 tasks)
- US5: Toggle Complete (11 tasks)
- US6: Delete Task (11 tasks)

**Key Features:**
- Each task has unique ID (T001-T140)
- [P] markers for parallelizable tasks (25 total)
- [US#] labels for user story tasks
- File paths included for all implementation tasks
- Independent test criteria per user story
- Dependency graph showing execution order
- MVP scope identified (77 tasks through US3)

## Outcome

- **Status:** Success
- **Artifacts Created:**
  - .specify/features/001-taskflow-app/tasks.md (140 tasks)
- **Follow-up Required:** No - ready for `/sp.implement`

## Lessons Learned

- User-provided checklist maps directly to task phases
- User stories from spec.md enable independent testing
- Parallel opportunities identified in setup and foundational phases
- MVP scope helps prioritize delivery
- Dependency graph clarifies execution order
