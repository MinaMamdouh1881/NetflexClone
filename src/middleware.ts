import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname === '/') {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (request.nextUrl.pathname === '/login') {
    if (cookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (request.nextUrl.pathname.includes('/sign-up')) {
    if (cookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (request.nextUrl.pathname.includes('/movies')) {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (request.nextUrl.pathname.includes('/tv-shows')) {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (request.nextUrl.pathname.includes('/video')) {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
