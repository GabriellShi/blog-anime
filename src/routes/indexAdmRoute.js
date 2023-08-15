const express = require("express");
const router = express.Router();

// Controllers
const indexAdmController = require("../controllers/IndexAdmController");

router.get("/indexAdm", indexAdmController.indexAdm);

module.exports = router;
