const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


// Controllers
const datailsLancamentoController = require("../controllers/DetailsLancamentoController");

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", authMiddleware, datailsLancamentoController.create);

// Essa rota faz conecção com a create de cima, authMiddleware, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", authMiddleware, datailsLancamentoController.store);

// Mostra a tela
router.get("/edit/:id", authMiddleware, datailsLancamentoController.edit);

// Executa a atualização
router.post("/edit/:id", authMiddleware, datailsLancamentoController.update);
router.get("/delete/:id", authMiddleware, datailsLancamentoController.delete);

router.delete("/delete/:id", authMiddleware, datailsLancamentoController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", authMiddleware, datailsLancamentoController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", datailsLancamentoController.show);
router.get("/:nomedeuser", datailsLancamentoController.show);

module.exports = router;
