const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


// Controllers
const detailsTemporadaController = require("../controllers/DetailsTemporadaController");

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", authMiddleware, detailsTemporadaController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", authMiddleware, detailsTemporadaController.store
);
// Mostra a tela
router.get("/edit/:id", authMiddleware, detailsTemporadaController.edit);

// Executa a atualização
router.post("/edit/:id", authMiddleware, detailsTemporadaController.update);

router.get("/delete/:id", authMiddleware, detailsTemporadaController.delete);

router.delete("/delete/:id", authMiddleware, detailsTemporadaController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", authMiddleware, detailsTemporadaController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:titulo", detailsTemporadaController.show);
router.get("/:nomedeuser", detailsTemporadaController.show);

module.exports = router;
