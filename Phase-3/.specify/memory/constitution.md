<!--
  SYNC IMPACT REPORT
  ==================
  Version change: (new) -> 1.0.0

  Modified principles: N/A (initial creation)

  Added sections:
    - I. Spec-Driven Development
    - II. Stateless Architecture
    - III. AI-Native Design
    - IV. Modern UI Standards
    - V. Quality & Testing
    - VI. Security & Performance
    - Tech Stack section
    - Design System section
    - Success Criteria section
    - Governance section

  Removed sections: N/A (initial creation)

  Templates status:
    - .specify/templates/plan-template.md: Constitution Check section is generic; will inherit these principles
    - .specify/templates/spec-template.md: Compatible; user stories and requirements align with constitution
    - .specify/templates/tasks-template.md: Compatible; TDD workflow and phases align with testing principles
    - .specify/templates/phr-template.prompt.md: Compatible; no constitution-specific references needed

  Follow-up TODOs: None
-->

# TaskMaster Pro AI Constitution

## Core Principles

### I. Spec-Driven Development

All implementation MUST follow the Spec-Driven Development (SDD) methodology:
- All code is generated via Claude Code - no manual coding allowed
- Specifications MUST be created before any implementation begins
- Every feature requires: spec.md -> plan.md -> tasks.md workflow
- Changes to implementation require spec updates first

**Rationale**: Ensures traceability, consistency, and AI-generated code quality by maintaining a clear chain from requirements to implementation.

### II. Stateless Architecture

The system MUST maintain zero server-side memory:
- All application state MUST be persisted in PostgreSQL (Neon)
- Backend services MUST be stateless and horizontally scalable
- Session data MUST be stored in the database, not in-memory
- No reliance on server-local storage or caching without database backing

**Rationale**: Enables horizontal scaling, simplifies deployment, and ensures reliability across multiple instances.

### III. AI-Native Design

The application is built around AI-first interaction patterns:
- Primary user interface MUST be natural language chat
- Backend MUST use MCP (Model Context Protocol) tools for task operations
- AI orchestration MUST use OpenAI Agents SDK
- All AI interactions MUST be logged for conversation persistence

**Rationale**: Leverages modern AI capabilities to provide intuitive task management through natural language.

### IV. Modern UI Standards

The frontend MUST adhere to these design requirements:
- UI framework: Tailwind CSS 3.4+ with shadcn/ui components
- Icons: Lucide React exclusively
- Responsive: Mobile-first design approach
- Theme: Dark mode support required
- Typography: Inter Variable font family
- Design tokens: Follow the Design System color palette defined below

**Rationale**: Ensures consistent, accessible, and modern user experience across all devices.

### V. Quality & Testing

Code quality gates MUST be enforced:
- All user-facing features MUST have acceptance criteria before implementation
- Integration tests MUST cover API contracts and MCP tool interactions
- Error handling MUST be explicit with user-friendly messages
- Logging MUST capture all significant operations for debugging

**Rationale**: Maintains reliability and enables rapid debugging of AI-driven workflows.

### VI. Security & Performance

Non-functional requirements MUST be met:
- Authentication MUST use Better Auth with secure session management
- API endpoints MUST validate input and sanitize output
- Database queries MUST use parameterized statements (no raw SQL interpolation)
- Response times SHOULD target <500ms p95 for chat interactions

**Rationale**: Protects user data and ensures responsive AI interactions.

## Tech Stack

| Layer | Technology | Version/Notes |
|-------|-----------|---------------|
| Frontend | Next.js | 15.x |
| UI Components | shadcn/ui | Latest |
| Styling | Tailwind CSS | 3.4+ |
| Icons | Lucide React | Latest |
| Backend | FastAPI | Latest |
| AI Orchestration | OpenAI Agents SDK | Latest |
| MCP | Official MCP SDK | Latest |
| Database | Neon PostgreSQL | Serverless |
| Authentication | Better Auth | Latest |

**Stack Mandate**: Deviations from this stack require explicit justification and ADR documentation.

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | indigo-500 | Actions, links, focus states |
| Secondary | slate-700 | Text, borders, subtle elements |
| Success | emerald-500 | Confirmations, completed states |
| Error | rose-500 | Errors, destructive actions |

### Typography

- **Font Family**: Inter Variable
- **Scale**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Success Criteria

The following MUST be achieved for Phase III completion:

- [ ] **MCP Tools**: 5 MCP tools fully operational (create, read, update, delete, list tasks)
- [ ] **Natural Language**: Chat interface processes natural language task commands
- [ ] **Conversation Persistence**: Full conversation history stored and retrievable
- [ ] **Responsive UI**: Functional on mobile (375px+) through desktop (1920px+)
- [ ] **Live Deployment**: Application deployed and accessible via public URL

## Governance

### Amendment Process

1. Proposed changes MUST be documented with rationale
2. Changes affecting core principles require team review
3. All amendments MUST update the version and Last Amended date
4. Migration plan required for breaking changes

### Versioning Policy

- **MAJOR**: Removal or redefinition of core principles
- **MINOR**: Addition of new principles or sections
- **PATCH**: Clarifications, typo fixes, non-semantic updates

### Compliance

- All PRs MUST verify compliance with this constitution
- Code reviews MUST check adherence to Tech Stack and Design System
- Complexity beyond these guidelines MUST be justified in ADRs

**Version**: 1.0.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18
