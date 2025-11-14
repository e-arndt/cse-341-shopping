// routes/users.js
const router = require('express').Router();
const validateId = require('../middleware/validateId');
const users = require('../controllers/user');

// GET /users
router.get('/', users.getAllUsers);

// GET /users/:id
router.get('/:id', validateId, users.getUserById);

// POST /users
router.post('/', users.createUser);

// PUT /users/:id
router.put('/:id', validateId, users.updateUser);

// DELETE /users/:id
router.delete('/:id', validateId, users.deleteUser);

module.exports = router;
