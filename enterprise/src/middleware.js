import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
    // Parse cookies from the request
    const cookies = parse(req.headers.get('cookie') || '');
    const token = cookies['token'];
    const { pathname } = req.nextUrl;

    // Log details to ensure middleware is running and paths are correct
    console.log('Middleware Path:', pathname);
    console.log('Token:', token);

    // Protect specific routes
    const protectedRoutes = ['/', '/employees', '/vendors', '/orders'];

    // Check if the route is protected and if the token exists
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            console.log('No token found, redirecting to login.');
            // Redirect to login if the token is not present
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Allow all other requests
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/employees/:path*', '/vendors/:path*', '/orders/:path*'],
};
