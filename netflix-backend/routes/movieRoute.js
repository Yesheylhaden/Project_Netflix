const express = require('express');
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById
} = require('../controllers/movieController');

// POST /api/v1/movies
router.post('/', createMovie);

// GET /api/v1/movies
router.get('/', getAllMovies);

// GET /api/v1/movies/:id
router.get('/:id', getMovieById);

module.exports = router;
