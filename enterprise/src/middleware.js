import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
    // Parse cookies from the request
    const cookies = parse(req.headers.get('cookie') || '');
    const token = cookies['token'];
    const { pathname } = req.nextUrl;

    // Log the token and pathname for debugging purposes
    console.warn('Token:', token);
    console.warn('Pathname:', pathname);

    // Allow requests if:
    // - They are for the login page
    // - The token exists (i.e., the user is authenticated)
    if (pathname.startsWith('/login') || token) {
        return NextResponse.next();
    }

    // Redirect to login if the token is not present and the path is not login
    if (!token && !pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'], // Exclude login page, apply to all others
};
