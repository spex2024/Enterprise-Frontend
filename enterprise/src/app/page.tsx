'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "@/components/page/dashboard";
import useAuthStore from "@/store/authenticate";
import { ScaleLoader } from "react-spinners";
import { useUserStore } from "@/store/profile";
import Cookies from "js-cookie";


const App = () => {
    const { isAuthenticated } = useAuthStore();
    const { user, fetchUser } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        // Fetch user data if not already available
        if (!user) {
            fetchUser();
        }

        const timer = setTimeout(() => {
            // Check authentication and user data
            if (!isAuthenticated || !user) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [isAuthenticated, user, fetchUser, router]);

    // Optionally, you can return a loading indicator while checking authentication
    if (!isAuthenticated || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <ScaleLoader color={'#000'} />
            </div>
        );
    }

    // Example of using cookies
    const userCookie = Cookies.get('token');
    console.log('User Cookie:', userCookie);

    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default App;
