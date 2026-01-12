<!--
Sync Impact Report
==================
Version change: N/A → 1.0.0 (Initial adoption)
Modified principles: N/A (Initial creation)
Added sections:
  - Preamble
  - Principle 1: Spec-Driven Development
  - Principle 2: Type Safety
  - Principle 3: Responsive Design
  - Principle 4: Accessibility
  - Principle 5: Security First
  - Principle 6: Performance Excellence
  - Technology Stack
  - Design System
  - Data Architecture
  - API Contract
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md (pending creation)
  - .specify/templates/spec-template.md (pending creation)
  - .specify/templates/tasks-template.md (pending creation)
Follow-up TODOs: None
-->

# TaskFlow Pro Constitution

**Version:** 1.0.0
**Ratification Date:** 2026-01-09
**Last Amended:** 2026-01-09

## Preamble

This constitution establishes the foundational principles, technical standards, and governance
framework for TaskFlow Pro—a full-stack todo application featuring JWT authentication,
PostgreSQL persistence, glassmorphic UI design, and fluid animations. All contributors,
automated agents, and stakeholders MUST adhere to these principles throughout the project
lifecycle.

---

## Principle 1: Spec-Driven Development

All features MUST be specified before implementation begins. Specifications define acceptance
criteria, edge cases, and integration points. No code shall be written without a corresponding
specification document that has been reviewed and approved.

**Rationale:** Specifications prevent scope creep, ensure alignment between stakeholders, and
provide a contractual basis for feature completeness verification.

**Compliance:**
- Every feature MUST have a spec document in `.specify/features/`
- Specs MUST define acceptance criteria as testable assertions
- Implementation MUST NOT deviate from approved specs without amendment

---

## Principle 2: Type Safety

All code MUST be statically typed. TypeScript strict mode is mandatory for frontend code.
Python type hints with runtime validation via Pydantic/SQLModel are mandatory for backend code.
No `any` types permitted except with explicit justification documented in code comments.

**Rationale:** Type safety catches errors at compile time, improves IDE support, enables
confident refactoring, and serves as executable documentation.

**Compliance:**
- Frontend: TypeScript with `strict: true` in tsconfig.json
- Backend: Python 3.13 with type hints; Pydantic models for all API contracts
- Zod schemas MUST mirror backend Pydantic models for runtime validation
- CI MUST fail on type errors

---

## Principle 3: Responsive Design

The application MUST provide an optimal experience across all device sizes. Mobile-first
approach is mandatory—designs start at 320px width and progressively enhance for larger
viewports. All interactive elements MUST have touch-friendly targets (minimum 44x44px).

**Rationale:** Users access applications from diverse devices. A mobile-first approach ensures
core functionality works everywhere while enabling enhanced experiences on capable devices.

**Compliance:**
- All components MUST be tested at 320px, 768px, and 1280px breakpoints
- Tailwind responsive utilities MUST be used consistently
- No horizontal scrolling on any supported viewport
- Touch targets MUST meet WCAG 2.1 minimum size requirements

---

## Principle 4: Accessibility

The application MUST be accessible to users with disabilities. WCAG 2.1 AA compliance is the
minimum standard. Semantic HTML, ARIA attributes, keyboard navigation, and screen reader
support are mandatory.

**Rationale:** Accessibility is a fundamental right. Inclusive design benefits all users and
ensures legal compliance in many jurisdictions.

**Compliance:**
- All interactive elements MUST be keyboard accessible
- Focus states MUST be visible and consistent
- Color contrast MUST meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Form inputs MUST have associated labels
- Error messages MUST be announced to screen readers

---

## Principle 5: Security First

Security MUST be considered at every layer. Authentication uses JWT with bcrypt password
hashing. User data isolation is mandatory—users MUST NOT access other users' tasks.
All inputs MUST be validated and sanitized.

**Rationale:** Security breaches destroy user trust and can result in legal liability. Defense
in depth protects against both known and unknown attack vectors.

