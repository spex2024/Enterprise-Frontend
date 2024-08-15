'use client'

import React, { useEffect } from 'react';
import useAgencyStore from "@/store/agency";
import { AccordionCard } from "@/components/page-ui/accordion";
import useAuthStore from "@/store/authenticate";
import {useRouter} from "next/navigation";
import {ScaleLoader} from "react-spinners";

const Page = () => {
    const { agencies, fetchAgencies } = useAgencyStore();
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

    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);

    return (
        <div className="w-[80%] px-5 mx-auto">
            {agencies.length > 0 ? (
                agencies.map((agency: { company: string; branch: string; users: []; imageUrl: string; }) => {
                    const { company, branch, users, imageUrl } = agency;
                    return (
                        <AccordionCard
                            key={company} // Ensure this is unique or use a more appropriate unique identifier
                            name={company}
                            location={branch}
                            user={users}
                            image={imageUrl}
                        />
                    );
                })
            ) : (
                <p>No agencies found.</p>
            )}
        </div>
    );
};

export default Page;
