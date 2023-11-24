import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage for a token)
        // and update currentUser and isLoggedIn states accordingly
        // This is just a placeholder logic
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setCurrentUser({ username: 'exampleUser' }); // Replace with actual user data
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData) => {
        // Implement login logic here
        // For example, save user token to localStorage and update state
        localStorage.setItem('userToken', 'exampleToken'); // Replace with actual token
        setCurrentUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Implement logout logic
        localStorage.removeItem('userToken');
        setCurrentUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
