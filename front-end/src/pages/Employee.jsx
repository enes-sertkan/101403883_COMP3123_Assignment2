import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_BASE_URL = 'http://localhost:5000/api/v1/emp/'; // Adjust this URL based on your server setup

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all employees
  useEffect(() => {
    axios.get(`${API_BASE_URL}employees`)
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  // Delete an employee
  const deleteEmployee = (employeeId) => {
    axios.delete(`${API_BASE_URL}employees?eid=${employeeId}`)
      .then(response => {
        // Refresh the employee list or update the state directly
        setEmployees(employees.filter(e => e.id !== employeeId));
      })
      .catch(error => console.error('Error deleting employee:', error));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`${API_BASE_URL}Images/${e.image}`}
                    className="employee_image"
                    alt={e.name}
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => deleteEmployee(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
