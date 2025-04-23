const Movie = require('../models/Movie');

// POST /api/v1/movies
const createMovie = async (req, res) => {
  try {
    const { title, description, genre, releaseYear } = req.body;

    const newMovie = new Movie({ title, description, genre, releaseYear });
    await newMovie.save();

    res.status(201).json({ message: 'Movie created', movie: newMovie });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/v1/movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/v1/movies/:id
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createMovie, getAllMovies, getMovieById };
