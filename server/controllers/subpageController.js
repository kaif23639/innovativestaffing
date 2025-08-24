const Subpage = require('../models/Subpage');

exports.getAllSubpages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const subpages = await Subpage.find(filter).populate('category').sort({ order: 1 });
    res.json(subpages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubpageBySlug = async (req, res) => {
  try {
    const subpage = await Subpage.findOne({ slug: req.params.slug });
    if (!subpage) return res.status(404).json({ msg: 'Subpage not found' });
    res.json(subpage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubpageById = async (req, res) => {
  try {
    const subpage = await Subpage.findById(req.params.id).populate('category');
    if (!subpage) return res.status(404).json({ msg: 'Subpage not found' });
    res.json(subpage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubpage = async (req, res) => {
  try {
    const { title, slug, description, content, category, order, image } = req.body;
    const subpage = new Subpage({ title, slug, description, content, category, order, image });
    await subpage.save();
    res.status(201).json(subpage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSubpage = async (req, res) => {
  try {
    const updates = req.body;
    const subpage = await Subpage.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!subpage) return res.status(404).json({ msg: 'Subpage not found' });
    res.json(subpage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSubpage = async (req, res) => {
  try {
    const subpage = await Subpage.findByIdAndDelete(req.params.id);
    if (!subpage) return res.status(404).json({ msg: 'Subpage not found' });
    res.json({ msg: 'Subpage deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
