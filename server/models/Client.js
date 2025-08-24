const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },    // Optional: store logo/image URL
  websiteUrl: { type: String }, // Optional: client website link
});

module.exports = mongoose.model('Client', clientSchema);
