const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },          // Forgot password token
  resetPasswordExpires: { type: Date },          // Token expiry time
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
