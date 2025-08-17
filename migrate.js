const mongoose = require("mongoose");

// 🔗 MongoDB URL (নিজের .env থেকে নিন)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/easymart";

// পুরোনো products schema
const oldProductSchema = new mongoose.Schema({}, { strict: false });
const OldProduct = mongoose.model("Product", oldProductSchema, "products");

// নতুন products schema
const newProductSchema = new mongoose.Schema({
  _id: String, // এখানে আমরা string id রাখব
  name: String,
  price: Number,
  oldPrice: Number,
  description: String,
  image: String,
  extraImgs: [String],
  stock: Number,
  rating: Number,
});
const NewProduct = mongoose.model("ProductNew", newProductSchema, "products_new");

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // সব পুরোনো product আনো
    const oldProducts = await OldProduct.find({});
    console.log(`📦 Found ${oldProducts.length} products`);

    for (let prod of oldProducts) {
      // ObjectId কে string এ রূপান্তর
      const newProd = {
        ...prod.toObject(),
        _id: prod._id.toString(),
      };

      // নতুন collection এ save
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
