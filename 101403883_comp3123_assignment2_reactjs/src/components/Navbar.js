// Inside your Navbar.js file

import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/add-employee">Add Employee</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            {/* Add other links as necessary */}
        </nav>
    );
}

export default Navbar;
