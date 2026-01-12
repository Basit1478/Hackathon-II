# TaskFlow Pro - Deploy Now!

## Current Status
- Code pushed to GitHub: `https://github.com/Basit1478/Hackathon-II-The-Evolution-Of-Todo.git`
- Branch: `001-task-management`
- Database: Neon PostgreSQL (ready)
- Configuration: Complete

---

## Deploy in 3 Steps (10 minutes total)

### STEP 1: Deploy Backend to Render (5 min)

**Method A: Using Render Blueprint (Easiest)**

1. Click this link: https://dashboard.render.com/select-repo
2. Select your repository: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
3. Branch: `001-task-management`
4. Render will auto-detect `render.yaml`
5. Set these environment variables when prompted:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

   BETTER_AUTH_SECRET = taskflow-pro-secret-key-2025-production-secure-random-string-xyz789

   CORS_ORIGINS = http://localhost:3000
   ```
6. Click "Apply" and wait 5 minutes

**Method B: Manual Setup**

1. Go to: https://dashboard.render.com/
2. New + → Web Service
3. Connect GitHub: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
4. Branch: `001-task-management`
5. Configure:
   - Name: `taskflow-pro-backend`
   - Region: `Ohio (US East)`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Plan: `Starter` (free)
6. Environment Variables (same as above)
7. Create Web Service

**After Deploy:**
- Copy your backend URL (e.g., `https://taskflow-pro-backend-xyz.onrender.com`)
- Test: Visit `https://your-backend-url.onrender.com/health`
- Should show: `{"status":"ok"}`

---

### STEP 2: Deploy Frontend to Vercel (3 min)

**Method A: Vercel Dashboard (Easiest)**

1. Go to: https://vercel.com/new
2. Import Git Repository
3. Select: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
4. Configure:
   - Framework: `Next.js` (auto-detected)
   - Root Directory: `frontend`
   - Build: `npm run build` (auto-detected)
5. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com
   ```
   (Use YOUR actual Render URL from Step 1)
6. Click "Deploy"
7. Wait 2-3 minutes

**Method B: Vercel CLI**

```bash
cd "C:\Users\Windows 10 Pro\Desktop\Hackathon II Phase 2\Phase 2\frontend"
vercel --prod
```

**After Deploy:**
- Copy your frontend URL (e.g., `https://taskflow-pro-xyz.vercel.app`)
- Test: Open URL in browser

---

### STEP 3: Update CORS (2 min)

1. Go back to Render Dashboard
2. Open your backend service
3. Click "Environment" tab
4. Edit `CORS_ORIGINS`:
   ```
   https://your-frontend-url.vercel.app
   ```
   (Use YOUR actual Vercel URL from Step 2)

   Or for both dev and prod:
   ```
   https://your-frontend-url.vercel.app,http://localhost:3000
   ```
5. Save Changes (will auto-redeploy)

---

## Test Your Deployment

### 1. Backend Health Check
Visit: `https://your-backend-url.onrender.com/health`

Expected: `{"status":"ok"}`

### 2. Full Application Test

1. Open your Vercel URL
2. Click "Sign Up"
3. Create account (email, username, password)
4. Should redirect to dashboard
5. Create a new task
6. Toggle task completion
7. Delete a task

### 3. Mobile Test

Open your Vercel URL on mobile and test all features

---

## Environment Variables Summary

### Backend (Render)
| Variable | Value |
|----------|-------|
| DATABASE_URL | `postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require` |
| BETTER_AUTH_SECRET | `taskflow-pro-secret-key-2025-production-secure-random-string-xyz789` |
| CORS_ORIGINS | `https://your-vercel-url.vercel.app` |

### Frontend (Vercel)
| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_API_URL | `https://your-render-url.onrender.com` |

---

## Your Production URLs

Update after deployment:

```
Backend:  https://__________________________.onrender.com
Frontend: https://__________________________.vercel.app
Database: Neon PostgreSQL (already configured)
```

---

## Troubleshooting

### CORS Error?
- Make sure backend CORS_ORIGINS exactly matches frontend URL
- Include `https://` protocol
- No trailing slash

### Database Connection Error?
- Verify DATABASE_URL is correct in Render
- Check Neon database is active (free tier may suspend)

### Frontend Can't Connect?
- Verify NEXT_PUBLIC_API_URL in Vercel environment variables
- Check backend is running (visit /health endpoint)

---

## Quick Commands

### Check Backend
```bash
curl https://your-backend-url.onrender.com/health
```

### Test Signup
```bash
curl -X POST https://your-backend-url.onrender.com/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","username":"testuser"}'
```

---

## Support Resources

- **GitHub Repo**: https://github.com/Basit1478/Hackathon-II-The-Evolution-Of-Todo
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Neon Dashboard**: https://console.neon.tech/

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Share URLs with team/users
3. Set up custom domain (optional)
4. Enable monitoring/alerts
5. Configure database backups

---

**Ready to deploy? Start with Step 1 above!**

For detailed instructions, see `QUICK_START_DEPLOY.md`
