'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const baseurl = 'https://enterprise-backend-l6pn.onrender.com';
    // const baseurl = 'http://localhost:8080';


    const login = async (data) => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/enterprise/login`, data, { withCredentials: true });
            if (response.status===200) {
                setSuccess(response.data.message);
                router.push('https://enterprise-interface-taupe.vercel.app/vendors'); // or any protected route
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/enterprise/logout`, {}, { withCredentials: true });
            if (response.data.success) {
                setSuccess(response.data.message);
                router.push('/login'); // or any public route
            }
            setSuccess(response.data.message);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const createAgency = async (data) => {
        setError(null);
        console.log(data)
        try {
            const response = await axios.post(`${baseurl}/api/enterprise/register`, data);
            console.log(response.data)
            if (response.status===200) {
                setSuccess(response.data.message);
                router.push('/login');

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
            const response = await axios.post(`${baseurl}/api/enterprise/request`, user);
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
        const data = {token ,...user}
        setError(null);
        try {
            const response = await axios.post(`${baseurl}/api/enterprise/reset`, data);
            console.log(response.status);
            if (response.status === 200) {
                router.push('/sign-in')
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
            const response = await axios.post(`${baseurl}/api/enterprise/resend`, data);
            console.log(response);
            router.push('/sign-in')
            setSuccess(response.data.message)
            if (response.status===400){
                setError(response.data.message);
            }

        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    }

    return {
        login,
        logout,
        createAgency,
        resetRequest,
        resetPassword,
        resendVerification,
        success,
        error,
    };
};

export default useAuth;
