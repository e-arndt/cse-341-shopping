// routes/products.js
const router = require('express').Router();
const validateId = require('../middleware/validateId');
const products = require('../controllers/products');

// GET /products
router.get('/', products.getAllProducts);

// GET /products/:id
router.get('/:id', validateId, products.getProductById);

// POST /products
router.post('/', products.createProduct);

// PUT /products/:id
router.put('/:id', validateId, products.updateProduct);

// DELETE /products/:id
router.delete('/:id', validateId, products.deleteProduct);

module.exports = router;
