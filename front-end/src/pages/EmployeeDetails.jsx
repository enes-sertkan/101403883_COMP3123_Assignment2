import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    axios.get(`${API_URL}logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  // Check if employee data is loaded
  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`${API_URL}Images/${employee.image}`} className='emp_det_image' alt={employee.name}/>
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className='btn btn-primary me-2'>Edit</button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;