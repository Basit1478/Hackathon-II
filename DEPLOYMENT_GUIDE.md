# TaskFlow Pro - Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/Basit1478/Hackathon-II-The-Evolution-Of-Todo.git
- Neon PostgreSQL database already set up
- Render account
- Vercel account

## 1. Backend Deployment (Render)

### Step 1: Create New Web Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect to your GitHub repository
4. Select the repository: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
5. Select branch: `main`

### Step 2: Configure Service
- **Name**: `taskflow-pro-backend` (or your preferred name)
- **Region**: Ohio (US East) - recommended
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host=0.0.0.0 --port=${PORT:-8000}`

### Step 3: Environment Variables
Add the following environment variables in Render:

```
DATABASE_URL=postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=UN36uUNSK1v25iMiVxLtU3jc134QwjYn
CORS_ORIGINS=https://your-frontend-url.vercel.app
```

**IMPORTANT**: After deploying the frontend to Vercel, come back and update `CORS_ORIGINS` with your actual Vercel URL.

### Step 4: Deploy
- Click "Create Web Service"
- Wait for the deployment to complete
- Note your backend URL (e.g., `https://taskflow-pro-backend.onrender.com`)

## 2. Frontend Deployment (Vercel)

The frontend will be deployed automatically using the Vercel CLI or dashboard.

### Option A: Using Vercel CLI (Recommended)
Run these commands from the project root:

```bash
cd frontend
vercel --prod
```

### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Environment Variables (Vercel)
Add this environment variable:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with your actual Render backend URL.

## 3. Post-Deployment Configuration

### Update Backend CORS
1. Go back to Render dashboard
2. Navigate to your backend service
3. Go to "Environment" tab
4. Update `CORS_ORIGINS` to include your Vercel URL:
   ```
   CORS_ORIGINS=https://your-app.vercel.app
   ```
5. Save and redeploy

### Test the Deployment
1. Visit your Vercel URL
2. Test signup flow:
   - Go to /signup
   - Create a new account
   - Verify you're redirected to dashboard
3. Test login flow:
   - Logout
   - Login with your credentials
4. Test task management:
   - Create a new task
   - Toggle task completion
   - Delete a task

## 4. Monitoring & Debugging

### Backend Logs (Render)
- Go to Render dashboard → Your service → "Logs" tab
- Check for any errors during startup or requests

### Frontend Logs (Vercel)
- Go to Vercel dashboard → Your project → "Deployments" → Click on deployment
- Check build logs and runtime logs

### Common Issues

#### CORS Errors
- Ensure `CORS_ORIGINS` in backend matches your Vercel URL exactly
- Include `https://` protocol
- No trailing slash

#### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure Neon database is not suspended (free tier)
- Check if IP whitelisting is enabled in Neon

#### Build Failures
- Backend: Check if all dependencies are in `requirements.txt`
- Frontend: Ensure all npm packages are in `package.json`

## 5. Production URLs

After deployment, you should have:
- **Backend**: `https://taskflow-pro-backend.onrender.com`
- **Frontend**: `https://your-app.vercel.app`

Update this file with your actual URLs once deployed.

## 6. Security Checklist

- [ ] `BETTER_AUTH_SECRET` is a strong random string
- [ ] Database credentials are secure and not exposed
- [ ] CORS is configured to only allow your frontend domain
- [ ] HTTPS is enabled on both services (automatic on Render and Vercel)
- [ ] Environment variables are not committed to git

## 7. Next Steps

1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up CI/CD pipeline
4. Add rate limiting for production
5. Configure database backups in Neon
