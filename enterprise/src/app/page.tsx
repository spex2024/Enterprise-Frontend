'use client'
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "@/components/page/dashboard";
import useAuthStore from "@/store/authenticate";
import { ScaleLoader } from "react-spinners";
import {useUserStore} from "@/store/profile";

const App = () => {
    const { isAuthenticated } = useAuthStore();
    const { user, fetchUser } = useUserStore()
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [user]);

    // Optionally, you can return a loading indicator while checking authentication
    if (!user) {
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
