const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ Allowed Origins (Frontend URLs + Local Dev)
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
  "http://localhost:5500",
  "https://easymart-frontend-vd14.onrender.com", // Render hosted frontend
  "https://easymartsbd.com",
  "https://www.easymartsbd.com",
  "https://api.easymartsbd.com" // 🔥 api subdomain added
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Body Parser
app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running 🚀" });
});

// ✅ Root Test
app.get("/", (req, res) => {
  res.send("🟢 EasyMart Backend is Running");
});

// ✅ Error Handler (must be last)
app.use((err, req, res, next) => {
  console.error("🔥 Backend Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
