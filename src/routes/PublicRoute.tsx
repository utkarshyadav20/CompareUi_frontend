import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import loader from '../assets/Loader.gif';

export const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div><img src={loader} alt="loader" /></div>;
    }

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
