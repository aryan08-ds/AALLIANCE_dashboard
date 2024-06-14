const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  dimensions: { type: Number, required: true },
  size: { type: Number, required: true },
  color: { type: String, required: true },
  features: { type: String, required: true },
  materials: { type: String, required: true },
  images: [imageSchema],
  product_care: { type: String, required: true },
  category: { type: String, enum: ['Background', 'Accessories'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

productSchema.index({ name: 1, type_of_item: 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
