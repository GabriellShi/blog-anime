const express = require("express");
const router = express.Router();

// Controllers
const indexController = require("../controllers/IndexController");

router.get("/", indexController.indexAdmin);

module.exports = router;
