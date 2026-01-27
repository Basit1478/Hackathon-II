# Tasks: TaskFlow Pro

**Plan Reference:** plan.md
**Spec Reference:** spec.md
**Created:** 2026-01-10
**Last Updated:** 2026-01-10
**Status:** Implementation Complete (All Phases 1-13)

---

## User Story Mapping

| Story ID | User Story | Priority |
|----------|------------|----------|
| US1 | As a new user, I want to sign up with my name, email, and password | P1 |
| US2 | As a returning user, I want to log in with my email and password | P1 |
| US3 | As an authenticated user, I want to view all my tasks in a list | P1 |
| US4 | As an authenticated user, I want to create new tasks | P1 |
| US5 | As an authenticated user, I want to mark tasks as complete/incomplete | P1 |
| US6 | As an authenticated user, I want to delete tasks | P1 |

---

## Phase 1: Backend Setup

**Objective:** Initialize backend project with all dependencies and configuration

### Tasks

- [x] T001 Initialize UV project in backend/ directory
- [x] T002 [P] Add dependencies: fastapi, uvicorn, sqlmodel, psycopg2-binary, python-jose, passlib, python-dotenv in backend/pyproject.toml
- [x] T003 [P] Create backend directory structure: backend/app/, backend/app/routes/
- [x] T004 [P] Create backend/.env.example with DATABASE_URL, BETTER_AUTH_SECRET, CORS_ORIGINS
- [x] T005 Create backend/.env with actual Neon connection string (not committed)

### Deliverables
- Backend project initialized with UV
- All Python dependencies installed
- Directory structure ready

---

## Phase 2: Frontend Setup

**Objective:** Initialize frontend project with all dependencies and configuration

### Tasks

- [x] T006 Create Next.js 15 app with TypeScript and Tailwind in frontend/ directory
- [x] T007 [P] Install dependencies: framer-motion, lucide-react, zod, react-hook-form, @hookform/resolvers, zustand, axios in frontend/package.json
- [x] T008 Initialize shadcn/ui with dark mode in frontend/
- [x] T009 [P] Add shadcn components: button, input, card, dialog, checkbox, label in frontend/components/ui/
- [x] T010 [P] Create frontend/.env.local with NEXT_PUBLIC_API_URL=http://localhost:8000

### Deliverables
- Frontend project initialized with Next.js 15
- All npm dependencies installed
- shadcn/ui configured with dark mode

---

## Phase 3: Database Setup

**Objective:** Configure Neon PostgreSQL database

### Tasks

- [x] T011 Sign up at neon.tech and create new project "taskflow-pro"
- [x] T012 Copy connection string to backend/.env DATABASE_URL
- [x] T013 Verify SSL mode is set to require in connection string

### Deliverables
- Neon database project created
- Connection string configured

---

## Phase 4: Foundational Backend

**Objective:** Create shared backend infrastructure required by all user stories

### Tasks

- [x] T014 Create database connection with async engine in backend/app/database.py
- [x] T015 Create User SQLModel class with id, name, email, password_hash, created_at in backend/app/models.py
- [x] T016 Create Task SQLModel class with id, user_id, title, description, completed, created_at, updated_at in backend/app/models.py
- [x] T017 [P] Create Pydantic schemas: SignupRequest, LoginRequest, AuthResponse, UserResponse in backend/app/schemas.py
- [x] T018 [P] Create Pydantic schemas: TaskCreate, TaskResponse, TaskListResponse in backend/app/schemas.py
- [x] T019 Create password hashing functions: hash_password, verify_password (bcrypt cost 12) in backend/app/security.py
- [x] T020 Create JWT functions: create_access_token, verify_token (HS256, 7-day expiry) in backend/app/security.py
- [x] T021 Create get_current_user dependency for JWT verification in backend/app/deps.py
- [x] T022 Create FastAPI app with CORS middleware in backend/app/main.py
- [x] T023 Add startup event to create database tables in backend/app/main.py

### Deliverables
- Database connection configured
- SQLModel models defined
- Security utilities implemented
- FastAPI app skeleton ready

---

## Phase 5: Foundational Frontend

**Objective:** Create shared frontend infrastructure required by all user stories

### Tasks

