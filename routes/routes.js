// routes/routes.js
const router = require('express').Router();

const usersRouter = require('./users');
const productsRouter = require('./products');

// /users routes
router.use('/users', usersRouter);

// /products routes
router.use('/products', productsRouter);

module.exports = router;
