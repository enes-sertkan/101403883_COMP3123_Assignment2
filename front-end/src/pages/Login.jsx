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
            const response = await axios.post('http://localhost:5000/api/v1/user/login', values);
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
        <div className="loginPage">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            
                {error && <p>{error}</p>}

                <div className="signup-link">
                    <p>Not registered yet? <Link to="/signup">Sign up here</Link></p>
                </div>
            </form>
        </div>
    );
};


export default Login