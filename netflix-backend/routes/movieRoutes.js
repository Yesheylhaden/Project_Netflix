// routes/movieRoutes.js
import express from 'express';
import { getAllMovies } from '../controllers/movieController.js';

const router = express.Router();

// Route: GET /api/movies
router.get('/', getAllMovies);

export default router;