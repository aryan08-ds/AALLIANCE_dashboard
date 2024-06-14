const express = require('express');
const ShippingInformation = require('../models/shopping.model');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const shippingInfo = new ShippingInformation(req.body);
    await shippingInfo.save();
    res.status(201).json(shippingInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const shippingInfos = await ShippingInformation.find();
    res.json(shippingInfos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const shippingInfo = await ShippingInformation.findById(req.params.id);
    res.json(shippingInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedShippingInfo = await ShippingInformation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShippingInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ShippingInformation.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
