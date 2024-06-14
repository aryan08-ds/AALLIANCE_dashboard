const express = require('express');
const multer = require('multer');
const Product = require('../models/product.model');

const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRouter.post('/', upload.array('images'), async (req, res) => {
  try {
    const images = req.files.map((file) => ({
      url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    }));
    const product = new Product({ ...req.body, images });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productRouter.put('/:id', upload.array('images'), async (req, res) => {
  try {
    const images = req.files.map((file) => ({
      url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    }));
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productRouter.delete('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message:"Successfully Deleted the Product with given id"
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = productRouter;
