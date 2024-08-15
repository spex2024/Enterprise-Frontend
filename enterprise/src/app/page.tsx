'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "@/components/page/dashboard";
import useAuthStore from "@/store/authenticate";
import { ScaleLoader } from "react-spinners";
import { parseCookies } from 'nookies'; // Import nookies to handle cookies

const App = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = () => {
            const cookies = parseCookies(); // Get all cookies
            const token = cookies.token; // Retrieve token from cookies
             console.log(cookies.token);
            if (token) {
                // Here you would normally verify the token, but for simplicity, we assume it's valid
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push('/login'); // Redirect to login page if not authenticated
            }
        };

        checkAuthentication();
    }, [isAuthenticated, router, setIsAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <ScaleLoader color={'#000'} />
            </div>
        );
    }

    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default App;
