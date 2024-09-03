'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuthStore from "@/store/authenticate";

const useAuth = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useAuthStore();
    const router = useRouter();
    // const baseurl = "http://localhost:8080";
    // const baseurl = 'https://enterprise-backend.vercel.app';
    const baseurl = 'https://enterprise-backend-l6pn.onrender.com';


    const login = async (data) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/admin/login`, data, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
                setIsAuthenticated(true);
                router.push('/'); // or any protected route
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/admin/logout`, {}, { withCredentials: true });
            if (response.data.success) {
                setSuccess(response.data.message);
                setIsAuthenticated(false);
                router.push('/login'); // or any public route
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const addUser = async (user) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/register`, user);
            if (response.status === 200) {
                setSuccess(response.data.message);
                router.push('/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handlePackRequest = async ({ id, action }) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/approve`, { id, action });
            if (response.status === 200) {
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const resetRequest = async (user) => {
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/request`, user);
            if (response.status === 200) {
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const resetPassword = async (user, token) => {
        const data = { token, ...user };
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/user/reset`, data);
            if (response.status === 200) {
                router.push('/login');
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const resendVerification = async (data) => {
        try {
            const response = await axios.post(`${baseurl}/api/user/resend`, data);
            router.push('/login');
            setSuccess(response.data.message);
            if (response.status === 400) {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    const completeOrder = async (orderId) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/orders/complete`, { orderId }, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const cancelOrder = async (orderId) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/orders/cancel`, { orderId }, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    // New deleteUser function
    const deleteUser = async (userId) => {
        setError(null);
        try {
            const response = await axios.delete(`${baseurl}/api/user/employee/${userId}`, { withCredentials: true });
            if (response.status === 200) {
                setSuccess(response.data.message);
                // Optionally redirect or perform additional actions
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return {
        login,
        logout,
        addUser,
        resetRequest,
        resetPassword,
        resendVerification,
        handlePackRequest,
        completeOrder,
        cancelOrder,
        deleteUser, // Export the new function
        success,
        error,
    };
};

export default useAuth;
