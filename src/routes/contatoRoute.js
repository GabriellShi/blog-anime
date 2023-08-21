const express = require("express");
const router = express.Router();

// Controllers
const contatoController = require("../controllers/ContatoController");

router.get("/contato", contatoController.contato);



module.exports = router;
