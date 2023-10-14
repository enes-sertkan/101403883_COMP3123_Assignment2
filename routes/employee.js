const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// Route to create a new employee
router.post('/employees', async (req, res) => {
    try {

        const newEmployee = new Employee(req.body);
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
  
    } catch (error) {
        res.status(400).json({ error: 'Failed to create an employee.' });
    }
});

// Route to get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch employees.' });
    }
});

// Route to get an employee by ID
router.get('/employees/:eid', async (req, res) => {
    const { eid } = req.params;
    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch the employee.' });
    }
});

// Route to update an employee by ID
router.put('/employees/:eid', async (req, res) => {
    const { eid } = req.params;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update the employee.' });
    }
});

// Route to delete an employee by ID
router.delete('/employees/:eid', async (req, res) => {
    const { eid } = req.params;
    try {
        const deletedEmployee = await Employee.findByIdAndRemove(eid);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete the employee.' });
    }
});

module.exports = router;
