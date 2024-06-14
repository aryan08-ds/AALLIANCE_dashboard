const express = require('express');
const Pincode = require('../models/pincode.model');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const pincode = new Pincode(req.body);
    await pincode.save();
    res.status(201).json(pincode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const pincodes = await Pincode.find();
    res.json(pincodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pincode = await Pincode.findById(req.params.id);
    res.json(pincode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPincode = await Pincode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPincode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Pincode.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
