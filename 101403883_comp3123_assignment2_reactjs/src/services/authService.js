const API_URL = "http://localhost:3000/api";

const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Handle storing the authentication token here, if applicable
        // For example, localStorage.setItem('userToken', data.token);

        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const signup = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

// Add other authentication related methods if necessary

export default {
    login,
    signup
};
