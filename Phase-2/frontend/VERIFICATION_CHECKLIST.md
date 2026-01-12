# TaskFlow Pro - Verification Checklist

## Pre-Flight Checks

### Backend Status
- [ ] Backend is running on http://localhost:8000
- [ ] Can access http://localhost:8000/docs (FastAPI docs)
- [ ] Test signup endpoint: `curl -X POST http://localhost:8000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","password":"Test1234"}'`

### Frontend Setup
- [ ] Dependencies installed: `npm install`
- [ ] .env.local exists with `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Dev server starts: `npm run dev`
- [ ] Can access http://localhost:3000

## Functional Tests

### 1. Landing Page (http://localhost:3000)
- [ ] Page loads without errors
- [ ] Animations are smooth (blob animation, fade-ins)
- [ ] "Sign Up" and "Log In" buttons work
- [ ] If logged in, redirects to dashboard

### 2. Signup Page (http://localhost:3000/signup)
- [ ] Page loads without errors
- [ ] Form has all fields (Name, Email, Password, Confirm Password)
- [ ] Glassmorphic card design is visible
- [ ] Form validation works:
  - [ ] Name: min 2 chars required
  - [ ] Email: valid email required
  - [ ] Password: min 8 chars, 1 uppercase, 1 number
  - [ ] Confirm: must match password
- [ ] Submit with valid data:
  - [ ] Loading spinner appears
  - [ ] Success: redirects to dashboard
  - [ ] Error: shows error message in red banner
- [ ] "Already have an account? Log in" link works

### 3. Login Page (http://localhost:3000/login)
- [ ] Page loads without errors
- [ ] Form has Email and Password fields
- [ ] Form validation works:
  - [ ] Email: valid email required
  - [ ] Password: required
- [ ] Submit with valid credentials:
  - [ ] Loading spinner appears
  - [ ] Success: redirects to dashboard
  - [ ] Error: shows error message
- [ ] "Don't have an account? Sign up" link works

### 4. Dashboard Page (http://localhost:3000/dashboard)
- [ ] Redirects to login if not authenticated
- [ ] Shows user's name: "Welcome, [Name]!"
- [ ] Shows task counters (pending/completed)
- [ ] Logout button works
- [ ] Shows "No tasks yet" message if no tasks
- [ ] Create task button visible (+ FAB)

### 5. Browser Console Checks (F12 → Console)
- [ ] No React errors
- [ ] No TypeScript errors
- [ ] See: `API_URL configured as: http://localhost:8000`
- [ ] On signup/login, see: `Attempting signup/login with: ...`
- [ ] On success, see: `Signup/Login successful: ...`
- [ ] On API call, see: `API Response: /api/auth/... 200`

### 6. Browser DevTools Checks (F12)

#### Network Tab
- [ ] Signup request shows:
  - URL: http://localhost:8000/api/auth/signup
  - Method: POST
  - Status: 200
  - Response has `user` and `token`
- [ ] Login request shows:
  - URL: http://localhost:8000/api/auth/login
  - Method: POST
  - Status: 200
  - Response has `user` and `token`

#### Application Tab → Local Storage
After successful signup/login:
- [ ] `taskflow_token` exists with JWT value
- [ ] `taskflow_user` exists with user JSON

#### Console Tab
- [ ] No errors (red messages)
- [ ] Expected logs appear
- [ ] Warnings (yellow) are acceptable

### 7. Error Handling Tests

#### Invalid Email
- [ ] Enter invalid email → Shows "Invalid email address"

#### Weak Password
- [ ] Enter "test" → Shows "Password must be at least 8 characters"
- [ ] Enter "testtest" → Shows "Password must contain at least one uppercase letter"
- [ ] Enter "TestTest" → Shows "Password must contain at least one number"

#### Password Mismatch
- [ ] Password: "Test1234", Confirm: "Test5678" → Shows "Passwords don't match"

#### Wrong Credentials (Login)
- [ ] Wrong email/password → Shows error message

