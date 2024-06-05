const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const authMiddleware = require("../middlewares/auth");
const guestMiddleware = require("../middlewares/guest");

router.get("/login", guestMiddleware, loginController.login);
router.post("/login", guestMiddleware, loginController.auth);
router.post("/logout", authMiddleware, loginController.logout);

router.route("/recuperarSenha")
  .get(loginController.recuperarSenha)
  .post(loginController.recuperarSenha);

router.route("/codigoAcesso")
  .get(loginController.codigoAcesso)
  .post(loginController.codigoAcesso);

router.route("/novaSenha")
  .get(loginController.novaSenha)
  .post(loginController.novaSenha);

router.get("/indexAdm", authMiddleware, (req, res) => {
  res.render("indexAdm", { title: "Admin Page", user: req.cookies.user });
});

module.exports = router;
