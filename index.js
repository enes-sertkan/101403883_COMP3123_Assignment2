const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employee');
const studentRoutes = require('./routes/student');
// mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', { useNewUrlParser: true, useUnifiedTopology: true });


// Create an Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/emp/employees', employeeRoutes);
app.use('/api/v1/student/students', studentRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
