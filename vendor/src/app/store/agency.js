// contexts/UserContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseurl = 'http://localhost:8080';



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/enterprise/agencies`, {withCredentials: true});
                setUser(response.data);
            } catch (error) {

                setError(error.response ? error.response.data.message : 'An error occurred');
            }
        };

        fetchUser();
    }, []);

    console.log(user);

    return (
        <UserContext.Provider value={{ user,  error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
