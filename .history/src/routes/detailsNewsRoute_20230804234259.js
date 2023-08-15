const express = require("express");
const router = express.Router();

// Controllers
const detailsNewsController = require("../controllers/DetailsNewsController");

router.get("/", detailsNewsController.detailsNews);

module.exports = router;
