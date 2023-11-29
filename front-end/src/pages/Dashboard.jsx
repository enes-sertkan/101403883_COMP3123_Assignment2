import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:5000/api/v1/user/dashboard')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  }


  return (
    <div className="dashboard-container">
      <nav className="sidebar bg-dark">
        <Link to="/dashboard" className="brand d-flex align-items-center text-white text-decoration-none">
          <span className="fs-5 fw-bolder">Employee Manager</span>
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/dashboard" className="nav-item">
              <i className="bi-speedometer2"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="api/v1/user/dashboard/employee" className="nav-item">
              <i className="bi-people"></i>
              <span>Manage Employees</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <a className="nav-item">
              <i className="bi-power"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="content-area">
        <div className="top-bar">
          <h4>Employee Management System</h4>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;