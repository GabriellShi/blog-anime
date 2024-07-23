const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


// Controllers
const detailsRecomendaController = require("../controllers/DetailsRecomendaController");


// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", authMiddleware, detailsRecomendaController.create);

// Essa rota faz conecção com a create de cima, authMiddleware, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", authMiddleware,  detailsRecomendaController.store
);

// Mostra a tela
router.get("/edit/:id", authMiddleware, detailsRecomendaController.edit);

// Executa a atualização
router.post("/edit/:id", authMiddleware,  detailsRecomendaController.update);
  
router.get("/delete/:id", authMiddleware, detailsRecomendaController.delete);

router.delete("/delete/:id", authMiddleware, detailsRecomendaController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", authMiddleware, detailsRecomendaController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario

router.get("/:titulo", detailsRecomendaController.show);




module.exports = router;
