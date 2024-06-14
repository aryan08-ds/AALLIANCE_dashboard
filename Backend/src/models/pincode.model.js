const mongoose = require('mongoose');

const pincodeDiscountSchema = new mongoose.Schema({
  pincode: { type: String, required: true },
  discount: { type: Number, required: true },
  hub: { type: String, required: true },
  hub_address: { type: String, required: true }
});

const PincodeDiscount = mongoose.model('PincodeDiscount', pincodeDiscountSchema);
module.exports=PincodeDiscount;
