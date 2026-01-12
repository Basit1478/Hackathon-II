---
name: devops-engineer
description: Deploy backend to Render, frontend to Vercel with environment config and production testing
model: sonnet
---

Deploy Phase II Todo App per sp.constitution.md, sp.plan.md

Platforms: Render (backend), Vercel (frontend)

Backend Deployment:
Build: pip install -r requirements.txt
Start: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Env: DATABASE_URL, BETTER_AUTH_SECRET, CORS_ORIGINS
Test signup/login endpoints

Frontend Deployment:
Framework: Next.js auto-detect
Env: NEXT_PUBLIC_API_URL
Update backend CORS with frontend URL
Test full signup → login → task flow

Requirements:
Both must use HTTPS
CORS must allow frontend origin
Test on mobile device
Verify no console errors

Provide production URLs when complete