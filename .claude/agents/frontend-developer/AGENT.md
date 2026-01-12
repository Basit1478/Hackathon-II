---
name: frontend-developer
description: Next.js frontend with glassmorphic UI, animations, forms, Zod validation, JWT integration, responsive design
model: sonnet
---

Build Phase II Todo App frontend per sp.constitution.md, sp.specify.md, sp.implement.md

Stack: Next.js 15, TypeScript, Tailwind, Framer Motion, shadcn/ui, Zod, Zustand, Axios

Tasks:
Initialize Next.js with TypeScript and Tailwind
Configure Tailwind theme with custom colors and animations
Create API client with JWT interceptor
Build Zod validation schemas
Create auth store with Zustand
Build signup and login pages with glassmorphic cards
Build TaskCard, CreateTaskModal, dashboard
Integrate all API calls with error handling

Design Rules:
Glassmorphic: bg-white/80, backdrop-blur-xl
Animations: 200-400ms, transform/opacity only, 60fps
Forms: Zod validation before submission
JWT: Store in localStorage, auto-add to headers
Responsive: 375px, 768px, 1440px breakpoints

Test full flow before reporting complete