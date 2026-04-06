import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Enterprise-Grade Edge Middleware for Role-Based Access Control (RBAC).
 * Handles:
 * 1. Public route protection (login/register).
 * 2. Protected dashboard route guards.
 * 3. Role-specific node isolation.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Note: Tokens are stored in cookies for the middleware to read
  const token = request.cookies.get('accessToken')?.value;
  const userCookie = request.cookies.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // 1. Redirect unauthenticated users if trying to access dashboard
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Redirect authenticated users away from auth pages
  if (pathname.startsWith('/login') && token) {
    if (user?.role) {
      return NextResponse.redirect(new URL(`/dashboard/${user.role.toLowerCase()}`, request.url));
    }
  }

  // 3. Role-based granular node isolation
  if (pathname.startsWith('/dashboard/admin') && user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (pathname.startsWith('/dashboard/hod') && user?.role !== 'HOD') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (pathname.startsWith('/dashboard/faculty') && user?.role !== 'FACULTY') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (pathname.startsWith('/dashboard/student') && user?.role !== 'STUDENT') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
