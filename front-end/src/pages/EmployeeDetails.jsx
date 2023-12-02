import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const API_URL = 'http://localhost:5000/api/v1/emp/';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null); // null initially
  const { id } = useParams(); // Assuming 'id' is the URL parameter
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}employees/${id}`) // Corrected URL
      .then(result => {
        setEmployee(result.data);
      })
      .catch(err => console.log(err));
  }, [id]); // Added 'id' as a dependency

  const handleLogout = () => {
    // Remove the token or user data from storage
    localStorage.removeItem('userToken'); // Adjust this according to your token storage method

    // Redirect to the login page
    navigate('/');
  };
  // Check if employee data is loaded
  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-details-container">
      <div className="employee-details-heading">
        <h4>Employee Management System</h4>
      </div>
      <div className='employee-details'>
        <h3>First Name: {employee.firstname}</h3>
        <h3>Last Name: {employee.lastname}</h3>
        <h3>Email: {employee.email}</h3>
        <h3>Gender: {employee.gender}</h3>
        <h3>Salary: ${employee.salary}</h3>
      </div>
      <div className='employee-actions'>
        <Link to={`/dashboard`} className='btn btn-info'>Dashboard</Link>
        <Link to={`/dashboard/edit_employee/${employee._id}`} className='btn btn-info'>Update</Link>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
  
};

export default EmployeeDetail;