import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);  // Create a Context with a default value

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);  // State to hold the authenticated user

    // Provide the authUser state and setAuthUser function to all children components
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};