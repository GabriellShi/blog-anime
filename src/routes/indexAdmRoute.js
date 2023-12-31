const express = require("express");
const router = express.Router();

// Controllers
const indexAdmController = require("../controllers/IndexAdmController");

router.get("/indexAdm", indexAdmController.indexAdm);

    router.get("/paginasCreate", indexAdmController.paginasCreate);

    router.get("/paginasNews", indexAdmController.paginasNews);


module.exports = router;
