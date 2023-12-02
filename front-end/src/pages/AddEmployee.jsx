import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    salary: "", 
    gender: "",
});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/v1/emp/employees', employee)
        .then(result => {
            if(result.data) {
                navigate('/dashboard');
            } else {
                alert(result.data.error);
            }
        })

};

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor ="inputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFirstName"
              placeholder="Enter First Name"
              onChange={(e) =>
                setEmployee({ ...employee, firstname: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor ="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLastName"
              placeholder="Enter Last Name"
              onChange={(e) =>
                setEmployee({ ...employee, lastname: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor ="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputGender" className="form-label">
              Gender
            </label>
            <select
              className="form-select rounded-0"
              id="inputGender"
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
              defaultValue="">
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;