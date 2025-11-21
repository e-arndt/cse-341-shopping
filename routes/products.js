// routes/products.js
const router = require('express').Router();
const validateId = require('../middleware/validateId');
const products = require('../controllers/products');
const { requireAuth } = require('../middleware/auth');

// GET /products (public)
router.get(
  '/',
  /* 
    #swagger.tags = ['Products']
    #swagger.description = 'Get all products.'
  */
  products.getAllProducts
);

// GET /products/:id (public)
router.get(
  '/:id',
  validateId,
  /* 
    #swagger.tags = ['Products']
    #swagger.description = 'Get a single product by ID.'
  */
  products.getProductById
);

// POST /products (protected)
router.post(
  '/',
  requireAuth,
  /* 
    #swagger.tags = ['Products']
    #swagger.description = 'Create a new product (protected).'
    #swagger.security = [{ "BearerAuth": [] }]
  */
  products.createProduct
);

// PUT /products/:id (protected)
router.put(
  '/:id',
  validateId,
  requireAuth,
  /* 
    #swagger.tags = ['Products']
    #swagger.description = 'Update an existing product by ID (protected).'
    #swagger.security = [{ "BearerAuth": [] }]
  */
  products.updateProduct
);

// DELETE /products/:id (protected)
router.delete(
  '/:id',
  validateId,
  requireAuth,
  /* 
    #swagger.tags = ['Products']
    #swagger.description = 'Delete a product by ID (protected).'
    #swagger.security = [{ "BearerAuth": [] }]
  */
  products.deleteProduct
);

module.exports = router;
