// middleware.js

// Import any necessary libraries or modules for validation
// For example, you might want to use 'express-validator' for validation.

// Middleware function to validate student data
const validateStudentData = (req, res, next) => {
    const { first_name, last_name, email, gender, salary } = req.body;

    // Example: Perform validation checks
    if (!first_name || !last_name || !email || !gender || !salary) {
        return res.status(400).json({ error: 'Incomplete student data' });
    }

    // You can add more specific validation logic as needed.

    // If validation passes, call 'next()' to pass control to the next middleware or route handler
    next();
};

// Export the middleware function
module.exports = {
    validateStudentData,
    // You can export other middleware functions here if needed
};