- [x] T024 Configure Tailwind with custom colors (blue, purple, green, red) in frontend/tailwind.config.ts
- [x] T025 [P] Add glassmorphic utility classes and animations in frontend/tailwind.config.ts
- [x] T026 [P] Create axios instance with baseURL from env in frontend/lib/api.ts
- [x] T027 Add JWT interceptor to axios (Authorization header) in frontend/lib/api.ts
- [x] T028 Add 401 response interceptor (logout on expired) in frontend/lib/api.ts
- [x] T029 [P] Create Zod schemas: signupSchema, loginSchema in frontend/lib/validations.ts
- [x] T030 [P] Create Zod schema: createTaskSchema in frontend/lib/validations.ts
- [x] T031 Create Framer Motion animation variants in frontend/lib/animations.ts
- [x] T032 Create Zustand auth store with token, user, login, logout in frontend/store/authStore.ts
- [x] T033 Add localStorage persistence to auth store in frontend/store/authStore.ts
- [x] T034 Create root layout with dark gradient background in frontend/app/layout.tsx
- [x] T035 Create middleware for protected routes in frontend/middleware.ts

### Deliverables
- Tailwind configured with design system
- API client with JWT handling
- Auth state management ready
- Route protection configured

---

## Phase 6: User Story 1 - User Registration

**Goal:** As a new user, I want to sign up with my name, email, and password

**Independent Test:** User can create account, receive token, and see empty dashboard

### Backend Tasks

- [x] T036 [US1] Create POST /api/auth/signup endpoint in backend/app/routes/auth.py
- [x] T037 [US1] Implement email uniqueness check in signup endpoint
- [x] T038 [US1] Hash password and create user in database
- [x] T039 [US1] Return JWT token and user response on successful signup
- [x] T040 [US1] Include auth router in main.py

### Frontend Tasks

- [x] T041 [P] [US1] Create signup page with glassmorphic card in frontend/app/(auth)/signup/page.tsx
- [x] T042 [US1] Add React Hook Form with Zod resolver for name, email, password, confirmPassword
- [x] T043 [US1] Display inline validation errors for all fields
- [x] T044 [US1] Add submit handler calling /api/auth/signup
- [x] T045 [US1] Store token in Zustand and redirect to /dashboard on success
- [x] T046 [US1] Add loading state to submit button
- [x] T047 [US1] Add link to login page for existing users
- [x] T048 [US1] Add page fade-in animation

### Verification
- [x] Signup with valid data creates user and redirects to dashboard
- [x] Duplicate email shows appropriate error
- [x] Password mismatch shows validation error
- [x] Empty fields show validation errors

---

## Phase 7: User Story 2 - User Login

**Goal:** As a returning user, I want to log in with my email and password

**Independent Test:** User can log in with valid credentials and see their dashboard

### Backend Tasks

- [x] T049 [US2] Create POST /api/auth/login endpoint in backend/app/routes/auth.py
- [x] T050 [US2] Verify email exists and password matches
- [x] T051 [US2] Return JWT token and user response on successful login
- [x] T052 [US2] Return 401 for invalid credentials

### Frontend Tasks

- [x] T053 [P] [US2] Create login page with glassmorphic card in frontend/app/(auth)/login/page.tsx
- [x] T054 [US2] Add React Hook Form with Zod resolver for email, password
- [x] T055 [US2] Display inline validation errors
- [x] T056 [US2] Add submit handler calling /api/auth/login
- [x] T057 [US2] Store token in Zustand and redirect to /dashboard on success
- [x] T058 [US2] Show error toast for invalid credentials
- [x] T059 [US2] Add loading state to submit button
- [x] T060 [US2] Add link to signup page for new users
- [x] T061 [US2] Add page fade-in animation

### Verification
- [x] Login with valid credentials redirects to dashboard
- [x] Invalid email/password shows error message
- [x] Token persists after page refresh
- [x] Logout clears token and redirects to login

---

## Phase 8: User Story 3 - View Tasks

**Goal:** As an authenticated user, I want to view all my tasks in a list

**Independent Test:** Logged-in user sees their task list (empty state or with tasks)

### Backend Tasks

- [x] T062 [US3] Create GET /api/{uid}/tasks endpoint in backend/app/routes/tasks.py
- [x] T063 [US3] Verify JWT token and user ID match (return 403 if mismatch)
- [x] T064 [US3] Query tasks filtered by user_id
- [x] T065 [US3] Return TaskListResponse with tasks array
- [x] T066 [US3] Include tasks router in main.py

### Frontend Tasks

- [x] T067 [P] [US3] Create dashboard page structure in frontend/app/(dashboard)/dashboard/page.tsx
- [x] T068 [US3] Add header with app title, user name, logout button
- [x] T069 [US3] Fetch tasks from /api/{uid}/tasks on mount
- [x] T070 [US3] Display loading skeleton while fetching
- [x] T071 [P] [US3] Create TaskCard component in frontend/components/tasks/TaskCard.tsx
- [x] T072 [US3] Add glassmorphic card styling to TaskCard
- [x] T073 [US3] Display title and description in TaskCard
- [x] T074 [US3] Render task list with TaskCard components
- [x] T075 [US3] Add empty state message when no tasks exist
- [x] T076 [US3] Add slide-up animation for task cards
- [x] T077 [US3] Add hover lift effect on task cards

