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
  
      // Mapeie os URLs completos das imagens
      const newsWithImageUrls = news.map((newsItem) => {
        return {
          ...newsItem.toJSON(),
          imageUrl: upload.path + newsItem.image,
        };
      });
      
  
      return res.render("news", {
        title: "Lista de Notícias",
        news: newsWithImageUrls,
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
    const { id } = req.params;
    const { titulo, description, conecxao, categoria } = req.body;

    try {
      const newsToUpdate = await News.findByPk(id);

      let filename = newsToUpdate.image;
      if (req.file) {
        filename = req.file.filename;
      }

      await newsToUpdate.update({
        titulo,
        description,
        conecxao,
        categoria,
        image: filename,
      });

      return res.render("success", {
        title: "Notícia Atualizada",
        message: `Notícia ${newsToUpdate.titulo} foi atualizada`,
      });
    } catch (error) {
      console.error(error);
      return res.render("error", {
        title: "Erro",
        message: "Erro ao atualizar notícia",
      });
    }
  },
  

  delete: async (req, res) => {
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

      return res.render("news-delete", {
        title: "Deletar Notícia",
        detailsNews: detailsNews, // Certifique-se de passar o objeto corretamente aqui
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes da notícia para exclusão",
      });
    }
   },

   destroy: async (req, res) => {
    const { id } = req.params;

    try {
      const newsToDelete = await News.findByPk(id);

      if (!newsToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "Notícia não encontrada",
        });
      }

      // Deleta a notícia do banco de dados
      await newsToDelete.destroy();

      return res.render("success", {
        title: "Notícia Deletada",
        message: "Notícia deletada com sucesso!",
      });
    } catch (error) {
      console.error(error);
      return res.render("error", {
        title: "Erro",
        message: "Erro ao deletar notícia",
      });
    }
  },
};

module.exports = detailsNewsController;
