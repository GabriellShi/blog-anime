const fs = require("fs");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const News = require("../models/News");
const Recomenda = require("../models/Recomenda");
const Temporada = require("../models/Temporada");

const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize");

const detailsRecomendaController = {
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    const { id } = req.params;
    try {
      // Busque todas as notícias do banco de dados
      const recomenda = await Recomenda.findAll({
        order: [["created_at", "DESC"]],
      });

      return res.render("recomenda", {
        title: "Lista de Notícias",
        recomenda,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as notícias",
      });
    }
  },

  // show - controlador que irá visualizar os detalhes de cada notícia
  show: async (req, res) => {


    try {
      const { titulo } = req.params;

      const tituloDecodificado = titulo.replace(/-/g, ' ');

      // Busque os detalhes da recomendação no banco de dados pelo título (slug)
      const detailsRecomenda = await Recomenda.findOne({
        where: {
          titulo: tituloDecodificado, // Mantenha o uso de "titulo" para buscar pelo título no URL
        },
      });

      const noticiasAnimes = await News.findAll({
        where: {
          tipo: "Animes",
        },
        order: [["created_at", "DESC"]],
      });

      const recomendacoesAnimes = await Recomenda.findAll({
        where: {
          tipo: "Animes",
        },
        order: [["created_at", "DESC"]],
      });

      // Combine the data from all three tables
      let tipoAnime = [...noticiasAnimes, ...recomendacoesAnimes];

      // Sort tipoAnime by created_at in descending order
      tipoAnime.sort((a, b) => b.created_at - a.created_at);

      // Limitar a lista de notícias de anime a 5 itens
      tipoAnime = tipoAnime.slice(0, 5);

      // Base64 encode images
      tipoAnime.map((item) => {

        if (item instanceof News) {
          item.contentType = "News";
        } else if (item instanceof Recomenda) {
          item.contentType = "Recomenda";
        }
      });

      const noticiasMangas = await News.findAll({
        where: {
          tipo: "Mangas",
        },
        order: [["created_at", "DESC"]],
      });

      const recomendacoesMangas = await Recomenda.findAll({
        where: {
          tipo: "Mangas",
        },
        order: [["created_at", "DESC"]],
      });

      // Combine the data from all three tables
      let tipoMangas = [...noticiasMangas, ...recomendacoesMangas];

      // Sort tipoMangas by created_at in descending order
      tipoMangas.sort((a, b) => b.created_at - a.created_at);

      tipoMangas = tipoMangas.slice(0, 5);

      // Base64 encode images
      tipoMangas.map((item) => {
      });

      const nextRecomenda = await Recomenda.findAll({
        where: {
          titulo: {
            [Sequelize.Op.not]: titulo,
          },
          created_at: {
            [Sequelize.Op.lt]: detailsRecomenda.created_at, // Alterado para "menor que" para pegar recomendações mais antigas
          },
        },
        order: [["created_at", "DESC"]], // Ordena por data descendente (mais antigas primeiro)
        limit: 3,
      });

      if (!detailsRecomenda) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrado",
        });
      }

      return res.render("detailsRecomenda", {
        title: detailsRecomenda.titulo,
        recomenda: detailsRecomenda,
        detailsRecomenda,
        tipoAnime,
        tipoMangas,
        nextRecomenda,
        News,
        Recomenda,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes da notícia",
      });
    }
  },

  create: async (req, res) => {
    return res.render("recomenda-create", { title: "Cadastrar Noticia" });
  },
  store: async (req, res) => {
    const {
      titulo,
      titulo2,
      titulo3,
      titulo4,
      titulo5,
      titulo6,
      titulo7,
      titulo8,
      titulo9,
      titulo10,
      titulo11,
      description1,
      description2,
      description3,
      description4,
      description5,
      description6,
      description7,
      description8,
      description9,
      description10,
      description11,
      conecxao,
      categoria,
      tipo,
      image,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
    } = req.body;
  
    try {
  
      const novaNews = await Recomenda.create({
        titulo,
        titulo2,
        titulo3,
        titulo4,
        titulo5,
        titulo6,
        titulo7,
        titulo8,
        titulo9,
        titulo10,
        titulo11,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6,
        description7,
        description8,
        description9,
        description10,
        description11,

        conecxao,
        categoria,
        tipo,

        image: image,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        image6: image6,
        image7: image7,
        image8: image8,
        image9: image9,
        image10: image10,
        image11: image11,
      });

      res.redirect("/detailsRecomenda");
    } catch (error) {
      console.error(error); // Adicione essa linha para registrar o erro no console
      res.render("recomenda-create", {
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
      const detailsRecomenda = await Recomenda.findByPk(id);

      if (!detailsRecomenda) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      return res.render("recomenda-edit", {
        title: "Editar Notícia",
        recomenda: detailsRecomenda, // Passamos os detalhes diretamente para a propriedade 'news'
        detailsRecomenda,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message:
          "Ocorreu um erro ao carregar os detalhes da notícia para edição",
      });
    }
  },

  // Executa a atualização
  update: async (req, res) => {
    const { id } = req.params;
    const {
      titulo,
      titulo2,
      titulo3,
      titulo4,
      titulo5,
      titulo6,
      titulo7,
      titulo8,
      titulo9,
      titulo10,
      titulo11,
      description1,
      description2,
      description3,
      description4,
      description5,
      description6,
      description7,
      description8,
      description9,
      description10,
      description11,
      conecxao,
      categoria,
      tipo,
      image,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
    } = req.body;

    try {
      const newsToUpdate = await Recomenda.findByPk(id);

      // if (description1.trim() === "") {
      //   description1 = newsToUpdate.description1;
      // }

      await newsToUpdate.update({
        titulo,
        titulo2,
        titulo3,
        titulo4,
        titulo5,
        titulo6,
        titulo7,
        titulo8,
        titulo9,
        titulo10,
        titulo11,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6,
        description7,
        description8,
        description9,
        description10,
        description11,

        conecxao,
        categoria,
        tipo,

        image: image,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        image6: image6,
        image7: image7,
        image8: image8,
        image9: image9,
        image10: image10,
        image11: image11,
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
      const detailsRecomenda = await Recomenda.findByPk(id);

      if (!detailsRecomenda) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      return res.render("recomenda-delete", {
        title: "Deletar Notícia",
        detailsRecomenda: detailsRecomenda, // Certifique-se de passar o objeto corretamente aqui
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message:
          "Ocorreu um erro ao carregar os detalhes da notícia para exclusão",
      });
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

    try {
      const newsToDelete = await Recomenda.findByPk(id);

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

module.exports = detailsRecomendaController;
