// routes/users.js
const router = require('express').Router();
const validateId = require('../middleware/validateId');
const users = require('../controllers/user');
const { requireAuth } = require('../middleware/auth');

// GET /users (protected)
router.get(
  '/',
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  users.getAllUsers
);

// GET /users/:id (protected)
router.get(
  '/:id',
  validateId,
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  users.getUserById
);

// POST /users (protected)
router.post(
  '/',
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  users.createUser
);

// PUT /users/:id (protected)
router.put(
  '/:id',
  validateId,
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  users.updateUser
);

// DELETE /users/:id (protected)
router.delete(
  '/:id',
  validateId,
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  users.deleteUser
);

module.exports = router;
