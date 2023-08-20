const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const detailsRecomendaController = require("../controllers/DetailsRecomendaController");




// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", detailsRecomendaController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("image"), detailsRecomendaController.store);

// Mostra a tela
router.get("/edit/:id", detailsRecomendaController.edit);

// Executa a atualização
router.post("/edit/:id", upload.single("image"), detailsRecomendaController.update);
router.get("/delete/:id", detailsRecomendaController.delete);

router.delete("/delete/:id", detailsRecomendaController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", detailsRecomendaController.index);


// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", detailsRecomendaController.show);
router.get("/:nomedeuser", detailsRecomendaController.show);

module.exports = router;
