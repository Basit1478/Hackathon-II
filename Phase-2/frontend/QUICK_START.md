# TaskFlow Pro - Quick Start Guide

## Prerequisites
- Backend running on `http://localhost:8000`
- Node.js installed
- Dependencies installed (`npm install`)

## Start the App

```bash
# From the frontend directory
npm run dev
```

Visit: http://localhost:3000

## Test the Auth Flow

### 1. Signup (http://localhost:3000/signup)
```
Name: John Doe
Email: john@example.com
Password: Test1234
Confirm Password: Test1234
```

### 2. Login (http://localhost:3000/login)
```
Email: john@example.com
Password: Test1234
```

## What Was Fixed

1. **Removed conflicting Next.js rewrites** in `next.config.ts`
2. **Enhanced error handling** in signup and login pages
3. **Added comprehensive logging** for debugging
4. **Improved API client** with timeout and better error messages
5. **Added response validation** to ensure backend returns correct data

## Check Browser Console

Press F12 to open Developer Tools and check the Console tab for:
- API URL configuration
- Request/response logs
- Any error messages

## Files Modified

1. `next.config.ts` - Removed rewrites
2. `app/(auth)/signup/page.tsx` - Better error handling
3. `app/(auth)/login/page.tsx` - Better error handling
4. `lib/api.ts` - Enhanced logging and timeout

## Testing Backend Directly

Run the test script:
```bash
node test-auth.js
```

Expected output:
```
✓ Signup successful
✓ Login successful
✗ Task creation failed (backend issue)
```

The auth endpoints work perfectly. The task creation has a backend issue (500 error).

## Environment Variables

Make sure `.env.local` exists with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Common Issues

### "Network Error"
- Backend not running → Start backend on port 8000

### "Email already registered"
- Use different email → Try john2@example.com

### Password validation error
- Password must have:
  - At least 8 characters
  - One uppercase letter
  - One number

## Success Indicators

When everything works:
1. Form submits without errors
2. Console shows "Signup successful" or "Login successful"
3. Browser redirects to `/dashboard`
4. localStorage has `taskflow_token` and `taskflow_user`

## Need Help?

Check `AUTH_FIXES.md` for detailed documentation.
