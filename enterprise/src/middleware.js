import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
    // Parse cookies from the request
    const cookies = parse(req.headers.get('cookie') || '');
    const token = cookies['token'];
    const { pathname } = req.nextUrl;

    // Protect specific routes
    const protectedRoutes = ['/', '/user', '/vendor', '/order'];

    // Check if the route is protected and if the token exists
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            // Redirect to login if the token is not present
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Allow all other requests
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/user/:path*', '/vendor/:path*', '/order/:path*'],
};
