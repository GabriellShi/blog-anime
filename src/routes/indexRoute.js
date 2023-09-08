const express = require("express");
const router = express.Router();
// Controllers
const indexController = require("../controllers/IndexController");

// Rota para a página inicial
router.get("/", indexController.index);


router.get("/temporadas", indexController.temporadaViewsClient);
router.get("/recomendas", indexController.recomendaViewsClient);
router.get("/curiosidade/", (req, res) => {
    const pageTitle = "Curiosidades";
    indexController.curiosidadeViewsClient(req, res, pageTitle);
  });
  
router.get("/Animes", indexController.tipoAnimesViewsClient);
router.get("/Mangas", indexController.tipoMangasViewsClient);

// Rota para carregar mais notícias
router.get("/carregarMaisNoticias/:offset", indexController.loadMoreNews);
router.get("/carregarMaisNoticiasAnimes/:offsetAnimes", indexController.loadMoreNewsAnimes);
router.get("/carregarMaisNoticiasMangas/:offsetMangas", indexController.loadMoreNewsMangas);
router.get("/carregarMaisNoticiasRecomenda/:offsetRecomenda", indexController.loadMoreNewsRecomenda);
router.get("/carregarMaisNoticiasCuriosidade/:offsetCuriosidade", indexController.loadMoreNewsCuriosidade);


module.exports = router;
