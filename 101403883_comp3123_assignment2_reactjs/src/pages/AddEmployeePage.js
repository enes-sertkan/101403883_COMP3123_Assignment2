import React, { useState } from 'react';
import employeeService from '../services/employeeService'; // Import the service

function AddEmployeePage() {
    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        department: '',
        // Add other employee fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addedEmployee = await employeeService.addEmployee(employee);
            console.log('Employee added:', addedEmployee);
            // Optionally reset the form or redirect the user
            setEmployee({
                name: '',
                position: '',
                department: '',
                // Reset other fields if necessary
            });
            // Redirect or update state in context if needed
        } catch (error) {
            console.error('There was an error adding the employee:', error);
            // Handle errors such as displaying a message to the user
        }
    };

    
    return (
        <div className="add-employee-page">
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={employee.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Add other input fields as needed */}
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployeePage;
