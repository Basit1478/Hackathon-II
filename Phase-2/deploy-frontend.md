# Frontend Deployment to Vercel - Step by Step

## Prerequisites
- Backend deployed to Render
- Backend URL (e.g., `https://taskflow-pro-backend.onrender.com`)

## Quick Start with Vercel Dashboard

### 1. Access Vercel Dashboard
Go to: https://vercel.com/dashboard

### 2. Import Project
1. Click **"Add New..."** button
2. Select **"Project"**
3. Click **"Import Git Repository"**

### 3. Connect Repository
1. If not connected, click **"Continue with GitHub"**
2. Authorize Vercel
3. Search for: `Basit1478/Hackathon-II-The-Evolution-Of-Todo`
4. Click **"Import"**

### 4. Configure Project

Fill in these settings:

| Field | Value |
|-------|-------|
| **Project Name** | `taskflow-pro` (or your preference) |
| **Framework Preset** | Next.js (auto-detected) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | `.next` (default) |
| **Install Command** | `npm install` (default) |

### 5. Add Environment Variable

Click **"Environment Variables"**

Add this variable:

**Variable Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:** (Replace with your actual Render backend URL)
```
https://taskflow-pro-backend.onrender.com
```

**Environments:** Select all:
- ✅ Production
- ✅ Preview
- ✅ Development

### 6. Deploy
1. Click **"Deploy"**
2. Wait 3-5 minutes for deployment
3. Watch build logs for any errors

### 7. Get Your Frontend URL
After deployment completes, you'll see:
```
https://taskflow-pro.vercel.app
```

Click **"Visit"** to open your app.

### 8. Update Backend CORS

**CRITICAL**: Go back to Render and update CORS:

1. Go to https://dashboard.render.com
2. Select your backend service
3. Go to **"Environment"** tab
4. Edit `CORS_ORIGINS` variable
5. Change value to your Vercel URL:
   ```
   https://taskflow-pro.vercel.app
   ```
6. Click **"Save Changes"**
7. Wait for backend to redeploy (~2 minutes)

### 9. Test Your Application

Visit your Vercel URL and test:

#### Test 1: Signup
1. Go to `/signup`
2. Create account:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123!@#`
3. Should redirect to `/dashboard`
4. Should see welcome message

#### Test 2: Tasks
1. Click **"New Task"**
2. Enter title and description
3. Click **"Create"**
4. Task should appear in list
5. Toggle checkbox to complete
6. Click delete to remove

#### Test 3: Logout & Login
1. Click **"Logout"**
2. Should redirect to `/login`
3. Login with same credentials
4. Should see your tasks

### 10. Common Issues

#### Build Fails
**Error:** `Module not found`
- **Fix:** Check `package.json` has all dependencies
- Run `npm install` locally to verify

**Error:** `Type errors`
- **Fix:** TypeScript build errors are ignored in config
- Check `next.config.ts` has `ignoreBuildErrors: true`

#### Runtime Errors
**Error:** `CORS error when calling API`
- **Fix:** Verify `CORS_ORIGINS` in Render matches Vercel URL exactly
- Include `https://` protocol
- No trailing slash

**Error:** `API_URL is undefined`
- **Fix:** Check `NEXT_PUBLIC_API_URL` is set in Vercel
- Must start with `NEXT_PUBLIC_` prefix
- Redeploy after adding

#### Authentication Issues
**Error:** `401 Unauthorized`
- **Fix:** Token not being saved/sent
- Check browser localStorage
- Clear cache and try again

**Error:** `Network error`
- **Fix:** Backend might be down
- Check Render backend is running
- Visit backend health endpoint

### 11. Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel project settings
2. Click **"Domains"** tab
3. Click **"Add"**
4. Enter your domain (e.g., `taskflow.yourdomain.com`)
5. Follow DNS configuration instructions
6. Update `CORS_ORIGINS` in Render to include new domain

### 12. Monitoring

#### View Logs
1. Go to Vercel dashboard
2. Click your project
3. Go to **"Deployments"**
4. Click on latest deployment
5. View **"Function Logs"** for runtime errors

#### Analytics
Vercel provides:
- Page views
- Unique visitors
- Performance metrics
- Web Vitals

Access via **"Analytics"** tab in project settings.

### 13. Redeploy

If you need to redeploy:

**Option 1: Push to GitHub**
```bash
git add .
git commit -m "Update"
git push
```
Vercel auto-deploys on push.

**Option 2: Manual Redeploy**
1. Go to Vercel dashboard
2. Click **"Deployments"**
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

## Production Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Signup flow works
- [ ] Login flow works
- [ ] Task creation works
- [ ] Task completion toggle works
- [ ] Task deletion works
- [ ] Auth tokens persist across page reloads
- [ ] Mobile responsive design tested
- [ ] No console errors in browser
- [ ] HTTPS is working on both URLs

## Success!

Your TaskFlow Pro application is now live in production!

**URLs:**
- Frontend: `https://taskflow-pro.vercel.app`
- Backend: `https://taskflow-pro-backend.onrender.com`
- API Docs: `https://taskflow-pro-backend.onrender.com/docs`

Share these URLs to access your app from anywhere!
