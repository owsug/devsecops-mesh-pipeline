import React, { createContext, useState, useContext } from 'react';
import { loginUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (username, password) => {
        try {
            const response = await loginUser(username, password);
            if (response.ok) {
                const data = await response.json();
                setToken(data.access_token);
                localStorage.setItem('token', data.access_token);
                return true;
            }
        } catch (error) {
            console.error("Login failed", error);
        }
        return false;
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        token,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};