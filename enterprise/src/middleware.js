import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
    // Parse cookies from the request
    const cookies = parse(req.headers.get('cookie') || '');
    const token = cookies['token'];
    const { pathname } = req.nextUrl;

    console.log('Token:', token); // Debugging: Log the token value
    console.log('Pathname:', pathname); // Debugging: Log the pathname

    // Redirect if the user is authenticated and trying to access login or register pages
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect('https://enterprise-interface-nine.vercel.app/');
    }

    // Allow access to login or register pages if no token is present, or if the token exists
    if (pathname.startsWith('/login') || pathname.startsWith('/register') || token) {
        return NextResponse.next();
    }

    // Redirect to login if the token is not present and the path is not login or register
    if (!token && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        return NextResponse.redirect('/login');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/employees', '/dashboard', '/profile'], // Add all relevant paths
};
