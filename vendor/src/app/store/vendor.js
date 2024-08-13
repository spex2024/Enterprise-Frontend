'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
    const [vendor, setVendor] = useState([]);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/vendor/vendor',{withCredentials: true});
                setVendor(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchVendor();
    }, []);


    return (
        <VendorContext.Provider value={{ vendor }}>
            {children}
        </VendorContext.Provider>
    );
};

export const useVendor = () => useContext(VendorContext);
