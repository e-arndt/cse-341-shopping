// controllers/user.js
const User = require('../models/User.js');

// GET /users  -> get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find().lean();

    if (!users.length) {
      return res.status(204).send(); // No Content
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ message: 'Error fetching users' });
  }
}

// GET /users/:id  -> get single user
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by id:', err);
    return res.status(500).json({ message: 'Error fetching user' });
  }
}

// POST /users  -> create user
async function createUser(req, res) {
  try {
    const { email, firstName, lastName } = req.body;

    // basic manual validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = new User({
      email,
      firstName,
      lastName,
      // googleId will be set later with OAuth
    });

    const saved = await user.save();

    // 201 Created with the new user document
    return res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating user:', err);

    // duplicate key error (email unique)
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Email already exists',
        field: 'email',
      });
    }

    return res.status(500).json({ message: 'Error creating user' });
  }
}

// PUT /users/:id  -> update user
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { email, firstName, lastName },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating user:', err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Email already exists',
        field: 'email',
      });
    }

    return res.status(500).json({ message: 'Error updating user' });
  }
}

// DELETE /users/:id  -> delete user
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 204 No Content since resource is gone
    return res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ message: 'Error deleting user' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
