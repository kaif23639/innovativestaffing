// models/FlipCard.js
const mongoose = require('mongoose');

const flipCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  link: String,
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('FlipCard', flipCardSchema);
