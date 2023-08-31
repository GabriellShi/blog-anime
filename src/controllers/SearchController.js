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

      // Mapeie os URLs completos das imagens
      news.map((detailsNews) => {
        if (detailsNews.image) {
          detailsNews.image = files.base64Encode(
            upload.path + detailsNews.image
          );
        }
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

      // Mapeie os URLs completos das imagens
      recomenda.map((detailsRecomenda) => {
        if (detailsRecomenda.image) {
          detailsRecomenda.image = files.base64Encode(
            upload.path + detailsRecomenda.image
          );
        }
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

      // Mapeie os URLs completos das imagens
      temporada.map((detailsTemporada) => {
        if (detailsTemporada.image) {
          detailsTemporada.image = files.base64Encode(
            upload.path + detailsTemporada.image
          );
        }
      });

      res.render("search", {
        title: "Resultado Pesquisa",
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
