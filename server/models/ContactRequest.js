const mongoose = require("mongoose");

const contactRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  inquiryType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ContactRequest", contactRequestSchema);