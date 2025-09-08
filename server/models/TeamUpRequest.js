const mongoose = require("mongoose");

const teamUpRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  mainCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeamUpRequest", teamUpRequestSchema);
