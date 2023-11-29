import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/add-employee" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        Add Employee
                    </NavLink>
                </li>
                {/* Add more navigation items as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;