### Verification
- [x] Dashboard shows empty state for new users
- [x] Dashboard shows task list for users with tasks
- [x] Unauthenticated users redirected to login
- [x] Tasks from other users not visible

---

## Phase 9: User Story 4 - Create Task

**Goal:** As an authenticated user, I want to create new tasks with a title and description

**Independent Test:** User can open modal, enter task details, and see new task in list

### Backend Tasks

- [x] T078 [US4] Create POST /api/{uid}/tasks endpoint in backend/app/routes/tasks.py
- [x] T079 [US4] Verify JWT token and user ID match
- [x] T080 [US4] Validate TaskCreate request (title required, description optional)
- [x] T081 [US4] Create task in database with user_id
- [x] T082 [US4] Return created TaskResponse

### Frontend Tasks

- [x] T083 [P] [US4] Create CreateTaskModal component in frontend/components/tasks/CreateTaskModal.tsx
- [x] T084 [US4] Use shadcn Dialog with glassmorphic overlay
- [x] T085 [US4] Add React Hook Form with Zod resolver for title, description
- [x] T086 [US4] Display inline validation errors
- [x] T087 [US4] Add submit handler calling POST /api/{uid}/tasks
- [x] T088 [US4] Close modal and refresh task list on success
- [x] T089 [US4] Add modal fade and scale entrance animation
- [x] T090 [US4] Add Floating Action Button (FAB) to dashboard
- [x] T091 [US4] Connect FAB click to open CreateTaskModal
- [x] T092 [US4] Add loading state to modal submit button

### Verification
- [x] FAB opens create task modal
- [x] Modal closes on backdrop click or Escape
- [x] Empty title shows validation error
- [x] New task appears in list after creation

---

## Phase 10: User Story 5 - Toggle Task Complete

**Goal:** As an authenticated user, I want to mark tasks as complete/incomplete

**Independent Test:** User can click checkbox to toggle task status

### Backend Tasks

- [x] T093 [US5] Create PATCH /api/{uid}/tasks/{id}/complete endpoint in backend/app/routes/tasks.py
- [x] T094 [US5] Verify JWT token and user ID match
- [x] T095 [US5] Verify task exists and belongs to user (return 404/403)
- [x] T096 [US5] Toggle completed status and update updated_at
- [x] T097 [US5] Return updated TaskResponse

### Frontend Tasks

- [x] T098 [US5] Add checkbox to TaskCard component
- [x] T099 [US5] Connect checkbox to PATCH /api/{uid}/tasks/{id}/complete
- [x] T100 [US5] Implement optimistic UI update for checkbox
- [x] T101 [US5] Add smooth checkbox animation (200ms)
- [x] T102 [US5] Style completed tasks with muted colors and strikethrough
- [x] T103 [US5] Revert optimistic update on API error

### Verification
- [x] Clicking checkbox toggles completed status
- [x] Completed tasks show visual distinction
- [x] Toggle works for both complete and incomplete
- [x] UI updates immediately (optimistic)

---

## Phase 11: User Story 6 - Delete Task

**Goal:** As an authenticated user, I want to delete tasks

**Independent Test:** User can click delete button and task is removed from list

### Backend Tasks

- [x] T104 [US6] Create DELETE /api/{uid}/tasks/{id} endpoint in backend/app/routes/tasks.py
- [x] T105 [US6] Verify JWT token and user ID match
- [x] T106 [US6] Verify task exists and belongs to user (return 404/403)
- [x] T107 [US6] Delete task from database
- [x] T108 [US6] Return 204 No Content

### Frontend Tasks

- [x] T109 [US6] Add delete button with trash icon to TaskCard
- [x] T110 [US6] Connect delete button to DELETE /api/{uid}/tasks/{id}
- [x] T111 [US6] Remove task from list on successful delete
- [x] T112 [US6] Add slide-out animation for deleted task (300ms)
- [x] T113 [US6] Add AnimatePresence for list animations
- [x] T114 [US6] Show error toast on delete failure

### Verification
- [x] Clicking delete removes task from list
- [x] Task animates out smoothly
- [x] Deleted task no longer appears on refresh
- [x] Cannot delete other users' tasks

---

## Phase 12: Polish & Cross-Cutting Concerns

**Objective:** Final polish, accessibility, and responsive design

### Tasks

- [x] T115 [P] Add keyboard navigation support to all interactive elements
- [x] T116 [P] Add visible focus states matching design system
- [x] T117 [P] Verify color contrast meets WCAG AA (4.5:1)
- [x] T118 [P] Add aria-labels to icon buttons
- [x] T119 Test responsive layout at 320px viewport
- [x] T120 Test responsive layout at 768px viewport
- [x] T121 Test responsive layout at 1280px viewport
- [x] T122 [P] Add toast notifications for success/error feedback
- [x] T123 Verify all animations run at 60fps
- [x] T124 Run Lighthouse accessibility audit, fix issues
- [x] T125 Test complete signup → create task → complete → delete flow

