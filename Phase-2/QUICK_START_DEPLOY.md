# Quick Start: Deploy TaskFlow Pro to Production

## Overview
This guide will help you deploy TaskFlow Pro in under 15 minutes using Render (backend) and Vercel (frontend).

---

## Step 1: Deploy Backend to Render (5 minutes)

### Option A: Automatic Deploy (Recommended)

Click this button to deploy directly from GitHub:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Or manually:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Click **"New +"** → **"Web Service"**

2. **Connect Repository**
   - Select: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
   - Branch: `001-task-management` (or `main` if merged)

3. **Configure Service** (use these EXACT values):
   ```
   Name: taskflow-pro-backend
   Region: Ohio (US East)
   Branch: 001-task-management
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   Instance Type: Starter (Free)
   ```

4. **Set Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```env
   DATABASE_URL=postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

   BETTER_AUTH_SECRET=taskflow-pro-secret-key-2025-production-secure-random-string-xyz789

   CORS_ORIGINS=http://localhost:3000
   ```
   *Note: We'll update CORS_ORIGINS after deploying frontend*

5. **Deploy**
   - Click **"Create Web Service"**
   - Wait 5-7 minutes for deployment
   - **Copy your backend URL** (e.g., `https://taskflow-pro-backend.onrender.com`)

---

## Step 2: Deploy Frontend to Vercel (3 minutes)

### Option A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click **"Import Project"**
   - Select: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
   - Click **"Import"**

3. **Configure Project**:
   ```
   Project Name: taskflow-pro
   Framework Preset: Next.js (auto-detected)
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add:
     ```
     Key: NEXT_PUBLIC_API_URL
     Value: https://taskflow-pro-backend.onrender.com
     ```
     *(Replace with YOUR actual Render URL from Step 1)*

5. **Deploy**:
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - **Copy your frontend URL** (e.g., `https://taskflow-pro.vercel.app`)

### Option B: Using Vercel CLI (Advanced)

```bash
cd frontend
vercel --prod

# When prompted:
# - Set project name: taskflow-pro
# - Link to existing project: No
# - Environment variables:
#   NEXT_PUBLIC_API_URL = https://taskflow-pro-backend.onrender.com
```

---

## Step 3: Update Backend CORS (2 minutes)

Now that you have the frontend URL, update the backend to accept requests from it:

1. **Go to Render Dashboard**
   - Open your backend service
   - Click **"Environment"** tab

2. **Edit CORS_ORIGINS**:
   - Find `CORS_ORIGINS`
   - Change value to: `https://taskflow-pro.vercel.app`
     *(Replace with YOUR actual Vercel URL from Step 2)*

   For multiple origins (dev + prod):
   ```
   https://taskflow-pro.vercel.app,http://localhost:3000
   ```

3. **Save & Redeploy**:
   - Click **"Save Changes"**
   - Render will automatically redeploy (takes ~2 minutes)

---

## Step 4: Test Your Deployment (5 minutes)

### Backend Health Check

Open in browser or use curl:
```bash
https://taskflow-pro-backend.onrender.com/health
```

Expected response:
```json
{"status": "ok"}
```

### Frontend Test

1. **Open your Vercel URL** in a browser
2. **Sign Up Flow**:
   - Click "Sign Up"
   - Enter: email, username, password
   - Should redirect to dashboard

3. **Login Flow**:
   - Logout
   - Click "Login"
   - Enter credentials
   - Should redirect to dashboard

4. **Task Management**:
   - Click "New Task" or "+"
   - Create a task with title and description
   - Check/uncheck to toggle completion
   - Delete a task

### Mobile Test

Open your Vercel URL on your mobile device and test all features.

---

## Your Production URLs

After successful deployment, update these with your actual URLs:

```
Backend API:  https://taskflow-pro-backend.onrender.com
Frontend App: https://taskflow-pro.vercel.app
Database:     Neon PostgreSQL (already configured)
```

---

## Troubleshooting

### Issue: CORS Error in Browser Console

**Solution**: Make sure backend `CORS_ORIGINS` matches EXACT frontend URL
- Include `https://`
- No trailing slash
- Check spelling

### Issue: "Cannot connect to database"

**Solution**:
1. Check DATABASE_URL in Render environment variables
2. Ensure Neon database is not suspended (free tier auto-suspends)
3. Test connection: Visit `/health` endpoint

### Issue: Frontend shows "Network Error"

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
2. Check backend is running (visit backend URL)
3. Check browser console for error details

### Issue: Build Failed on Vercel

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### Issue: Build Failed on Render

**Solution**:
1. Check logs in Render dashboard
2. Ensure all dependencies are in `requirements.txt`
3. Verify Python version (should be 3.11+)

---

## Environment Variables Reference

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Neon | `postgresql://user:pass@host/db?sslmode=require` |
| `BETTER_AUTH_SECRET` | Secret key for JWT tokens | Any strong random string (min 32 chars) |
| `CORS_ORIGINS` | Allowed frontend URLs (comma-separated) | `https://taskflow-pro.vercel.app` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL from Render | `https://taskflow-pro-backend.onrender.com` |

---

## Security Checklist

- [x] HTTPS enabled (automatic on Render and Vercel)
- [x] Database uses SSL connection (`sslmode=require`)
- [ ] BETTER_AUTH_SECRET is a strong random string
- [ ] CORS only allows specific frontend domain
- [ ] No `.env` files committed to Git
- [ ] Environment variables set in platform dashboards

---

## Next Steps

1. **Custom Domain** (Optional):
   - Render: Settings → Custom Domain
   - Vercel: Settings → Domains

2. **Monitoring**:
   - Set up Render alerts
   - Enable Vercel Analytics

3. **Database Backups**:
   - Configure in Neon dashboard
   - Set up automatic backups

4. **CI/CD**:
   - Both platforms auto-deploy on git push
   - Configure branch protection rules

---

## Support

### Logs

- **Render**: Dashboard → Service → Logs tab
- **Vercel**: Dashboard → Project → Deployments → Build/Runtime logs

### Database

- **Neon**: Dashboard at https://console.neon.tech/
- Monitor active connections and usage

### Documentation

- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Neon: https://neon.tech/docs

---

## Quick Commands

### Check Backend Status
```bash
curl https://taskflow-pro-backend.onrender.com/health
```

### Test Signup Endpoint
```bash
curl -X POST https://taskflow-pro-backend.onrender.com/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","username":"testuser"}'
```

### Redeploy Vercel (with CLI)
```bash
cd frontend
vercel --prod
```

### View Render Logs (with CLI)
```bash
render logs -s taskflow-pro-backend
```

---

**Deployment completed!** Your TaskFlow Pro app is now live on production.
