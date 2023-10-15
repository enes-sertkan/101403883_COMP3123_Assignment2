// Middleware function to validate employee data
const validateEmployeeData = (req, res, next) => {
    const { first_name, last_name, email, gender, salary } = req.body;

    if (!first_name || !last_name || !email || !gender || !salary) {
        return res.status(400).json({ error: 'Incomplete employee data' });
    }
    next();
};

// Middleware function to validate user data
const validateUserData = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Incomplete user data' });
    }

    next();
};

module.exports = {
    validateEmployeeData,
    validateUserData
};