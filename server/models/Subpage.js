const mongoose = require('mongoose');

const subpageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  order: Number,
  image: String, // <-- add this to store image URL
});

module.exports = mongoose.model('Subpage', subpageSchema);
