const mongoose = require('mongoose');

// Define the schema for a User document
const userSchema = new mongoose.Schema({
  // Username is required and whitespace will be trimmed
  username: {
    type: String,
    required: true,
    trim: true
  },
  // Email is required, must be unique, and stored in lowercase
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  // Password is required (assumed to be hashed before saving)
  password: {
    type: String,
    required: true
  }
}, {
  // Automatically include createdAt and updatedAt fields
  timestamps: true
});

// Export the User model based on the schema
module.exports = mongoose.model('User', userSchema);
