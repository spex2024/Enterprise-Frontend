import { NextResponse } from 'next/server'

export function middleware(request) {
    // Extract cookies from the request
    const cookies = request.cookies;
    const token = cookies.get('token'); // Replace 'token' with your actual cookie name
     console.log('token', token);
    // Check if the token exists
    if (token) {
        // If token exists, proceed to the requested URL or another URL based on your logic
        return NextResponse.next(); // Continue to the requested URL
    } else {
        // If token does not exist, redirect to the login page or another page
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Define the paths where this middleware should apply
export const config = {
    matcher: '/',
}
