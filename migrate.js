require("dotenv").config();

const mongoose = require("mongoose");
require("dotenv").config(); // 👈 .env লোড করবে

// 🔗 MongoDB URL (.env থেকে আসবে)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/easymart";

// পুরোনো products schema (flexible)
const oldProductSchema = new mongoose.Schema({}, { strict: false });
const OldProduct = mongoose.model("OldProduct", oldProductSchema, "products");

// নতুন products schema
const newProductSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  oldPrice: Number,
  description: String,
  image: String,
  extraImgs: [String],
  stock: Number,
  rating: Number,
});
const NewProduct = mongoose.model("NewProduct", newProductSchema, "products_new");

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // সব পুরোনো প্রোডাক্ট আনো
    const oldProducts = await OldProduct.find({});
    console.log(`📦 Found ${oldProducts.length} products`);

    for (let prod of oldProducts) {
      const newProd = {
        _id: prod._id.toString(), // ObjectId → String
        name: prod.name,
        price: prod.price,
        oldPrice: prod.oldPrice,
        description: prod.description,
        image: prod.image,
        extraImgs: prod.extraImgs || [],
        stock: prod.stock || 0,
        rating: prod.rating || 0,
      };

      await NewProduct.findByIdAndUpdate(newProd._id, newProd, { upsert: true });
      console.log(`➡️ Migrated: ${newProd._id} (${newProd.name})`);
    }

    console.log("🎉 Migration completed! Data saved in 'products_new' collection.");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

migrate();
