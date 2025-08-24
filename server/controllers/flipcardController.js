// controllers/flipcardController.js
const FlipCard = require('../models/FlipCard');

exports.getAllFlipCards = async (req, res) => {
  try {
    const flipcards = await FlipCard.find().sort({ order: 1 });
    res.json(flipcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlipCardById = async (req, res) => {
  try {
    const flipcard = await FlipCard.findById(req.params.id);
    if (!flipcard) return res.status(404).json({ msg: 'FlipCard not found' });
    res.json(flipcard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFlipCard = async (req, res) => {
  try {
    const { title, description, image, link, order } = req.body;
    const flipcard = new FlipCard({ title, description, image, link, order });
    await flipcard.save();
    res.status(201).json(flipcard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateFlipCard = async (req, res) => {
  try {
    const updates = req.body;
    const flipcard = await FlipCard.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!flipcard) return res.status(404).json({ msg: 'FlipCard not found' });
    res.json(flipcard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFlipCard = async (req, res) => {
  try {
    const flipcard = await FlipCard.findByIdAndDelete(req.params.id);
    if (!flipcard) return res.status(404).json({ msg: 'FlipCard not found' });
    res.json({ msg: 'FlipCard deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
