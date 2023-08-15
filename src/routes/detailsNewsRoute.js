// Importe os módulos necessários
const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");

// Importe o controlador para a exibição de notícias
const detailsNewsController = require("../controllers/DetailsNewsController");

router.get("/create", detailsNewsController.create);
router.post("/create", upload.single('avatar'), detailsNewsController.store);

router.get("/news", detailsNewsController.index);


module.exports = router;
