const mongoose = require("mongoose");

const JoinTalentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  location: String,
  anythingElse: String,
  fileUrl: String,
  originalFileName: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JoinTalent", JoinTalentSchema);
