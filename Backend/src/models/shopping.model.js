const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true, default: 'India' }
});

const shippingInformationSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  address: { type: shippingAddressSchema, required: true },
  phone_number: { type: String, required: true },
  method: { type: String, enum: ['Home Delivery', 'Local Pickup'], required: true },
  additional_info: { type: String },
  gst_percentage: { type: Number, required: true },
  gst_number: { type: String },
  company_name: { type: String },
  delivery_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const ShippingInformation = mongoose.model('ShippingInformation', shippingInformationSchema);
module.exports = ShippingInformation;
