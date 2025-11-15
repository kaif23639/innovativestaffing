const mongoose = require('mongoose');

const featuredSolutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  button: { type: String, required: true },
});

module.exports = mongoose.model('FeaturedSolution', featuredSolutionSchema);
