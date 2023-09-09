const express = require("express");
const router = express.Router();

// Controllers
const contatoController = require("../controllers/ContatoController");

router.get("/contato", contatoController.contato);

router.get("/melhorias", contatoController.melhorias);

router.get("/obrigado", contatoController.obrigado);



  

module.exports = router;
