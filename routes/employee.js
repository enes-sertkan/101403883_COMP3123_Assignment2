const express = require('express');
const router = express.Router();
const Employee = require('../routes/employee'); // Assuming you have an Employee model

// POST /api/v1/emp/employees
router.post('/', async (req, res) => {
    try {
        // Create a new employee using the request body
        const newEmployee = new Employee(req.body);
        await newEmployee.save();

        // Return a response with a 201 status code on success
        res.status(201).json(newEmployee);
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/v1/emp/employees
router.get('/', async (req, res) => {
    try {
        // Fetch all employees from the MongoDB collection
        const employees = await Employee.find();

        // Return the list as a JSON response with a 200 status code
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/v1/emp/employees/{eid}
router.get('/:eid', async (req, res) => {
    try {
        const employeeId = req.params.eid;

        // Fetch a specific employee by employee ID from the MongoDB collection
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            // If employee is not found, return a 404 response
            res.status(404).json({ error: 'Employee not found' });
        } else {
            // Return the employee data as a JSON response with a 200 status code if found
            res.status(200).json(employee);
        }
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/v1/emp/employees/{eid}
router.put('/:eid', async (req, res) => {
    try {
        const employeeId = req.params.eid;

        // Update the employee data based on the request body
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });

        if (!updatedEmployee) {
            // If employee is not found, return a 404 response
            res.status(404).json({ error: 'Employee not found' });
        } else {
            // Return a response with a 200 status code on success
            res.status(200).json(updatedEmployee);
        }
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/v1/emp/employees?eid=xxx
router.delete('/', async (req, res) => {
    try {
        const employeeId = req.query.eid;

        // Delete a specific employee by employee ID from the MongoDB collection
        await Employee.findByIdAndRemove(employeeId);

        // Return a response with a 204 status code on success
        res.status(204).send();
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
