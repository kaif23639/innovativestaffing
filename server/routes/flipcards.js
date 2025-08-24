const express = require('express');
const router = express.Router();
const flipcardController = require('../controllers/flipcardController');
const adminAuth = require('../middleware/authMiddleware');

// Public GET routes
router.get('/', flipcardController.getAllFlipCards);
router.get('/:id', flipcardController.getFlipCardById);

// Protected routes
router.post('/', adminAuth, flipcardController.createFlipCard);
router.put('/:id', adminAuth, flipcardController.updateFlipCard);
router.delete('/:id', adminAuth, flipcardController.deleteFlipCard);

module.exports = router;
