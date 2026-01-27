# Implementation Plan: TaskFlow Pro

**Version:** 1.0.0
**Created:** 2026-01-10
**Spec Reference:** spec.md
**Status:** Approved

## Constitution Compliance Check

Before implementation, verify alignment with constitutional principles:

| Principle | Requirement | Plan Compliance |
|-----------|-------------|-----------------|
| Spec-Driven | Feature spec exists and is approved | [x] spec.md complete |
| Type Safety | TypeScript strict mode, Python type hints | [x] Planned in Phase 1 |
| Responsive | Mobile-first implementation planned | [x] Phase 4 UI |
| Accessibility | WCAG 2.1 AA compliance planned | [x] Phase 4 UI |
| Security First | Auth, validation, isolation addressed | [x] Phase 2 Auth |
| Performance | Animation standards, load time budgets | [x] Phase 4 Animations |

---

## Architecture Overview

### Component Hierarchy
```
App (Layout)
├── AuthProvider (Zustand)
│   ├── LoginPage
│   │   └── LoginForm (React Hook Form + Zod)
│   ├── SignupPage
│   │   └── SignupForm (React Hook Form + Zod)
│   └── DashboardPage (Protected)
│       ├── Header
│       │   ├── AppTitle
│       │   ├── UserInfo
│       │   └── LogoutButton
│       ├── TaskList
│       │   └── TaskCard[] (Framer Motion)
│       │       ├── Checkbox
│       │       ├── TaskContent
│       │       └── DeleteButton
│       ├── EmptyState
│       ├── FAB (Floating Action Button)
│       └── CreateTaskModal (Dialog)
│           └── TaskForm
```

### Data Flow
```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Zustand │◄───│  Axios   │◄───│   Zod    │◄───│  Forms   │  │
│  │  Store   │    │  Client  │    │ Validate │    │  (RHF)   │  │
│  └────┬─────┘    └────┬─────┘    └──────────┘    └──────────┘  │
│       │               │                                         │
│       │    JWT Token  │ HTTP + Bearer Token                     │
│       ▼               ▼                                         │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────┬─────────────────────────────────────────┐
│                       │         BACKEND                         │
│                       ▼                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  FastAPI │───►│  JWT     │───►│ Pydantic │───►│ SQLModel │  │
│  │  Router  │    │  Verify  │    │ Validate │    │   ORM    │  │
│  └──────────┘    └──────────┘    └──────────┘    └────┬─────┘  │
│                                                        │        │
└────────────────────────────────────────────────────────┼────────┘
                                                         │
                                                         ▼
                                              ┌──────────────────┐
                                              │ Neon PostgreSQL  │
                                              │  (users, tasks)  │
                                              └──────────────────┘
```

---

## Implementation Phases

### Phase 1: Project Setup
**Objective:** Initialize both projects with proper configuration and dependencies

#### Tasks
- [ ] 1.1: Initialize backend with UV (`uv init`)
- [ ] 1.2: Add backend dependencies (FastAPI, SQLModel, python-jose, bcrypt, uvicorn, psycopg2-binary, python-dotenv)
- [ ] 1.3: Create backend directory structure (`app/`, `app/routers/`)
- [ ] 1.4: Initialize frontend with Next.js 15 (`npx create-next-app@latest`)
- [ ] 1.5: Install frontend dependencies (framer-motion, zod, react-hook-form, @hookform/resolvers, zustand, axios)
- [ ] 1.6: Initialize and configure shadcn/ui
- [ ] 1.7: Add shadcn components (button, input, card, dialog, checkbox)
- [ ] 1.8: Create Neon database project and copy connection string
- [ ] 1.9: Create `.env` files with all required variables

#### Deliverables
- `/backend/` with UV project initialized
- `/frontend/` with Next.js + Tailwind configured
- Both projects runnable with hot reload
- Environment files created (not committed)

---

### Phase 2: Backend Authentication
**Objective:** Implement secure user registration and login

#### Tasks
- [ ] 2.1: Create `database.py` with async SQLModel engine
- [ ] 2.2: Create `models.py` with User and Task SQLModel classes
- [ ] 2.3: Create `schemas.py` with Pydantic request/response models
- [ ] 2.4: Create `security.py` with:
  - bcrypt password hashing (cost factor 12)
  - JWT token creation (HS256, 7-day expiry)
  - JWT token verification
  - `get_current_user` dependency
- [ ] 2.5: Create `routers/auth.py` with:
  - POST `/api/auth/signup` - create user, return token
  - POST `/api/auth/login` - verify credentials, return token
- [ ] 2.6: Create `main.py` with:
  - FastAPI app initialization
  - CORS middleware configuration
  - Router inclusion
  - Database table creation on startup

#### Deliverables
- Working `/api/auth/signup` endpoint
- Working `/api/auth/login` endpoint
- JWT tokens generated correctly
- Passwords properly hashed

