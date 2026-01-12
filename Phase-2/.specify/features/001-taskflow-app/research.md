# Research: TaskFlow Pro Implementation

**Created:** 2026-01-10
**Feature:** 001-taskflow-app
**Status:** Complete

## Overview

This document captures research findings and technical decisions for implementing the TaskFlow Pro full-stack todo application. All "NEEDS CLARIFICATION" items have been resolved through research and best practices analysis.

---

## 1. JWT Token Storage Strategy

### Decision
Store JWT tokens in localStorage with Axios interceptor for automatic header injection.

### Rationale
- **Simplicity**: localStorage is straightforward to implement with Zustand
- **Persistence**: Tokens survive browser refresh and tab closure
- **User input alignment**: User specified "Setup Axios with JWT interceptor"
- **Trade-off accepted**: XSS vulnerability mitigated by input sanitization and CSP headers

### Alternatives Considered
| Option | Pros | Cons |
|--------|------|------|
| httpOnly cookies | XSS-immune | Requires cookie handling on FastAPI, CSRF protection needed |
| sessionStorage | Clears on tab close | Doesn't meet 7-day persistence requirement |
| localStorage | Simple, persistent | XSS vulnerable (mitigated by sanitization) |

### Implementation Notes
- Token stored under key `taskflow_token`
- Axios interceptor adds `Authorization: Bearer {token}` header
- Clear token on 401 response and redirect to login

---

## 2. Password Hashing Configuration

### Decision
Use bcrypt with cost factor 12.

### Rationale
- **Constitution mandate**: Minimum cost factor 12 required
- **Security balance**: Cost 12 provides ~250ms hash time, good security/UX balance
- **Industry standard**: OWASP recommends cost 10-12 for web applications

### Alternatives Considered
| Option | Pros | Cons |
|--------|------|------|
| Cost 10 | Faster (~60ms) | Below constitution minimum |
| Cost 12 | Balanced (~250ms) | Acceptable login latency |
| Cost 14 | Very secure (~1s) | Poor UX on signup/login |

### Implementation Notes
- Use `bcrypt` library (passlib wrapper not needed for simple use case)
- Hash on signup, verify on login
- Never log password or hash values

---

## 3. JWT Configuration

### Decision
- Algorithm: HS256
- Expiration: 7 days
- Payload: `{ sub: user_id, exp: timestamp }`

### Rationale
- **HS256**: Symmetric encryption suitable for single-service architecture
- **7 days**: Maximum allowed by constitution, good UX for returning users
- **Minimal payload**: Only user ID needed; no sensitive data per constitution

### Alternatives Considered
| Option | Pros | Cons |
|--------|------|------|
| RS256 | Asymmetric, more secure for microservices | Overkill for monolith |
| 1-day expiry | More secure | Poor UX, frequent re-login |
| Include user name in payload | Faster profile display | Stale data if name changes |

### Implementation Notes
- Use `python-jose` for JWT encoding/decoding
- Store secret in `BETTER_AUTH_SECRET` environment variable
- Validate expiration on every protected request

---

## 4. Database Connection Strategy

### Decision
Use SQLModel with async engine connected to Neon PostgreSQL.

### Rationale
- **SQLModel**: Combines SQLAlchemy + Pydantic, per constitution stack
- **Async**: FastAPI is async-first, better performance under load
- **Neon**: Serverless PostgreSQL, auto-scales, per constitution stack

### Alternatives Considered
| Option | Pros | Cons |
|--------|------|------|
| Sync SQLModel | Simpler code | Blocks event loop |
| Raw asyncpg | Fastest | No ORM benefits |
| Prisma | Great DX | Python support is experimental |

### Implementation Notes
- Connection string from `DATABASE_URL` environment variable
- Use connection pooling (Neon handles this)
- SQLModel auto-creates tables on startup

---

## 5. CORS Configuration

### Decision
Allow only the frontend origin with credentials support.

### Rationale
- **Security**: Restricts API access to legitimate frontend
- **Constitution compliance**: "CORS MUST be configured to allow only the frontend origin"

### Configuration
```python
origins = [os.getenv("CORS_ORIGINS", "http://localhost:3000")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
```

---

## 6. Form Validation Strategy

### Decision
Dual validation: Zod on frontend, Pydantic on backend.

### Rationale
- **Constitution compliance**: "Zod schemas MUST mirror backend Pydantic models"
- **Defense in depth**: Never trust client-side validation alone
- **User experience**: Immediate feedback before network request

### Implementation Notes
- Zod schemas in `lib/validations.ts`
- Pydantic schemas in `app/schemas/`
- Error messages consistent between frontend and backend

---

## 7. Animation Library Configuration

### Decision
Framer Motion with spring physics defaults.

### Rationale
- **Constitution stack**: Framer Motion specified
- **Performance**: GPU-accelerated by default
- **Spring physics**: Constitution specifies stiffness 300, damping 30

### Animation Presets
```typescript
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: springTransition
};
```

---

## 8. State Management Architecture

### Decision
Zustand for auth state, React Query patterns for server state.

### Rationale
- **Zustand**: Constitution stack, minimal boilerplate
- **Separation**: Auth state (client) vs task data (server) have different lifecycles
- **Simplicity**: No need for Redux complexity in this app scale

### Store Structure
```typescript
interface AuthStore {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
```

---

## 9. Error Handling Strategy

### Decision
Centralized error handling with toast notifications.

### Rationale
- **Consistency**: All errors handled the same way
- **User experience**: Clear feedback without blocking UI
- **Accessibility**: Toast announcements for screen readers

### Implementation Notes
- Axios interceptor catches network/401 errors
- Form errors shown inline
- API errors shown as toast notifications
- 401 triggers automatic logout and redirect

---

## 10. Project Structure

### Decision
Monorepo with `/backend` and `/frontend` directories.

### Rationale
- **Simplicity**: Single repository for full stack
- **Deployment alignment**: User specified separate Render (backend) and Vercel (frontend) deployments
- **Development workflow**: Can run both with single terminal setup

### Directory Structure
```
/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── security.py
│   │   ├── database.py
│   │   └── routers/
│   │       ├── auth.py
│   │       └── tasks.py
│   ├── pyproject.toml
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   └── dashboard/
│   ├── components/
│   ├── lib/
│   ├── store/
│   └── package.json
└── .specify/
```

---

## Summary

All technical decisions align with:
- Constitution principles and technology stack
- User-provided implementation guidance
- Industry best practices for security and performance

No unresolved clarifications remain. Ready for Phase 1 artifacts.
