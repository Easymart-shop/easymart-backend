const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');  // মডেল ইম্পোর্ট

// ✅ সব প্রোডাক্ট আনার API
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ নির্দিষ্ট আইডি দিয়ে প্রোডাক্ট আনার API
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ObjectId না হলে 400 error
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: '❌ Invalid product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: '❌ Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ নতুন প্রোডাক্ট যোগ করার API (POST)
router.post('/', async (req, res) => {
  try {
    const { name, price, oldPrice, description, image, extraImgs, stock, rating } = req.body;

    const newProduct = new Product({
      name,
      price,
      oldPrice,
      description,
      image,
      extraImgs,
      stock,
      rating
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
});

module.exports = router;
