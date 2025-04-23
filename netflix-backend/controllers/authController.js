const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token-based authentication

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Look for the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the input password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Sign a JWT token with the user's ID as payload, valid for 1 hour
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(200).json({ token });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { registerUser, loginUser }; // Export controller functions
