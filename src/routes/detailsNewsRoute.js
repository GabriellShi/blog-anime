const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const detailsNewsController = require("../controllers/DetailsNewsController");

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", detailsNewsController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", 
  upload.fields([
    { name: "image", maxCount: 1 }, { name: "image2", maxCount: 1 }]), detailsNewsController.store);

// Mostra a tela
router.get("/edit/:id", detailsNewsController.edit);

// Executa a atualização
router.post("/edit/:id",   upload.fields([
    { name: "image", maxCount: 1 }, { name: "image2", maxCount: 1 }]),  detailsNewsController.update);

router.get("/delete/:id", detailsNewsController.delete);

router.delete("/delete/:id", detailsNewsController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", detailsNewsController.index);

// Rota do controlador 'show' que irá visualizar os detalhes de cada notícia
router.get("/:titulo", detailsNewsController.show);


router.get("/:nomedeuser", detailsNewsController.show);

module.exports = router;
