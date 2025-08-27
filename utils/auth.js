import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext);

// Helper function to set auth cookies
export const setAuthCookies = (token, userId, username) => {
    if (typeof document !== 'undefined') {
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`; // 24 hours
        document.cookie = `userId=${userId}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `username=${username}; path=/; max-age=86400; SameSite=Lax`;
    }
};

// Helper function to clear auth cookies
export const clearAuthCookies = () => {
    if (typeof document !== 'undefined') {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
};

export const register = async (userData) => {
    console.log("Register payload:", userData);
    const response = await axios.post("/api/auth/register", userData);
    return response;
};

export const login = async (userData) => {
    const response = await axios.post("/api/auth/login", userData);

    if (response.data.access_token) {
        const { access_token, user } = response.data;
        // Store in localStorage (client-side)
        localStorage.setItem("token", access_token);
        localStorage.setItem("userId", user.user_id);
        localStorage.setItem("username", user.username);
        
        // Set cookies (for server-side auth)
        setAuthCookies(access_token, user.user_id, user.username);
    }
    return response.data;
}

export const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    
    // Clear cookies
    clearAuthCookies();
    
    // Redirect to login page
    window.location.href = "/login";
}

// Check if user is authenticated (client-side)
export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false; // Server-side, rely on cookies/middleware
    }
    return !!localStorage.getItem('token');
};

// Get auth headers for API requests
export const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};
