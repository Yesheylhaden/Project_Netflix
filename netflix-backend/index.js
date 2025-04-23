const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoute');
const movieRoutes = require('./routes/movieRoute');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movies', movieRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Netflix Clone API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
