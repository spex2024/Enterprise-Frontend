'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const MealContext = createContext();
const baseurl = 'https://enterprise-backend.vercel.app';

export const MealProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/vendor/meals`);
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchMeals();
    }, []);

    return (
        <MealContext.Provider value={{ meals }}>
            {children}
        </MealContext.Provider>
    );
};

export const useMeals = () => useContext(MealContext);
