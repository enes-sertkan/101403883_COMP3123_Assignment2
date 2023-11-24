import React, { useState, useEffect } from 'react';
// Import your employeeService if you have methods to fetch employee details

function ViewEmployeePage({ match }) {
    const [employee, setEmployee] = useState({
        id: null,
        name: '',
        position: '',
        department: '',
        // Add other employee fields as needed
    });

    useEffect(() => {
        // Fetch the details of the employee from your API and set it to state
        // For now, we'll use dummy data for demonstration
        const dummyEmployee = {
            id: match.params.id, // The ID should be retrieved from the route parameter
            name: 'John Doe',
            position: 'Developer',
            department: 'IT'
            // Add more fields as per your application's need
        };
        setEmployee(dummyEmployee);
    }, [match.params.id]);

    return (
        <div className="view-employee-page">
            <h1>Employee Details</h1>
            <div>
                <strong>ID:</strong> {employee.id}
            </div>
            <div>
                <strong>Name:</strong> {employee.name}
            </div>
            <div>
                <strong>Position:</strong> {employee.position}
            </div>
            <div>
                <strong>Department:</strong> {employee.department}
            </div>
            {/* Display other employee details as needed */}
        </div>
    );
}

export default ViewEmployeePage;
