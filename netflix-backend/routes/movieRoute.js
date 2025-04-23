const express = require('express');
const router = express.Router(); // Create a new router instance
const {
  createMovie,
  getAllMovies,
  getMovieById
} = require('../controllers/movieController'); // Import controller functions

// POST /api/v1/movies - Create a new movie
router.post('/', createMovie);

// GET /api/v1/movies - Retrieve all movies
router.get('/', getAllMovies);

// GET /api/v1/movies/:id - Retrieve a single movie by its ID
router.get('/:id', getMovieById);

module.exports = router; // Export the router to be used in the main app
