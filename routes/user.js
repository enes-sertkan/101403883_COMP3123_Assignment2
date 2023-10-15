const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Import the User model

// Route to create a new user
router.post('/signup', async (req, res) => {
    try {
        console.log("Hello")
        const newUser = new User(req.body);
        await newUser.save();
        console.log(newUser)
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create a new user.' });
    }
});

// Route to get all user
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const users = await User.findOne({ username });
        if (password !== users.password) {
            return res.status(400).json({ error: 'Password does not match' });
        }
        res.status(200).json({ status: true, username: users.username, message: "User logged in successfully" });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch user.' });
    }
});


module.exports = router;
