const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const News = require("../models/News");
const { Op } = require("sequelize");

const detailsNewsController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const news = await News.findAll();

      return res.render("news", {
        title: "Lista de Notícias",
        news,
        
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as notícias",
      });
    }
  },

  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: async (req, res) => {
    try {
      const { id } = req.params;

      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsNews = await News.findByPk(id);

      if (!detailsNews) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrado",
        });
      }

      const news = {
        ...detailsNews.toJSON(),
        image: files.base64Encode(upload.path + detailsNews.image),
      };

      return res.render("detailsNews", {
        title: "Visualizar notícia",
        news,
      });
    } catch (error) {
      console.error(error); // Mostrar o erro completo no console para depuração
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes da notícia",
      });
    }
  },

  create: async (req, res) => {
    return res.render("news-create", { title: "Cadastrar Noticia" });
  },
  store: async (req, res) => {
    const { titulo, description, conecxao, categoria } = req.body;
    try {
      let filename = "default-image.jpeg";
      if (req.file) {
        filename = req.file.filename;
      }
      
      const novaNews = await News.create({
        titulo,
        description,
        conecxao,
        categoria,
        image: filename,
      });
  
      res.redirect("/detailsNews");
      
      
    } catch (error) {
      console.error(error); // Adicione essa linha para registrar o erro no console
      res.render("news-create", {
        title: "Erro",
        message: "Erro ao criar notícia!",
      });
    }
  },
  
  

  // Mostra a tela
  edit: async (req, res) => {
    const { id } = req.params;
  
    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsNews = await News.findByPk(id);
  
      if (!detailsNews) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }
  
      const news = {
        ...detailsNews.toJSON(),
        image: files.base64Encode(upload.path + detailsNews.image),
      };
  
      return res.render("news-edit", {
        title: "Editar Notícia",
        news,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes da notícia para edição",
      });
    }
  },
  

  // Executa a atualização
  update: async (req, res) => {
    const usersJson = fs.readFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      "utf-8"
    );
    const users = JSON.parse(usersJson);

    const { id } = req.params;
    const { nome, nomedeuser, senha, email } = req.body;

    // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
    // apresentando uma mensagem caso encontrado ou não
    const userResult = users.find((user) => user.id === parseInt(id));
    let filename;
    if (req.file) {
      filename = req.file.filename;
    }
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Usuario não encontrado",
      });
    }

    const updateUser = userResult;
    if (nome) updateUser.nome = nome;
    if (nomedeuser) updateUser.nomedeuser = nomedeuser;
    if (senha) updateUser.senha = senha;
    if (email) updateUser.email = email;
    if (filename) {
      let imageTmp = updateUser.image;
      fs.unlinkSync(upload.path + imageTmp);
      updateUser.image = filename;
    }
    return res.render("success", {
      title: "Usuário Atualizado",
      message: `Usuário ${updateUser.nome} foi atualizado`,
    });
  },

  delete: async (req, res) => {
    const usersJson = fs.readFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      "utf-8"
    );
    const users = JSON.parse(usersJson);

    const { id } = req.params;

    // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
    // apresentando uma mensagem caso encontrado ou não
    const userResult = users.find((user) => user.id === parseInt(id));
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Usuario não encontrado",
      });
    }
    const user = {
      ...userResult,
      image: files.base64Encode(upload.path + userResult.image),
    };
    return res.render("user-delete", {
      title: "Deletar Usuario",
      user,
    });
  },

  destroy: async (req, res) => {
    const usersJson = fs.readFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      "utf-8"
    );
    const users = JSON.parse(usersJson);

    const { id } = req.params;

    // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
    // apresentando uma mensagem caso encontrado ou não
    const result = users.findIndex((user) => user.id === parseInt(id));
    if (!result === -1) {
      return res.render("error", {
        title: "Ops!",
        message: "Usuario não encontrado",
      });
    }

    fs.unlinkSync(upload.path + users[result].image);

    users.splice(result, 1);
    return res.render("success", {
      title: "Usuario Deletado",
      message: "Usuário deletado com sucesso!",
    });
  },
};

module.exports = detailsNewsController;
