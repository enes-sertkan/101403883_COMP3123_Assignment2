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
    axios.get('http://localhost:5000/api/v1/emp/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data:', error);
      });
  };

  const handleDelete = (employeeId) => {
    axios.delete(`http://localhost:5000/api/v1/emp/employees?eid=${employeeId}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== employeeId));
      })
      .catch(error => {
        console.error('There was an error deleting the employee:', error);
      });
  };
  

  const handleLogout = () => {
    // Remove the token or user data from storage
    localStorage.removeItem('userToken'); // Adjust this according to your token storage method

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='dashboard-container'>
      <nav className='sidebar bg-dark text-white'>
        <div className='brand'>
          <h2>Hardbloods</h2>
        </div>
        <ul className='nav-list'>
          <li>
          <button className='nav-item btn btn-link text-white text-decoration-none'>
              <Link to='/dashboard' className='text-white text-decoration-none'>Dashboard</Link>
            </button>
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Gender Id</th>
              <th>Salary Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.gender}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/dashboard/edit_employee/${employee._id}`} className='btn btn-info'>Update</Link>
                  <button onClick={() => handleDelete(employee._id)} className='btn btn-danger'>Delete</button>
                  <Link to={`/employee/${employee._id}`} className='btn btn-secondary'>View</Link>
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