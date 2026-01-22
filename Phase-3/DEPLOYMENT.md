# Deployment Guide

## Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set root directory to `Phase-3/backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables:
   - `DATABASE_URL`
   - `GEMINI_API_KEY`
   - `JWT_SECRET`
   - `CORS_ORIGINS`

## Frontend Deployment (Vercel)

1. Import project from GitHub
2. Set root directory to `Phase-3/frontend`
3. Framework preset: Next.js
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL

## Database (Neon)

1. Create a Neon project
2. Copy the connection string
3. Use in backend's DATABASE_URL environment variable
