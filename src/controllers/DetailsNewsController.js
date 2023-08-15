// const fs = require("fs");
// const files = require("../helpers/files");
// const upload = require("../config/upload");

// // Configuração para conexão com o banco de dados
// const db = require("../config/sequelize");
// const News = require("../models/News");
// const { Op } = require("sequelize");

const detailsNewsController = {
  index: (req, res) => {
    return res.render("news", {
      title: "Noticias", //user: req.cookies.user,
    });
  },

  // Página para criar usuário
  create: (req, res) => {
    return res.render("news-create", {
      title: "Criar Noticia",
      
    });
  },
  // Cria usuário
  // Não retorna página
  store: async (req, res) => {
    const { titulo, description, conecxao, categoria, image } = req.body;

    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(upload.path + req.file.filename);
      }
      return res.render("user-create", {
        title: "Cadastrar usuário",
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // Atribui a variavel filename uma imagem default
    let filename = "user-default.jpeg";

    // Atribui ao avatar uma imagem default caso tenha tido algo de errado no download
    if (req.file) {
      filename = req.file.filename;
    }

    // Verifica se a senha realmente está correta
    if (senha !== confirmar_senha) {
      return res.render("user-create", {
        title: "Error",
        errors: {
          confirmar_senha: {
            msg: "Senhas não coincidem",
          },
        },
        old: req.body,
      });
    }

    try {
      const senhaBcrypt = await bcrypt.hashSync(req.body.senha, 10);
      const userExists = await User.findOne({
        attributes: ["email"],
        where: {
          email: email,
        },
      });

      if (userExists) {
        return res.render("user-create", {
          title: "Error",
          errors: {
            email: {
              msg: "Este email já está registrado",
            },
          },
          old: req.body,
        });
      }

      const users = await User.create({
        name: nome,
        last_name: sobrenome,
        email,
        password: senhaBcrypt,
        image: filename,
      });
      res.render("user-create", {
        title: "Sucesso",
        message: `Usuário ${users.name} foi cadastrado com sucesso!`,
      });
    } catch (error) {
      res.render("user-create", {
        title: "Erro",
        message: "Erro ao cadastrar usuário!",
      });
    }
  },
};

module.exports = detailsNewsController;
