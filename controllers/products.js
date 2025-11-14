// controllers/products.js
const Product = require('../models/Product');

// GET /products  -> get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find().lean();

    if (!products.length) {
      return res.status(204).send();
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ message: 'Error fetching products' });
  }
}

// GET /products/:id  -> get single product
async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by id:', err);
    return res.status(500).json({ message: 'Error fetching product' });
  }
}

// POST /products  -> create product
async function createProduct(req, res) {
  try {
    const {
      name,
      sku,
      description,
      category,
      brand,
      price,
      quantityInStock,
      countryOfOrigin,
      color,
      weight,
      size,
    } = req.body;

    // simple required field check (on top of schema validation)
    if (!name || !sku || !description || !category || !brand || price == null || quantityInStock == null) {
      return res.status(400).json({
        message:
          'name, sku, description, category, brand, price, and quantityInStock are required',
      });
    }

    const product = new Product({
      name,
      sku,
      description,
      category,
      brand,
      price,
      quantityInStock,
      countryOfOrigin,
      color,
      weight,
      size,
    });

    const saved = await product.save();

    return res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating product:', err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'SKU already exists',
        field: 'sku',
      });
    }

    return res.status(500).json({ message: 'Error creating product' });
  }
}

// PUT /products/:id  -> update product
async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      sku,
      description,
      category,
      brand,
      price,
      quantityInStock,
      countryOfOrigin,
      color,
      weight,
      size,
    } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        sku,
        description,
        category,
        brand,
        price,
        quantityInStock,
        countryOfOrigin,
        color,
        weight,
        size,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating product:', err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'SKU already exists',
        field: 'sku',
      });
    }

    return res.status(500).json({ message: 'Error updating product' });
  }
}

// DELETE /products/:id  -> delete product
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ message: 'Error deleting product' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
