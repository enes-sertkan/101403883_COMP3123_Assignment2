// db.js

const mongoose = require('mongoose');

// MongoDB connection URL (replace with your actual MongoDB URL)
const dbUrl = 'mongodb://http://localhost:27017/comp3095-mongodb'; // Replace with your MongoDB URL

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;

