
require('dotenv').config();





const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;


// ✅ Import Product Routes
const productRoutes = require("./routes/productRoutes");

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Use Routes
// API রুট ঠিকমতো দিতে হবে, যেন ফ্রন্টএন্ড থেকে fetch('/products') করলে কাজ করে
app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));


// ✅ Home route test
app.get("/", (req, res) => {
  res.send("🟢 EasyMart Backend is Running");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
