const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const News = require("../models/News");
const Recomenda = require("../models/Recomenda");
const Temporada = require("../models/Temporada");

const searchController = {
  search: async (req, res) => {
    const termoPesquisa = req.body.searchQuery; // Alterado para req.body

    try {
      const news = await News.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              titulo: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
            {
              conecxao: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
          ],
        },
      });

      const recomenda = await Recomenda.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              titulo: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
            {
              conecxao: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
          ],
        },
      });


      const temporada = await Temporada.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              titulo: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
            {
              conecxao: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
          ],
        },
      });

      res.render("search", {
        title: "Resultado Pesquisa -  Go Geek Animes",
        news,
        recomenda,
        temporada,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao buscar dados no banco de dados");
    }
  },
};

module.exports = searchController;
