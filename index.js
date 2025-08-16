const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Import Product & Auth Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require('./routes/authRoutes');

// ✅ Allowed Origins (Frontend URLs + Local Dev)
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'https://easymart-frontend-vd14.onrender.com',
  'https://easymartsbd.com',
  'https://www.easymartsbd.com'
];

// ✅ CORS Middleware
app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // Postman or local file access
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ✅ MongoDB Connection
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
