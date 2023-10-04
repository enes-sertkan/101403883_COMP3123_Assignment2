const express = require('express');
const router = express.Router();
const { validateStudentData, /* Other middleware/functions */ } = require('../middleware'); // You can create a middleware file for data validation.
const Student = require('../routes/student'); // Assuming you have a Student model

// POST /api/v1/student/students
router.post('/', validateStudentData, async (req, res) => {
    try {
        // Create a new student using req.body and save it to the MongoDB collection
        const newStudent = new Student(req.body);
        await newStudent.save();

        // Return a response with a 201 status code on success
        res.status(201).json(newStudent);
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/v1/student/students
router.get('/', async (req, res) => {
    try {
        // Fetch all students from the MongoDB collection
        const students = await Student.find();

        // Return the list as a JSON response with a 200 status code
        res.status(200).json(students);
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/v1/student/students/{sid}
router.get('/:sid', async (req, res) => {
    try {
        const studentId = req.params.sid;

        // Fetch a specific student by student ID from the MongoDB collection
        const student = await Student.findById(studentId);

        if (!student) {
            // If student is not found, return a 404 response
            res.status(404).json({ error: 'Student not found' });
        } else {
            // Return the student data as a JSON response with a 200 status code if found
            res.status(200).json(student);
        }
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/v1/student/students/{sid}
router.put('/:sid', validateStudentData, async (req, res) => {
    try {
        const studentId = req.params.sid;

        // Update the student data based on the request body
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });

        if (!updatedStudent) {
            // If student is not found, return a 404 response
            res.status(404).json({ error: 'Student not found' });
        } else {
            // Return a response with a 200 status code on success
            res.status(200).json(updatedStudent);
        }
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/v1/student/students/{sid}
router.delete('/:sid', async (req, res) => {
    try {
        const studentId = req.params.sid;

        // Delete a specific student by student ID from the MongoDB collection
        await Student.findByIdAndRemove(studentId);

        // Return a response with a 204 status code on success
        res.status(204).send();
    } catch (error) {
        // Handle any errors and return an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
