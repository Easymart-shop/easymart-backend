const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  oldPrice: Number,
  description: String,
  image: String,
  extraImgs: [String],
  stock: Number,
  rating: Number
});

module.exports = mongoose.model("Product", productSchema);