#### Network Error
- [ ] Stop backend → Try signup/login → Shows network error message

### 8. Visual Design Checks
- [ ] Background gradient visible (purple/pink/indigo)
- [ ] Cards have glassmorphic effect (blurred background)
- [ ] Text is readable (white on dark background)
- [ ] Animations are smooth (no jank)
- [ ] Responsive on mobile (375px width)
- [ ] Responsive on tablet (768px width)
- [ ] Responsive on desktop (1440px width)

### 9. User Flow Test
Complete flow from start to finish:

1. [ ] Open http://localhost:3000
2. [ ] Click "Sign Up"
3. [ ] Fill form with new email
4. [ ] Submit → Should redirect to dashboard
5. [ ] See welcome message with your name
6. [ ] Click "Logout"
7. [ ] Should redirect to login
8. [ ] Enter same credentials
9. [ ] Submit → Should redirect to dashboard
10. [ ] See same welcome message

### 10. Code Quality Checks
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No ESLint errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Test script works: `node test-auth.js`

## Test Accounts

Use these for testing:

### Test Account 1
```
Name: John Doe
Email: john@example.com
Password: Test1234
```

### Test Account 2
```
Name: Jane Smith
Email: jane@example.com
Password: Test1234
```

## Common Issues

### Issue: "Network Error"
**Check:**
- [ ] Backend is running
- [ ] Backend is on port 8000
- [ ] .env.local has correct URL
- [ ] CORS is enabled on backend

### Issue: "Email already registered"
**Solution:**
- [ ] Use different email
- [ ] Or delete user from backend database

### Issue: Form doesn't submit
**Check:**
- [ ] Browser console for errors
- [ ] Network tab for failed requests
- [ ] Form validation errors displayed

### Issue: Not redirecting to dashboard
**Check:**
- [ ] Console logs show "Signup/Login successful"
- [ ] localStorage has token and user
- [ ] No JavaScript errors in console

### Issue: Dashboard shows loading forever
**Check:**
- [ ] localStorage has valid token
- [ ] Token is not expired
- [ ] Clear localStorage and login again

## Performance Checks

### Page Load Speed
- [ ] Landing page loads < 1 second
- [ ] Signup page loads < 1 second
- [ ] Login page loads < 1 second
- [ ] Dashboard loads < 1 second

### Animation Smoothness
- [ ] Blob animation runs at ~60fps
- [ ] Form animations are smooth
- [ ] Card entrance animations are smooth
- [ ] No layout shifts during animation

### API Response Time
- [ ] Signup completes < 2 seconds
- [ ] Login completes < 2 seconds
- [ ] No timeout errors (10 second limit)

## Accessibility Checks

- [ ] All form inputs have labels
- [ ] Error messages are descriptive
- [ ] Buttons have clear text
- [ ] Color contrast is sufficient
- [ ] Can navigate with keyboard (Tab)

## Security Checks

- [ ] Password is not visible in console logs
- [ ] Token is stored securely in localStorage
- [ ] No sensitive data in URL
- [ ] 401 errors trigger logout
- [ ] Token is attached to authenticated requests

## Final Sign-Off

### All Tests Passed
- [ ] All checkboxes above are checked
- [ ] No blocking issues found
- [ ] Ready for backend integration
- [ ] Ready for user testing

### Notes
```
Date tested: _____________
Tester: _____________
Browser: _____________
OS: _____________
Issues found: _____________
```

## Success Criteria

✅ Frontend auth is complete when:
1. Signup creates account and redirects to dashboard
2. Login authenticates and redirects to dashboard
3. Logout clears session and redirects to login
4. Form validation prevents invalid submissions
5. Error messages are clear and helpful
6. UI is responsive and animated
7. No console errors
8. TypeScript compiles without errors
9. Tests pass in multiple browsers
10. Code is documented and maintainable

---

**Status:** Ready for testing
**Last Updated:** 2026-01-10
**Version:** 1.0
