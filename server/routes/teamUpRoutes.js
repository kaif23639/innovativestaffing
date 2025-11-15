const express = require("express");
const router = express.Router();
const { createTeamUpRequest } = require("../controllers/team");


router.post("/", createTeamUpRequest);

module.exports = router;
