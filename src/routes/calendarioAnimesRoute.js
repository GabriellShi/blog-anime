const express = require("express");
const router = express.Router();

// Controllers
const calendarioAnimesController = require("../controllers/CalendarioAnimesController");

router.get("/calendario", calendarioAnimesController.calendarioAnimes);

module.exports = router;
