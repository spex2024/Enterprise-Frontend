import { NextResponse } from 'next/server';
import { parse } from 'cookie';


export async function middleware(req) {
    // Parse cookies from the request
    const cookies = parse(req.headers.get('cookie') || '');
    const token = cookies['token'];
    const { pathname } = req.nextUrl;

    // Prevent users with a token from accessing the login or register pages
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Allow requests if:
    // - They are for the login product or register product and the token does not exist
    // - The token exists (i.e., the user is authenticated)
    if (pathname.startsWith('/login') || pathname.startsWith('/register') || token) {
        return NextResponse.next();
    }

    // Redirect to login if the token is not present and the path is not login or register
    if (!token && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/employees', '/home'], // Apply middleware to the specified pages
};
