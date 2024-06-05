const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
// Controllers
const indexAdmController = require("../controllers/IndexAdmController");

// Todas as rotas de administração devem usar o middleware de autenticação
router.get("/indexAdm", authMiddleware, indexAdmController.indexAdm);
router.get("/paginasCreate", authMiddleware, indexAdmController.paginasCreate);
router.get("/paginasNews", authMiddleware, indexAdmController.paginasNews);

module.exports = router;
