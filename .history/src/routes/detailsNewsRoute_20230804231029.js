const express = require("express");
const router = express.Router();

// Controllers
const detailsNewsController = require("../controllers/detailsNewsController");

router.get("/", detailsNewsController.detailsNews);

module.exports = router;
