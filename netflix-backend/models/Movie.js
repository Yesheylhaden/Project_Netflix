const mongoose = require('mongoose');

// Define the schema for a Movie document
const movieSchema = new mongoose.Schema({
  // Title is required
  title: {
    type: String,
    required: true
  },
  // Optional fields
  description: String,
  genre: String,
  releaseYear: Number
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Export the Movie model based on the schema
module.exports = mongoose.model('Movie', movieSchema);
