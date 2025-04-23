const Movie = require('../models/Movie'); // Import the Movie model

// POST /api/v1/movies - Create a new movie
const createMovie = async (req, res) => {
  try {
    // Destructure movie data from request body
    const { title, description, genre, releaseYear } = req.body;

    // Create a new movie instance
    const newMovie = new Movie({ title, description, genre, releaseYear });

    // Save the movie to the database
    await newMovie.save();

    // Respond with success and the created movie
    res.status(201).json({ message: 'Movie created', movie: newMovie });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/v1/movies - Retrieve all movies
const getAllMovies = async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find();

    // Respond with the list of movies
    res.status(200).json(movies);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/v1/movies/:id - Retrieve a single movie by ID
const getMovieById = async (req, res) => {
  try {
    // Look for the movie by ID in request parameters
    const movie = await Movie.findById(req.params.id);

    // Return 404 if movie not found
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // Respond with the movie details
    res.status(200).json(movie);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createMovie, getAllMovies, getMovieById }; // Export controller functions
