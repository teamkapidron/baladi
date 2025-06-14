import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getUser, getUserStatus } from './functions/auth.functions';

const noAuthRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

const protectedRoutes = ['/cart', '/wishlist', '/order', '/address'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (noAuthRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      try {
        const user = await getUser(token);
        if (user) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch {
        return NextResponse.next();
      }
    }
  }

  if (request.nextUrl.pathname === '/onboarding') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const user = await getUserStatus(token);
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (user.isApprovedByAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname === '/wait-for-approval') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const user = await getUserStatus(token);
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (!user.isApprovedByAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const user = await getUser(token);
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
