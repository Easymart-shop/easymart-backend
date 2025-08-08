const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Import Product Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth");

// ✅ Middleware (CORS আগে বসান)
app.use(cors({
  origin: 'https://easymart-frontend-vd14.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Use Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Home route test
app.get("/", (req, res) => {
  res.send("🟢 EasyMart Backend is Running");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
