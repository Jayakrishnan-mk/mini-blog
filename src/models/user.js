const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,    // removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,  // no two users can have same email
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // createdAt, updatedAt automatically handled

// Create User Model (Ensure 'User' model is being exported correctly)
const User = mongoose.model('User', userSchema);

module.exports = User;
