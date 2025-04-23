const express = require('express');
const dotenv = require('dotenv'); // For loading environment variables from .env
const cors = require('cors'); // For enabling Cross-Origin Resource Sharing

// Load environment variables from the .env file
dotenv.config();

const app = express(); // Create an instance of Express

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes (allows requests from different origins)

// Routes
const authRoutes = require('./routes/authRoute'); // Import authentication routes
const movieRoutes = require('./routes/movieRoute'); // Import movie routes

// Mount routes at the appropriate path
app.use('/api/v1/auth', authRoutes); // Auth routes at /api/v1/auth
app.use('/api/v1/movies', movieRoutes); // Movie routes at /api/v1/movies

// Root route - Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Netflix Clone API');
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000; // Default to port 5000 if not specified in .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Log confirmation when server is running
