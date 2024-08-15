'use client'
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "@/components/page/dashboard";
import useAuthStore from "@/store/authenticate";
import { ScaleLoader } from "react-spinners";

const App = () => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [isAuthenticated, router]);

    // Optionally, you can return a loading indicator while checking authentication
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
