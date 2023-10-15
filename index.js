const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employee');
const userRoutes = require('./routes/user');
const { validateUserData, validateEmployeeData } = require('./middleware');

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User-specific Middleware
app.use('/api/v1/user', validateUserData);

// Employee-specific Middleware
app.use('/api/v1/emp', validateEmployeeData);


// db connect
const dbUrl = 'mongodb+srv://enessertkan:Password123@cluster0.55mfjdg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the root URL!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
