# Deployment Instructions

## Backend Deployment (Render)

### Prerequisites
- Render account
- GitHub repository for the backend code

### Steps
1. Push backend code to GitHub repository
2. Connect repository to Render
3. Create a new Web Service with these settings:
   - Name: `taskmaster-backend`
   - Runtime: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     - `DATABASE_URL`: Your Neon database connection string
     - `GEMINI_API_KEY`: Your Google Gemini API key
     - `JWT_SECRET`: Your JWT secret key

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository for the frontend code

### Steps
1. Push frontend code to GitHub repository
2. Import project in Vercel
3. Configure these settings:
   - Framework Preset: Next.js
   - Environment Variables:
     - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., https://taskmaster-backend.onrender.com)

## Environment Configuration

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host/database
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-jwt-secret-change-in-production
CORS_ORIGINS=["https://your-frontend-url.vercel.app"]
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

## Testing After Deployment

1. Visit your frontend URL
2. The chat interface should load
3. Try sending a message like "Add buy groceries"
4. The AI should respond and create a task
5. Verify tasks can be listed, completed, updated, and deleted