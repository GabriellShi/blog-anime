const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");

const db = require("../config/sequelize");
const { Op } = require("sequelize");
const Temporada = require('../models/Temporada');
const Recomenda = require('../models/Recomenda');
const News = require('../models/News');

const indexController = {
  index: async (req, res) => {
    try {
      const noticiasDestaque = await News.findAll({
        order: [['created_at', 'DESC']]
      });

      const temporadasRecomendadas = await Recomenda.findAll({
        order: [['created_at', 'DESC']]
      });

      // Combine the two sets of data
      const mergedData = [...noticiasDestaque, ...temporadasRecomendadas];

      // Sort mergedData by created_at in descending order
      mergedData.sort((a, b) => b.created_at - a.created_at);

      noticiasDestaque.map((detailsNews) => {
        if (detailsNews.image) {
          detailsNews.image = files.base64Encode(upload.path + detailsNews.image);
        }
      });

      temporadasRecomendadas.map((detailsRecomenda) => {
        if (detailsRecomenda.image) {
          detailsRecomenda.image = files.base64Encode(upload.path + detailsRecomenda.image);
        }
      });

      const temporadaNews = await Temporada.findAll({
        order: [['created_at', 'DESC']]
      });

      // Encode images
      temporadaNews.map((detailsTemporada) => {
        if (detailsTemporada.image) {
          detailsTemporada.image = files.base64Encode(upload.path + detailsTemporada.image);
        }
      });

      temporadaNews.map((detailsTemporada) => {
        if (detailsTemporada.image2) {
          detailsTemporada.image2 = files.base64Encode(upload.path + detailsTemporada.image2);
        }
      });

      const curiosidadeNews = await News.findAll({
        where: {
          categoria: "Curiosidades"
        },
        order: [['created_at', 'DESC']]
        
      });

      // Encode images
      curiosidadeNews.map((curiosidade) => {
        if (curiosidade.image) {
          curiosidade.image = files.base64Encode(upload.path + curiosidade.image);
        }
      });
      

      res.render('index', {
        title: 'Go Geek',
        mergedData: mergedData.slice(0, 10), // Limitar a 10 notícias iniciais
        News,
        Recomenda,
        curiosidadeNews,
        temporadaNews,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar os dados');
    }
  },

  loadMoreNews: async (req, res) => {
    try {
      const offset = parseInt(req.params.offset);
  
      const noticiasDestaque2 = await News.findAll({
        order: [['created_at', 'DESC']]
      });
  
      const temporadasRecomendadas2 = await Recomenda.findAll({
        order: [['created_at', 'DESC']]
      });
  
      const mergedData = [...noticiasDestaque2, ...temporadasRecomendadas2];
      mergedData.sort((a, b) => b.created_at - a.created_at);
  
      // Atualize as URLs das imagens
      mergedData.map((item) => {
        if (item.image) {
          item.imageUrl = '/images/' + item.image; // Use '/images/' em vez de '/image/'
        }
      });
  
      const newsSlice = mergedData.slice(offset, offset + 10);
  
      res.render('partials/newsList', { newsSlice });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar mais notícias');
    }
  },
  
  
  
  
  
  temporadaViewsClient: async (req, res) => {
    try {
      const temporada = await Temporada.findAll({
        order: [['created_at', 'DESC']]
      });
  
      temporada.map((detailsTemporada) => {
        if (detailsTemporada.image) {
          detailsTemporada.image = files.base64Encode(upload.path + detailsTemporada.image);
        }
      });
  
      return res.render("temporadaViewsClient", {
        title: "Temporadas",
        temporada, // Certifique-se de passar a variável temporada para a renderização
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as temporadas",
      });
    }
  },
  

  recomendaViewsClient: async (req, res) => {
    try {
      const recomenda = await Recomenda.findAll({
        order: [['created_at', 'DESC']]
      });
  
      recomenda.map((detailsRecomenda) => {
        if (detailsRecomenda.image) {
          detailsRecomenda.image = files.base64Encode(upload.path + detailsRecomenda.image);
        }
      });
  
      return res.render("recomendaViewsClient", {
        title: "Recomendações",
        recomenda, // Certifique-se de passar a variável temporada para a renderização
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as Recomenda",
      });
    }
  },

  curiosidadeViewsClient: async (req, res) => {
    try {
      const curiosidades = await News.findAll({
        where: {
          categoria: "Curiosidades"
        },
        order: [['created_at', 'DESC']]
      });

      curiosidades.map((curiosidade) => {
        if (curiosidade.image) {
          curiosidade.image = files.base64Encode(upload.path + curiosidade.image);
        }
      });

      return res.render("curiosidadeViewsClient", {
        title: "Curiosidades",
        curiosidades,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as curiosidades",
      });
    }
  
  },

  tipoAnimesViewsClient: async (req, res) => {
    try {
      const noticiasAnimes = await News.findAll({
        where: {
          tipo: "Animes"
        },
        order: [['created_at', 'DESC']]
      });

      const recomendacoesAnimes = await Recomenda.findAll({
        where: {
          tipo: "Animes"
        },
        order: [['created_at', 'DESC']]
      });



      // Combine the data from all three tables
      const tipoAnime = [...noticiasAnimes, ...recomendacoesAnimes];

      // Sort tipoAnime by created_at in descending order
      tipoAnime.sort((a, b) => b.created_at - a.created_at);

      // Base64 encode images
      tipoAnime.map((item) => {
        if (item.image) {
          item.image = files.base64Encode(upload.path + item.image);
        }
        
        if (item instanceof News) {
          item.contentType = 'News';
        } else if (item instanceof Recomenda) {
          item.contentType = 'Recomenda';
        } 
      });
      
      return res.render("tipoAnimesViewsClient", {
        title: "Animes",
        tipoAnime,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as informações de Animes",
      });
    }
  
  },

  
  tipoMangasViewsClient: async (req, res) => {
    try {
      const noticiasMangas = await News.findAll({
        where: {
          tipo: "Mangas"
        },
        order: [['created_at', 'DESC']]
      });

      const recomendacoesMangas = await Recomenda.findAll({
        where: {
          tipo: "Mangas"
        },
        order: [['created_at', 'DESC']]
      });


      // Combine the data from all three tables
      const tipoMangas = [...noticiasMangas, ...recomendacoesMangas];

      // Sort tipoMangas by created_at in descending order
      tipoMangas.sort((a, b) => b.created_at - a.created_at);

      // Base64 encode images
      tipoMangas.map((item) => {
        if (item.image) {
          item.image = files.base64Encode(upload.path + item.image);
        }
        
        if (item instanceof News) {
          item.contentType = 'News';
        } else if (item instanceof Recomenda) {
          item.contentType = 'Recomenda';
        } 
      });
      
      return res.render("tipoMangasViewsClient", {
        title: "Mangas",
        tipoMangas,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as informações de Mangas",
      });
    }
  
  },
  
};

module.exports = indexController;


