const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { createRequest } = require("../controllers/JoinTalent");

router.post("/", upload.single("file"), createRequest);

module.exports = router;
