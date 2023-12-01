import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";


const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    // Replace with your actual API URL to fetch employees
    axios.get('http://localhost:3000/api/v1/user/dashboard')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data:', error);
      });
  };

  const handleDelete = (employeeId) => {
    // Replace with your actual API URL to delete an employee
    axios.delete(`http://localhost:3000/api/v1/user/dashboard/employees/${employeeId}`)
      .then(() => {
        // Remove deleted employee from state
        setEmployees(employees.filter(employee => employee.id !== employeeId));
      })
      .catch(error => {
        console.error('There was an error deleting the employee:', error);
      });
  };

  const handleLogout = () => {
    // Make an API call to logout the user
    axios.post('http://localhost:3000/api/v1/user/logout')
      .then(() => {
        // Clear user data from local storage or state management
        localStorage.removeItem('userToken'); // Example, adjust based on how you store the token

        // Redirect to login page
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };


  return (
    <div className='dashboard-container'>
      <nav className='sidebar bg-dark text-white'>
        <div className='brand'>
          <h2>My Company</h2>
        </div>
        <ul className='nav-list'>
          <li>
            <Link to='/dashboard' className='nav-item'>Dashboard</Link>
          </li>
          {/* Other navigation links */}
          <li>
            <button onClick={handleLogout} className='nav-item btn btn-link text-white text-decoration-none'>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      
      <div className='main-content'>
        <h1>Employee Management App</h1>
        <Link to='add_employee' className='btn btn-primary my-3'>Add Employee</Link> {/* Remove './' */}
        <table className='table'>
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <Link to={`/edit-employee/${employee.id}`} className='btn btn-info'>Update</Link>
                  <button onClick={() => handleDelete(employee.id)} className='btn btn-danger'>Delete</button>
                  <Link to={`/view-employee/${employee.id}`} className='btn btn-secondary'>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Outlet />
      </div>
    </div>
  );
};


export default Dashboard;