const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Define the route for your contact form
router.post("/", contactController.createContactRequest);

module.exports = router;