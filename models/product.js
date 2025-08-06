const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  description: { type: String },
  image: { type: String },
  extraImgs: [String],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
