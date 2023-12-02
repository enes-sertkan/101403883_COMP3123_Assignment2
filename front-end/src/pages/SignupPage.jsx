import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link here
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";


const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError(''); // Reset error message

        try {
            // Ensure the URL points to the correct backend endpoint
            const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
                username, 
                email, 
                password
            });

            console.log('Registration successful', response.data);
            // Redirect or other actions after successful registration
        } catch (error) {
            // Error handling
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(error.response.data.message || 'An error occurred during registration');
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="string"
                        id="string"
                        name="string"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                <div className="login-link">
                    <p>Already have an account? <Link to="/">Login here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;