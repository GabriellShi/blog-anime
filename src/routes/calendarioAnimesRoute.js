const express = require("express");
const router = express.Router();

// Controllers
const calendarioAnimesController = require("../controllers/CalendarioAnimesController");

router.get("/calendarioAnimes", calendarioAnimesController.calendarioAnimes);



module.exports = router;