---

### Phase 3: Backend Tasks API
**Objective:** Implement task CRUD with user isolation

#### Tasks
- [ ] 3.1: Create `routers/tasks.py` with:
  - GET `/api/{uid}/tasks` - list user's tasks
  - POST `/api/{uid}/tasks` - create task
  - DELETE `/api/{uid}/tasks/{id}` - delete task
  - PATCH `/api/{uid}/tasks/{id}/complete` - toggle completed
- [ ] 3.2: Implement user isolation (uid must match JWT user)
- [ ] 3.3: Add proper error responses (401, 403, 404)
- [ ] 3.4: Add optional status query param filtering
- [ ] 3.5: Include tasks router in main.py

#### Deliverables
- All task endpoints working
- User isolation enforced (403 on mismatch)
- Proper HTTP status codes returned

---

### Phase 4: Frontend Foundation
**Objective:** Set up frontend architecture and styling

#### Tasks
- [ ] 4.1: Configure Tailwind with custom colors:
  - Primary: #3B82F6 (blue)
  - Secondary: #8B5CF6 (purple)
  - Success: #22C55E (green)
  - Danger: #EF4444 (red)
- [ ] 4.2: Add custom animation utilities to Tailwind config
- [ ] 4.3: Create `lib/api.ts` - Axios instance with:
  - Base URL from environment
  - JWT interceptor for Authorization header
  - 401 response interceptor (logout on expired)
- [ ] 4.4: Create `lib/validations.ts` - Zod schemas:
  - signupSchema (name, email, password, confirmPassword)
  - loginSchema (email, password)
  - createTaskSchema (title, description?)
- [ ] 4.5: Create `store/authStore.ts` - Zustand store:
  - token, user state
  - login, logout actions
  - isAuthenticated computed
  - localStorage persistence
- [ ] 4.6: Create app layout with dark mode glassmorphic background

#### Deliverables
- Configured Tailwind with design system
- Working API client with JWT handling
- Auth state management ready
- Base layout styled

---

### Phase 5: Frontend Authentication Pages
**Objective:** Build signup and login forms

#### Tasks
- [ ] 5.1: Create `/signup/page.tsx`:
  - Glassmorphic card centered on page
  - Form with name, email, password, confirm password
  - React Hook Form with Zod resolver
  - Submit calls API, stores token, redirects
  - Link to login page
- [ ] 5.2: Create `/login/page.tsx`:
  - Glassmorphic card centered on page
  - Form with email, password
  - React Hook Form with Zod resolver
  - Submit calls API, stores token, redirects
  - Link to signup page
- [ ] 5.3: Add loading states to submit buttons
- [ ] 5.4: Add inline error messages for validation
- [ ] 5.5: Add toast notifications for API errors
- [ ] 5.6: Add page load fade-in animation

#### Deliverables
- Working signup flow with validation
- Working login flow with validation
- Proper error handling and feedback
- Smooth animations

---

### Phase 6: Frontend Dashboard
**Objective:** Build the main task management interface

#### Tasks
- [ ] 6.1: Create `/dashboard/page.tsx`:
  - Protected route (redirect if not authenticated)
  - Fetch tasks on mount
  - Header with app title, user name, logout button
- [ ] 6.2: Create `components/TaskCard.tsx`:
  - Glassmorphic card style
  - Checkbox for completion toggle
  - Title and description display
  - Delete button with confirmation
  - Completed state styling (muted, strikethrough)
- [ ] 6.3: Create `components/CreateTaskModal.tsx`:
  - shadcn Dialog component
  - Form with title (required) and description (optional)
  - React Hook Form with Zod validation
  - Submit creates task, closes modal, refreshes list
- [ ] 6.4: Add Floating Action Button (FAB):
  - Fixed position bottom-right
  - Opens CreateTaskModal on click
  - Plus icon
- [ ] 6.5: Add empty state message when no tasks
- [ ] 6.6: Add loading skeleton while fetching tasks

#### Deliverables
- Working dashboard with task list
- Create, complete, delete functionality
- Modal for task creation
- FAB for quick access

---

### Phase 7: Animations & Polish
**Objective:** Add smooth animations and final polish

#### Tasks
- [ ] 7.1: Add Framer Motion animations:
  - Page fade-in (300ms ease-out)
  - Task cards slide-up on mount (200ms spring)
  - Card hover lift effect (200ms)
  - Modal fade and scale entrance (300ms spring)
  - Checkbox toggle animation (200ms)
  - Task delete slide-out (300ms)
- [ ] 7.2: Add AnimatePresence for list animations
- [ ] 7.3: Implement optimistic UI for task toggle
- [ ] 7.4: Add keyboard navigation support
- [ ] 7.5: Add focus states for accessibility
- [ ] 7.6: Test and fix responsive layouts (320px, 768px, 1280px)
- [ ] 7.7: Run Lighthouse accessibility audit, fix issues