**Compliance:**
- Passwords MUST be hashed with bcrypt (cost factor >= 12)
- JWT tokens MUST expire after 7 days maximum
- All API endpoints (except auth) MUST verify JWT and user ownership
- SQL queries MUST use parameterized statements (SQLModel handles this)
- CORS MUST be configured to allow only the frontend origin
- No sensitive data in JWT payload or client-side storage (except token itself)

---

## Principle 6: Performance Excellence

The application MUST feel fast and responsive. Animations MUST run at 60fps. Initial load
MUST complete within 3 seconds on 3G connections. API responses MUST complete within 200ms
for simple operations.

**Rationale:** Performance directly impacts user experience, engagement, and conversion.
Slow applications frustrate users and increase abandonment.

**Compliance:**
- Animations: 200-400ms duration, spring easing, GPU-accelerated transforms
- Framer Motion for declarative animations
- React Server Components where applicable for reduced bundle size
- Database queries MUST use indexes for filtered/sorted columns
- Lazy loading for non-critical components

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| TypeScript | 5.x | Static typing |
| Tailwind CSS | 3.x | Utility-first styling |
| Framer Motion | 11.x | Animation library |
| shadcn/ui | latest | Component primitives |
| Zod | 3.x | Runtime schema validation |
| Zustand | 4.x | State management |
| Axios | 1.x | HTTP client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.110+ | Web framework |
| Python | 3.13 | Runtime |
| SQLModel | 0.0.16+ | ORM with Pydantic integration |
| python-jose | 3.x | JWT handling |
| bcrypt | 4.x | Password hashing |
| UV | latest | Package management |

### Database
| Technology | Provider | Purpose |
|------------|----------|---------|
| PostgreSQL | Neon | Serverless database |

---

## Design System

### Color Palette
| Role | Color | Usage |
|------|-------|-------|
| Primary | Blue (#3B82F6) | Actions, links, focus states |
| Secondary | Purple (#8B5CF6) | Accents, gradients |
| Success | Green (#22C55E) | Completed tasks, confirmations |
| Danger | Red (#EF4444) | Deletions, errors |

### Animation Standards
- **Duration:** 200-400ms (200ms for micro-interactions, 400ms for page transitions)
- **Easing:** Spring physics (stiffness: 300, damping: 30) or ease-out for simpler animations
- **Frame Rate:** 60fps minimum; use GPU-accelerated properties (transform, opacity)

### UI Specifications
- **Theme:** Dark mode with glassmorphic effects
- **Glass Effect:** `backdrop-blur-md bg-white/10 border border-white/20`
- **Spacing Scale:** 4px, 8px, 16px, 24px, 32px (Tailwind: 1, 2, 4, 6, 8)
- **Border Radius:** 6px (sm), 8px (md), 12px (lg), 16px (xl)

---

## Data Architecture

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(user_id, completed);
```

---

## API Contract

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/signup | Register new user | No |
| POST | /api/auth/login | Authenticate user | No |

### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/{uid}/tasks | List user's tasks | Yes |
| POST | /api/{uid}/tasks | Create new task | Yes |
| DELETE | /api/{uid}/tasks/{id} | Delete a task | Yes |
| PATCH | /api/{uid}/tasks/{id}/complete | Toggle task completion | Yes |

**Security Invariant:** The `{uid}` path parameter MUST match the authenticated user's ID.
Any mismatch MUST return 403 Forbidden.

---

## Governance

### Amendment Procedure
1. Propose amendment via pull request to this document
2. Document rationale and impact assessment
3. Obtain approval from project maintainer(s)
4. Update version number per semantic versioning rules
5. Update `Last Amended` date
6. Propagate changes to dependent templates

### Versioning Policy
- **MAJOR:** Breaking changes to principles or removal of principles
- **MINOR:** New principles added or existing principles materially expanded
- **PATCH:** Clarifications, typo fixes, non-semantic refinements

### Compliance Review
- All pull requests MUST be reviewed against constitutional principles
- CI/CD pipelines MUST enforce type safety and linting rules
- Quarterly audits SHOULD verify accessibility compliance
- Security reviews MUST occur before any authentication/authorization changes

---

## Signatories

This constitution is adopted and ratified on 2026-01-09.

*Project Maintainers*