### Deliverables
- WCAG AA accessibility compliance
- Responsive on all breakpoints
- Smooth 60fps animations
- Complete user flows verified

---

## Phase 13: Deployment

**Objective:** Deploy to production

### Backend Deployment (Render)

- [x] T126 Create Render account and connect repository
- [x] T127 Create new Web Service for backend
- [x] T128 Set build command: pip install -r requirements.txt
- [x] T129 Set start command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
- [x] T130 [P] Set environment variables: DATABASE_URL, BETTER_AUTH_SECRET
- [x] T131 Set CORS_ORIGINS to Vercel domain
- [x] T132 Deploy and verify backend health endpoint

### Frontend Deployment (Vercel)

- [x] T133 Create Vercel project and connect repository
- [x] T134 Set root directory to frontend/
- [x] T135 Set NEXT_PUBLIC_API_URL to Render backend URL
- [x] T136 Deploy and verify frontend loads

### Production Verification

- [x] T137 Test signup flow in production
- [x] T138 Test login flow in production
- [x] T139 Test task CRUD operations in production
- [x] T140 Verify user isolation in production

### Deliverables
- Backend running on Render
- Frontend running on Vercel
- All flows working in production

---

## Dependency Graph

```
Phase 1 (Backend Setup)
    ↓
Phase 2 (Frontend Setup) ←── can run parallel with Phase 1
    ↓
Phase 3 (Database Setup)
    ↓
Phase 4 (Foundational Backend)
    ↓
Phase 5 (Foundational Frontend) ←── can run parallel with Phase 4
    ↓
┌────────────────────────────────────────────────────┐
│ User Stories (can run in priority order)           │
│                                                    │
│ Phase 6 (US1: Signup) ──→ Phase 7 (US2: Login)    │
│                              ↓                     │
│                         Phase 8 (US3: View Tasks)  │
│                              ↓                     │
│ ┌────────────────────────────┼────────────────────┐│
│ │         Can run in parallel after US3           ││
│ │ Phase 9 (US4: Create)                           ││
│ │ Phase 10 (US5: Complete)                        ││
│ │ Phase 11 (US6: Delete)                          ││
│ └─────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────┘
    ↓
Phase 12 (Polish)
    ↓
Phase 13 (Deployment)
```

---

## Parallel Execution Opportunities

### Setup Phase (T001-T010)
```bash
# Terminal 1: Backend setup
T001 → T002 → T003 → T004 → T005

# Terminal 2: Frontend setup (parallel)
T006 → T007 → T008 → T009 → T010
```

### Foundational Phase (T014-T035)
```bash
# Terminal 1: Backend foundational
T014 → T015 → T016 → T017/T018 (parallel) → T019 → T020 → T021 → T022 → T023

# Terminal 2: Frontend foundational (parallel with backend)
T024 → T025/T026 (parallel) → T027 → T028 → T029/T030 (parallel) → T031 → T032 → T033 → T034 → T035
```

### User Story Implementation
```bash
# Each user story can have backend/frontend in parallel after dependencies met
# US4, US5, US6 can run in parallel after US3 is complete
```

---

## Implementation Strategy

### MVP Scope (Recommended First Milestone)
Complete through Phase 8 (US3: View Tasks):
- User can sign up and log in
- User can see their task list
- **Total tasks for MVP: 77 (T001-T077)**

### Full Implementation
All phases through Phase 13:
- **Total tasks: 140**

### Incremental Delivery
1. **Sprint 1:** Phases 1-5 (Setup + Foundational) - 35 tasks
2. **Sprint 2:** Phases 6-8 (Auth + View) - 42 tasks
3. **Sprint 3:** Phases 9-11 (CRUD) - 37 tasks
4. **Sprint 4:** Phases 12-13 (Polish + Deploy) - 26 tasks

---

## Task Summary

| Phase | Name | Task Count | Parallelizable |
|-------|------|------------|----------------|
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
| **Total** | | **140** | **25** |

---

## Story Verification Checklist

| Story | Independent Test Criteria | Status |
|-------|---------------------------|--------|
| US1 | User creates account, receives token, sees empty dashboard | [x] |
| US2 | User logs in with credentials, sees dashboard | [x] |
| US3 | Logged-in user sees task list (empty or populated) | [x] |
| US4 | User creates task via modal, sees it in list | [x] |
| US5 | User toggles checkbox, sees visual update | [x] |
| US6 | User deletes task, it animates out and disappears | [x] |
