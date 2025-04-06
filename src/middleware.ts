// middleware/cookie-check.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { roleBasedRedirects } from './utils/constant/Data';

export default function middleware(request: NextRequest) {
  const cookie = request.cookies.get('users');
  const parsedData = cookie && JSON.parse(cookie?.value);
  const url = request.nextUrl.pathname;

  if (!cookie && url !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    parsedData?.role in roleBasedRedirects &&
    !url.startsWith(roleBasedRedirects[parsedData.role])
  ) {
    return NextResponse.redirect(
      new URL(roleBasedRedirects[parsedData.role], request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/teacher/:path*',
    '/student/:path*',
    '/admin/:path*',
    '/admin',
  ],
};