#### Deliverables
- All animations at 60fps
- Keyboard accessible
- Responsive on all breakpoints
- Lighthouse accessibility score 90+

---

### Phase 8: Integration & Testing
**Objective:** End-to-end integration and testing

#### Tasks
- [ ] 8.1: Test complete signup → dashboard flow
- [ ] 8.2: Test complete login → dashboard flow
- [ ] 8.3: Test task creation, completion, deletion
- [ ] 8.4: Test token persistence across browser restart
- [ ] 8.5: Test user isolation (cannot access other users' tasks)
- [ ] 8.6: Test error handling (network errors, invalid data)
- [ ] 8.7: Fix any bugs discovered during testing

#### Deliverables
- All user scenarios working end-to-end
- No critical bugs
- Error handling verified

---

### Phase 9: Deployment
**Objective:** Deploy to production

#### Tasks
- [ ] 9.1: Create Render account and connect repository
- [ ] 9.2: Configure Render web service for backend:
  - Build command: `pip install -r requirements.txt`
  - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
  - Environment variables: DATABASE_URL, BETTER_AUTH_SECRET, CORS_ORIGINS
- [ ] 9.3: Create Vercel project for frontend
- [ ] 9.4: Configure Vercel environment variables:
  - NEXT_PUBLIC_API_URL (Render backend URL)
- [ ] 9.5: Update CORS_ORIGINS to include Vercel domain
- [ ] 9.6: Deploy and verify both services
- [ ] 9.7: Test production deployment end-to-end

#### Deliverables
- Backend running on Render
- Frontend running on Vercel
- Production environment working correctly

---

## Technical Decisions

### Frontend
| Decision | Choice | Rationale |
|----------|--------|-----------|
| State Management | Zustand | Per constitution stack, minimal boilerplate |
| Form Handling | React Hook Form | Performance, Zod integration |
| Validation | Zod | Runtime type safety, mirrors Pydantic |
| Animation | Framer Motion | Per constitution stack, 60fps |
| Styling | Tailwind + shadcn/ui | Per constitution stack |
| HTTP Client | Axios | Interceptors for JWT handling |

### Backend
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | FastAPI | Per constitution stack, async |
| ORM | SQLModel | Pydantic + SQLAlchemy integration |
| Auth | JWT + bcrypt | Per constitution security |
| Package Manager | UV | Per constitution stack |

### Database
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Provider | Neon PostgreSQL | Per constitution stack, serverless |
| Schema | Auto-created by SQLModel | Simpler development |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Neon cold starts | Medium | Low | Acceptable for MVP; can add connection pooling later |
| JWT token theft via XSS | Low | High | Input sanitization, CSP headers, short token life |
| Password brute force | Low | High | bcrypt cost 12 makes brute force impractical |
| CORS misconfiguration | Medium | Medium | Strict origin list, test in production |
| Animation jank | Medium | Low | GPU-accelerated properties only, test on low-end devices |

---

## Testing Strategy

### Test Coverage Requirements
- Unit: >= 80% for business logic (security.py, routers)
- Integration: All API endpoints
- E2E: Critical user flows (signup, login, CRUD)

### Testing Tools
- Frontend: Vitest, React Testing Library, Playwright
- Backend: pytest, httpx

### Manual Testing Checklist
- [ ] Signup with valid data
- [ ] Signup with duplicate email (error shown)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error shown)
- [ ] Create task with title only
- [ ] Create task with title and description
- [ ] Toggle task completion
- [ ] Delete task
- [ ] Logout and verify redirect
- [ ] Token persists after refresh
- [ ] Responsive on mobile (320px)
- [ ] Keyboard navigation works
- [ ] All animations smooth

---

## Performance Budget

| Metric | Budget | Measurement |
|--------|--------|-------------|
| Initial Load | < 3s on 3G | Lighthouse |
| Animation FPS | 60fps | Chrome DevTools |
| API Response | < 200ms | Server logs |
| Time to Interactive | < 3.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |

---

## Rollout Strategy

1. [ ] Development complete (all phases)
2. [ ] Code review passed
3. [ ] Tests passing (unit, integration)
4. [ ] Staging deployment (Render preview, Vercel preview)
5. [ ] QA verification (manual testing checklist)
6. [ ] Production deployment
7. [ ] Production smoke test

---

## Dependencies

### External
- Neon PostgreSQL: Database hosting
- Render: Backend hosting
- Vercel: Frontend hosting

### Internal
- None (first feature)

---

## Related Artifacts

| Artifact | Path | Description |
|----------|------|-------------|
| Specification | spec.md | Feature requirements |
| Research | research.md | Technical decisions |
| Data Model | data-model.md | Entity definitions |
| API Contract | contracts/openapi.yaml | OpenAPI specification |
| Quickstart | quickstart.md | Developer setup guide |
