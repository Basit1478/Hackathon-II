# Backend Deployment to Render - Step by Step

## Quick Start with Render Dashboard

### 1. Access Render Dashboard
Go to: https://dashboard.render.com/

### 2. Create New Web Service
1. Click the **"New +"** button in the top right
2. Select **"Web Service"**

### 3. Connect Repository
1. If not connected, click **"Configure Account"** to connect GitHub
2. Grant access to your repository
3. Search for: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
4. Click **"Connect"**

### 4. Configure Service Settings

Fill in these exact values:

| Field | Value |
|-------|-------|
| **Name** | `taskflow-pro-backend` |
| **Region** | Oregon (US West) or your preference |
| **Branch** | `001-task-management` |
| **Root Directory** | `backend` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:app --host=0.0.0.0 --port=${PORT:-8000}` |
| **Instance Type** | Free |

### 5. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these three environment variables:

#### Variable 1: DATABASE_URL
```
DATABASE_URL
```
Value:
```
postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
```

#### Variable 2: BETTER_AUTH_SECRET
```
BETTER_AUTH_SECRET
```
Value:
```
UN36uUNSK1v25iMiVxLtU3jc134QwjYn
```

#### Variable 3: CORS_ORIGINS (Update after frontend deployment)
```
CORS_ORIGINS
```
Value (temporary):
```
http://localhost:3000
```

**IMPORTANT**: After deploying frontend to Vercel, come back and update this to your Vercel URL.

### 6. Create Web Service
1. Click **"Create Web Service"** at the bottom
2. Wait 5-10 minutes for deployment
3. Watch the logs for any errors

### 7. Get Your Backend URL
After deployment completes, you'll see:
```
https://taskflow-pro-backend.onrender.com
```

Copy this URL - you'll need it for the frontend deployment.

### 8. Test Backend
Visit these URLs to verify:

1. Health check:
   ```
   https://taskflow-pro-backend.onrender.com/health
   ```
   Should return: `{"status":"ok"}`

2. API root:
   ```
   https://taskflow-pro-backend.onrender.com/
   ```
   Should return: `{"message":"TaskFlow Pro API","version":"1.0.0"}`

3. API docs:
   ```
   https://taskflow-pro-backend.onrender.com/docs
   ```
   Should show FastAPI Swagger UI

### 9. Common Issues

#### Build Fails
- Check logs for missing dependencies
- Ensure `requirements.txt` is correct
- Verify Python version compatibility

#### Start Fails
- Check if PORT environment variable is used correctly
- Verify `app.main:app` path is correct
- Check database connection string

#### Database Connection Issues
- Verify DATABASE_URL is correct (no extra spaces)
- Ensure Neon database is active
- Check if SSL is required (`sslmode=require`)

### 10. Update CORS After Frontend Deployment

Once you have your Vercel frontend URL:

1. Go to Render dashboard
2. Select your service
3. Go to **"Environment"** tab
4. Edit `CORS_ORIGINS`
5. Change to: `https://your-app.vercel.app`
6. Click **"Save Changes"**
7. Service will auto-redeploy

## Next: Deploy Frontend
After backend is deployed successfully, proceed to deploy the frontend to Vercel.
