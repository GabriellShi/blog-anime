const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const detailsRecomendaController = require("../controllers/DetailsRecomendaController");




// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", detailsRecomendaController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", 
  upload.fields([
    { name: "image", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }, { name: "image5", maxCount: 1 }, { name: "image6", maxCount: 1 },
    { name: "image7", maxCount: 1 }, { name: "image8", maxCount: 1 }, { name: "image9", maxCount: 1 },
    { name: "image10", maxCount: 1 },  { name: "image11", maxCount: 1 }
  ]), 
  detailsRecomendaController.store
);



// Mostra a tela
router.get("/edit/:id", detailsRecomendaController.edit);

// Executa a atualização
router.post("/edit/:id",   upload.fields([
    { name: "image", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }, { name: "image5", maxCount: 1 }, { name: "image6", maxCount: 1 },
    { name: "image7", maxCount: 1 }, { name: "image8", maxCount: 1 }, { name: "image9", maxCount: 1 },
    { name: "image10", maxCount: 1 }, { name: "image11", maxCount: 1 }
  ]),  detailsRecomendaController.update);
router.get("/delete/:id", detailsRecomendaController.delete);

router.delete("/delete/:id", detailsRecomendaController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", detailsRecomendaController.index);


// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", detailsRecomendaController.show);
router.get("/:nomedeuser", detailsRecomendaController.show);

module.exports = router;
