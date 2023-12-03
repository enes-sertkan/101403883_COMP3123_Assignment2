import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
    const [values, setValues] = useState({
        username: '', // Changed from email to username
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://employee-management-app-sepia.vercel.app/api/v1/user/login', values);
            if (response.data.status) {
                localStorage.setItem("valid", true);
                navigate('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div className="signup-link">
                    <p>Not registered yet? <Link to="/signup">Sign up here</Link></p>
                </div>
            </form>
        </div>
    );
    
    
};


export default Login