const express = require('express');
const router = express.Router();
const User = require('./user'); // Import the User model
const Employee = require('./employee'); // Import the Employee model
const bcrypt = require('bcrypt'); // Import the bcrypt library
const jwt = require('jsonwebtoken'); // Import JWT library

// Example route for creating a new user
router.post('/api/v1/user/signup', async (req, res) => {
    try {
        // Get data from the request body
        const { username, email, password } = req.body;

        // Validate data (e.g., check for required fields)
        if (!username || !email || !password) {
            const validationError = new Error('Invalid input data');
            validationError.statusCode = 400; // Bad Request
            throw validationError;
        }

        // Hash and encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Create a new User instance with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Use the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Return a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);

        // Handle database-specific error here, if needed
        // For example, if saving to the database fails
        if (error.name === 'MongoError') {
            const dbError = new Error('Database error');
            dbError.statusCode = 500; // Internal Server Error
            throw dbError;
        }

        // Return a generic error response if it's not a specific error
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
    }
});



// Example route for creating a new employee
router.post('/api/v1/emp/employees', (req, res) => {
    // Get data from the request body
    const { first_name, last_name, email, gender, salary } = req.body;

    // Create a new Employee instance
    const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        salary,
    });

    // Save the employee to the database
    newEmployee
        .save()
        .then((employee) => {
            console.log('Employee created:', employee);
            // Return a success response
            res.status(201).json({ message: 'Employee created successfully', employee });
        })
        .catch((error) => {
            console.error('Error creating employee:', error);
            // Return an error response
            res.status(500).json({ message: 'Internal Server Error' });
        });
});


// Example route for user signup
router.post('/api/v1/user/signup', async (req, res) => {
    try {
        // Get data from the request body
        const { username, email, password } = req.body;

        // Validate data (e.g., check for required fields)

        // Hash and encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User instance with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Return a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Example route for user login
router.post('/api/v1/user/login', async (req, res) => {
    try {
        // Get data from the request body
        const { username, password } = req.body;

        // Find the user by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        // If user not found or passwords don't match, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid Username and password' });
        }

        // If credentials are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'Enes0424!', { expiresIn: '1h' });

        // Return a success response with the token
        res.status(200).json({
            status: true,
            username: user.username,
            message: 'User logged in successfully',
            jwt_token: token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Example route for creating a new employee
router.post('/api/v1/emp/employees', async (req, res) => {
    try {
        // Get data from the request body
        const { first_name, last_name, email, gender, salary } = req.body;

        // Validate data (e.g., check for required fields)

        // Create a new Employee instance
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            gender,
            salary,
        });

        // Save the employee to the database
        await newEmployee.save();

        // Return a success response
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Example route for getting all employees
router.get('/api/v1/emp/employees', async (req, res) => {
    try {
        // Query the database to retrieve all employees
        const employees = await Employee.find();

        // Return a success response with the list of employees
        res.status(200).json({ employees });
    } catch (error) {
        console.error('Error getting employees:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Example route for getting an employee by ID
router.get('/api/v1/emp/employees/:eid', async (req, res) => {
    try {
        // Get the employee ID from the URL parameters
        const { eid } = req.params;

        // Validate the employee ID (you can add more validation if needed)

        // Query the database to retrieve the employee by ID
        const employee = await Employee.findById(eid);

        // If the employee is not found, return an error response
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Return a success response with the employee details
        res.status(200).json({ employee });
    } catch (error) {
        console.error('Error getting employee by ID:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Example route for updating an employee by ID
router.put('/api/v1/emp/employees/:eid', async (req, res) => {
    try {
        // Get the employee ID from the URL parameters
        const { eid } = req.params;

        // Validate the employee ID (you can add more validation if needed)

        // Get data from the request body
        const { first_name, last_name, email, gender, salary } = req.body;

        // Validate data (e.g., check for required fields)

        // Update the employee's details in the database
        const updatedEmployee = await Employee.findByIdAndUpdate(
            eid,
            { first_name, last_name, email, gender, salary },
            { new: true } // Return the updated employee data
        );

        // If the employee is not found, return an error response
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Return a success response with the updated employee details
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Example route for deleting an employee by ID
router.delete('/api/v1/emp/employees/:eid', async (req, res) => {
    try {
        // Get the employee ID from the URL parameters
        const { eid } = req.params;

        // Validate the employee ID (you can add more validation if needed)

        // Delete the employee from the database
        const deletedEmployee = await Employee.findByIdAndRemove(eid);

        // If the employee is not found, return an error response
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Return a success response
        res.status(204).send(); // No content, as per the specification
    } catch (error) {
        console.error('Error deleting employee:', error);
        // Return an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    // Check if it's a known error with a specific status code and message
    if (err.statusCode && err.message) {
        res.status(err.statusCode).json({ status: false, message: err.message });
    } else {
        // For unknown errors, return a generic error response
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});

// Other route handlers for your APIs...


module.exports = router;
