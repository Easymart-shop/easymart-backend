const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// ✅ Import Product Routes
const productRoutes = require("./routes/productRoutes");

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Use Routes
// API রুট ঠিকমতো দিতে হবে, যেন ফ্রন্টএন্ড থেকে fetch('/products') করলে কাজ করে
app.use("/api/products", productRoutes);

// ✅ MongoDB Connect
mongoose
  .connect("mongodb://127.0.0.1:27017/easymart")
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
