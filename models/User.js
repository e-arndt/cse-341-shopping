// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // For Google OAuth later (optional now)
    googleId: {
      type: String,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
    },

    firstName: {
      type: String,
      trim: true,
      maxlength: 60,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 60,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);
