const express = require("express");
const router = express.Router();

// Controllers
const indexController = require("../controllers/IndexController");

// Rota para a página inicial
router.get("/", indexController.index);

router.get("/temporadaViewsClient", indexController.temporadaViewsClient);
router.get("/recomendaViewsClient", indexController.recomendaViewsClient);
router.get("/curiosidadeViewsClient", indexController.curiosidadeViewsClient);
router.get("/tipoAnimesViewsClient", indexController.tipoAnimesViewsClient);
router.get("/tipoMangasViewsClient", indexController.tipoMangasViewsClient);

// Rota para carregar mais notícias
router.get("/carregarMaisNoticias/:offset", indexController.loadMoreNews);
router.get("/carregarMaisNoticiasAnimes/:offsetAnimes", indexController.loadMoreNewsAnimes);
router.get("/carregarMaisNoticiasMangas/:offsetMangas", indexController.loadMoreNewsMangas);
router.get("/carregarMaisNoticiasRecomenda/:offsetRecomenda", indexController.loadMoreNewsRecomenda);
router.get("/carregarMaisNoticiasCuriosidade/:offsetCuriosidade", indexController.loadMoreNewsCuriosidade);


module.exports = router;
