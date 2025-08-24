const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  order: Number,
  image: String, // New image url field
});

module.exports = mongoose.model('Category', categorySchema);
