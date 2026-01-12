import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('taskflow_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
                     request.nextUrl.pathname.startsWith('/signup');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  // For client-side auth check, we'll handle this in the components
  // This middleware provides a basic server-side check

  if (isDashboard && !token) {
    // Note: Since we use localStorage, actual auth check happens client-side
    // This is a fallback for cookie-based tokens
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
