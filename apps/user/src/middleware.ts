import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getUser } from './functions/auth.functions';

const nonProtectedRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

const protectedRoutes = ['/cart', '/profile'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (nonProtectedRoutes.includes(request.nextUrl.pathname)) {
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

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
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
