// routes/users.js
const router = require('express').Router();
const validateId = require('../middleware/validateId');
const users = require('../controllers/user');
const { requireAuth } = require('../middleware/auth');

// GET /users (protected)
router.get('/', requireAuth, users.getAllUsers);

// GET /users/:id (protected)
router.get('/:id', validateId, requireAuth, users.getUserById);

// POST /users (protected)
router.post('/', requireAuth, users.createUser);

// PUT /users/:id (protected)
router.put('/:id', validateId, requireAuth, users.updateUser);

// DELETE /users/:id (protected)
router.delete('/:id', validateId, requireAuth, users.deleteUser);

module.exports = router;

