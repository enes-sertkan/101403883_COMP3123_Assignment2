const API_URL = "http://localhost:3000/api"; // Ensure this is the correct base URL for your API

const handleResponse = async (response) => {
    if (!response.ok) {
        // Attempt to extract the error message from the response, default to a generic message if unsuccessful
        const errorData = await response.text().then(text => text ? JSON.parse(text) : {});
        throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json(); // Parse JSON only if response is ok
};

const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await handleResponse(response);
        // Store the authentication token here, if applicable
        localStorage.setItem('userToken', data.token); // Adjust this line based on how your API sends the token

        return data; // This data should include the user details and token
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Rethrow the error so it can be caught and handled by the component that called this function
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

        return await handleResponse(response);
        // No need to store a token here if your API doesn't authenticate the user right after signup
    } catch (error) {
        console.error('Error during signup:', error);
        throw error; // Rethrow the error so it can be caught and handled by the component that called this function
    }
};

// Add other authentication related methods if necessary

export default {
    login,
    signup
};
