const express = require("express");
const router = express.Router();


// Controllers
const detailsTemporadaController = require("../controllers/DetailsTemporadaController");

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", detailsTemporadaController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", detailsTemporadaController.store
);
// Mostra a tela
router.get("/edit/:id", detailsTemporadaController.edit);

// Executa a atualização
router.post("/edit/:id", detailsTemporadaController.update);

router.get("/delete/:id", detailsTemporadaController.delete);

router.delete("/delete/:id", detailsTemporadaController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", detailsTemporadaController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:titulo", detailsTemporadaController.show);
router.get("/:nomedeuser", detailsTemporadaController.show);

module.exports = router;
