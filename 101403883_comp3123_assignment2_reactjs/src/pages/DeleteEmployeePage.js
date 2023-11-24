import React, { useState, useEffect } from 'react';
// Import your employeeService if you have methods to fetch and delete employees

function DeleteEmployeePage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch the list of employees from your API and set it to state
        // For now, we'll use a static list for demonstration
        setEmployees([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
            // Add more dummy employees or fetch from your API
        ]);
    }, []);

    const handleDelete = (employeeId) => {
        // Here you would call your API to delete the employee
        console.log(`Delete employee with ID: ${employeeId}`);
        // Optionally, filter out the deleted employee from the employees state
        setEmployees(employees.filter(employee => employee.id !== employeeId));
    };

    return (
        <div className="delete-employee-page">
            <h1>Delete Employee</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name}
                        <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeleteEmployeePage;
