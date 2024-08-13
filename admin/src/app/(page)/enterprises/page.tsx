'use client'
import React, { useEffect } from 'react';
import useAgencyStore from "@/store/agency";
import AgencyTable from "@/components/page-ui/agencies-table";

const Enterprise = () => {
    const { agencies, fetchAgencies } = useAgencyStore();

    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);

    return (
        <div className="w-[90%] px-5 mx-auto">
            {agencies.length > 0 ? (
                <AgencyTable agencies={agencies}   />
            ) : (
                <p>No vendors found.</p>
            )}
        </div>
    );
};

export default Enterprise;
