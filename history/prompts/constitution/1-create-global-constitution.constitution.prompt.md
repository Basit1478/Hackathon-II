---
id: 1
title: Create Global Constitution
stage: constitution
date: 2025-12-28
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: main
user: Windows 10 Pro
command: sp.constitution
labels: [constitution, governance, specification]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
---
## Prompt

Create a single global constitution for the entire "Evolution of Todo" project
covering Phase I through Phase V.

This constitution must define:

1. Spec-Driven Development as mandatory
   - No agent may write code without approved specs and tasks
   - All work must follow: Constitution → Specs → Plan → Tasks → Implement

2. Agent Behavior Rules
   - No manual coding by humans
   - No feature invention
   - No deviation from approved specifications
   - Refinement must occur at spec level, not code level

3. Phase Governance
   - Each phase is strictly scoped by its specification
   - Future-phase features must never leak into earlier phases
   - Architecture may evolve only through updated specs and plans

4. Technology Constraints
   - Python for backend
   - Next.js for frontend (later phases)
   - FastAPI, SQLModel, Neon DB
   - OpenAI Agents SDK, MCP
   - Docker, Kubernetes, Kafka, Dapr (later phases)

5. Quality Principles
   - Clean architecture
   - Stateless services where required
   - Clear separation of concerns
   - Cloud-native readiness

This constitution must remain stable across all phases
and act as the supreme governing document for all agents.

## Response snapshot

Created a comprehensive constitution for the "Evolution of Todo" project that establishes the required principles and governance structure. The constitution includes:

1. Core Principles section with 6 mandatory principles:
   - Spec-Driven Development (Mandatory)
   - Agent Behavior Rules
   - Phase Governance
   - Technology Constraints
   - Quality Principles
   - No Deviation from Specification

2. Technology Stack Requirements section detailing backend, frontend, and infrastructure technologies

3. Development Workflow section covering specification, implementation, and review processes

4. Governance section establishing the constitution as the supreme governing document

The constitution is versioned as 1.0.0 and dated 2025-12-28.

## Outcome

- ✅ Impact: New project constitution created with all required principles
- 🧪 Tests: N/A
- 📁 Files: Updated .specify/memory/constitution.md, created history/prompts/constitution/1-create-global-constitution.constitution.prompt.md
- 🔁 Next prompts: N/A
- 🧠 Reflection: Constitution now serves as the supreme governing document for all agents working on the Evolution of Todo project

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A