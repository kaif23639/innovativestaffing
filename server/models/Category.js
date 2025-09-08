const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  heading: String,
  content: String,
}, { _id: false });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  order: Number,
  image: String,
  sections: [sectionSchema], // <<---- add this line
});

module.exports = mongoose.model('Category', categorySchema);
