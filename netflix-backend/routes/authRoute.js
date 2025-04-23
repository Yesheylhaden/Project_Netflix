const express = require('express');
const router = express.Router(); // Create a new router instance
const { registerUser, loginUser } = require('../controllers/authController'); // Import the controller functions

// POST /api/v1/auth/register - Register a new user
router.post('/register', registerUser);

// POST /api/v1/auth/login - Login an existing user
router.post('/login', loginUser);

module.exports = router; // Export the router to be used in the main app
