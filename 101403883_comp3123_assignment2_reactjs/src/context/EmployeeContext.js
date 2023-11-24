import React, { createContext, useState, useEffect } from 'react';
import employeeService from '../services/employeeService';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await employeeService.getAllEmployees();
                setEmployees(response);
            } catch (error) {
                console.error('Error fetching employees:', error);
                // Handle error appropriately
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const addEmployee = async (employeeData) => {
        try {
            // Make a request to your employee service to add a new employee
            const response = await employeeService.addEmployee(employeeData);

            // Update the employees state with the new employee
            setEmployees([...employees, response]);
        } catch (error) {
            console.error('Error adding employee:', error);
            // Handle error appropriately
        }
    };

    const updateEmployee = async (id, employeeData) => {
        try {
            // Make a request to your employee service to update the employee
            await employeeService.updateEmployee(id, employeeData);

            // Update the employees state with the updated employee data
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id === id ? { ...employee, ...employeeData } : employee
                )
            );
        } catch (error) {
            console.error('Error updating employee:', error);
            // Handle error appropriately
        }
    };

    const deleteEmployee = async (id) => {
        try {
            // Make a request to your employee service to delete the employee
            await employeeService.deleteEmployee(id);

            // Remove the deleted employee from the employees state
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.id !== id)
            );
        } catch (error) {
            console.error('Error deleting employee:', error);
            // Handle error appropriately
        }
    };

    return (
        <EmployeeContext.Provider
            value={{ employees, loading, addEmployee, updateEmployee, deleteEmployee }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};
