
'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import Dashboard from "@/components/page/dashboard";
import useAuthStore from "@/store/authenticate";

const App = () => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
       console.log(isAuthenticated)
    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login'); // Redirect to login page if not authenticated
        }
    }, [isAuthenticated, router]);

    // Optionally, you can return a loading indicator or nothing while checking authentication
    if (!isAuthenticated) {
        return <div>Loading...</div>; // or return null or a spinner
    }

    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default App;
