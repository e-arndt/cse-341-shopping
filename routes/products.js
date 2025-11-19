// routes/products.js
const router = require('express').Router();
const validateId = require('../middleware/validateId');
const products = require('../controllers/products');
const { requireAuth } = require('../middleware/auth');

// GET /products (public)
router.get('/', products.getAllProducts);

// GET /products/:id (public)
router.get('/:id', validateId, products.getProductById);

// POST /products (protected)
router.post(
  '/',
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  products.createProduct
);

// PUT /products/:id (protected)
router.put(
  '/:id',
  validateId,
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  products.updateProduct
);

// DELETE /products/:id (protected)
router.delete(
  '/:id',
  validateId,
  requireAuth,
  /* #swagger.security = [{ "BearerAuth": [] }] */
  products.deleteProduct
);

module.exports = router;
