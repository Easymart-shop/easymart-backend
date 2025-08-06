const express = require('express');
const router = express.Router();
const Product = require('../models/product');  // মডেল ইম্পোর্ট

// সব প্রোডাক্ট আনার API
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// নির্দিষ্ট আইডি দিয়ে প্রোডাক্ট আনার API (optional)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
