const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['features', 'target', 'examples', 'benefits', 'packages', 'cta'],
    required: true
  },
  heading: String,       // e.g. "Features", or custom
  content: mongoose.Schema.Types.Mixed, // Supports text, HTML, array, or object—flexible for admin editing
  // Add other fields if needed for richer section content
});

const subpageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  order: Number,
  image: String,
  sections: [sectionSchema],   // <-- dynamic array of sections (editable from admin)
});

module.exports = mongoose.model('Subpage', subpageSchema);
