'use client'
import React from 'react';
import Vendors from "@/components/page/vendors";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";

const Vendor = () => {
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
            <Vendors/>
        </div>
    );
};

export default Vendor;