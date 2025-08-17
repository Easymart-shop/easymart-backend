const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // 🔑 Custom string id
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    description: { type: String },
    image: { type: String },
    extraImgs: [String],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { _id: false }
);

// 🔥 Force it to use "products_new" collection
module.exports = mongoose.model("Product", productSchema, "products_new");
