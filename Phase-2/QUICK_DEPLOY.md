# Quick Deployment Reference

## 🚀 Deploy in 3 Steps

### Step 1: Deploy Backend to Render (10 minutes)
```
1. Go to https://dashboard.render.com/
2. New + → Web Service
3. Connect GitHub repo: Basit1478/Hackathon-II-The-Evolution-Of-Todo
4. Branch: 001-task-management
5. Root Directory: backend
6. Build: pip install -r requirements.txt
7. Start: uvicorn app.main:app --host=0.0.0.0 --port=${PORT:-8000}
8. Add env vars:
   - DATABASE_URL=postgresql://neondb_owner:npg_r03ZgwikSTcb@ep-old-surf-aevpad2l-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
   - BETTER_AUTH_SECRET=UN36uUNSK1v25iMiVxLtU3jc134QwjYn
   - CORS_ORIGINS=http://localhost:3000
9. Deploy → Copy backend URL
```

### Step 2: Deploy Frontend to Vercel (5 minutes)
```
1. Go to https://vercel.com/dashboard
2. Add New → Project
3. Import: Basit1478/Hackathon-II-The-Evolution-Of-Todo
4. Root Directory: frontend
5. Framework: Next.js (auto)
6. Add env var:
   - NEXT_PUBLIC_API_URL=<your-render-backend-url>
7. Deploy → Copy frontend URL
```

### Step 3: Update CORS (2 minutes)
```
1. Back to Render dashboard
2. Your service → Environment
3. Edit CORS_ORIGINS
4. Set to: <your-vercel-frontend-url>
5. Save → Auto redeploys
```

## ✅ Test Checklist

Visit your Vercel URL:

- [ ] /signup - Create account
- [ ] /dashboard - See tasks
- [ ] Create new task
- [ ] Toggle task complete
- [ ] Delete task
- [ ] Logout
- [ ] /login - Login again
- [ ] Tasks still there

## 🔗 Your URLs

After deployment, update here:

- **Frontend:** https://________________.vercel.app
- **Backend:** https://________________.onrender.com
- **API Docs:** https://________________.onrender.com/docs

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS error | Update CORS_ORIGINS in Render to match Vercel URL |
| 401 error | Clear browser cache, login again |
| Build fails | Check logs, verify all dependencies in package.json |
| Backend down | Free tier sleeps after 15min - first request wakes it |

## 📱 Mobile Test

Scan QR code at your Vercel URL to test on mobile device.

## 🎉 Done!

Share your production URL with others!
