const Users = require("../models/Users");
const NewPassword = require("../models/NewPassword");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require("sequelize");

const emailRemetente = 'gabrieloliveirasantos196@gmail.com';


// Configurar o transporte de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailRemetente,
    pass: 'prrw jqpn qnlu yseh' // Certifique-se de manter essa informação segura
  }
});
const loginController = {
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
      user: req.cookies.user,
      admin: req.cookies.admin,
    });
  },

  auth: async (req, res) => {
    try {
      const user = await Users.findOne({ where: { email: req.body.email } });
      if (!user || req.body.senha !== user.senha) {
        return res.render("login", {
          title: "Login",
          error: { message: "E-mail ou Senha inválidos" }
        });
      }
      res.cookie("user", {
        id: user.id,
        nome: user.nome,
        admin: user.is_admin === 1,
      });
      res.redirect("/indexAdm");
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).render("error", {
        title: "Erro",
        message: "Erro ao realizar o login",
      });
    }
  },

  recuperarSenha: async (req, res) => {
    if (req.method === 'POST') {
      const user = await Users.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.render("recuperarSenha", {
          title: "Recuperar Senha",
          error: { message: "E-mail não encontrado" }
        });
      }
      // Excluir entradas expiradas
      await NewPassword.destroy({
        where: {
          expires_at: {
            [Op.lt]: new Date() // Excluir se expirado
          }
        }
      });
      
      const codigo = crypto.randomBytes(3).toString('hex').toUpperCase();
      const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000); // Expira em 1 hora
      await NewPassword.create({ user_id: user.id, email: user.email, codigo, expires_at: expiresAt });

      const mailOptions = {
        from: 'emailRemetente',
        to: user.email,
        subject: 'Código de Recuperação de Senha',
        text: `Seu código de recuperação de senha é: ${codigo}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error("Erro ao enviar email:", error);
        }
        console.log('Email enviado:', info.response);
      });

      res.redirect("/codigoAcesso");
    } else {
      return res.render("recuperarSenha", { title: "Recuperar Senha" });
    }
  },

  codigoAcesso: async (req, res) => {
    if (req.method === 'POST') {
      const { email, codigo } = req.body;
      const newPasswordEntry = await NewPassword.findOne({
        where: {
          email,
          codigo,
          expires_at: {
            [Op.gt]: new Date() // Verifica se o código ainda não expirou
          }
        }
      });
      if (!newPasswordEntry) {
        return res.render("codigoAcesso", {
          title: "Código de Acesso",
          error: { message: "Código inválido ou expirado" }
        });
      }
      res.redirect("/novaSenha");
    } else {
      return res.render("codigoAcesso", { title: "Código de Acesso" });
    }
  },

  novaSenha: async (req, res) => {
    if (req.method === 'POST') {
      const { email, senha, confirmSenha } = req.body;
      if (senha.length < 8) {
        return res.render("novaSenha", {
          title: "Nova Senha",
          error: { message: "A senha deve ter no mínimo 8 caracteres" }
        });
      }
      if (senha !== confirmSenha) {
        return res.render("novaSenha", {
          title: "Nova Senha",
          error: { message: "As senhas não coincidem" }
        });
      }
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.render("novaSenha", {
          title: "Nova Senha",
          error: { message: "Erro ao redefinir a senha" }
        });
      }
      user.senha = senha;
      await user.save();
      res.redirect("/login");
    } else {
      return res.render("novaSenha", { title: "Nova Senha" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("user");
    res.clearCookie("admin");
    res.redirect("/");
  },
};

module.exports = loginController;
