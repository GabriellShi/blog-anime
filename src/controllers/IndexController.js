const fs = require("fs");

const db = require("../config/sequelize");
const { Op } = require("sequelize");
const Temporada = require('../models/Temporada');
const Recomenda = require('../models/Recomenda');
const News = require('../models/News');


const indexController = {
  index: async (req, res, pageTitle) => {
    try {
      const noticiasDestaque = await News.findAll({
        order: [['created_at', 'DESC']]
      });
  
      const temporadasRecomendadas = await Recomenda.findAll({
        order: [['created_at', 'DESC']]
      });
  
      // Combine as notícias das duas tabelas e ordene por data de criação
      const todasNoticias = [...noticiasDestaque, ...temporadasRecomendadas];
      todasNoticias.sort((a, b) => b.created_at - a.created_at);
  
      // Separe as notícias em destaque e principais
      const noticiasDestaqueSlice = todasNoticias.slice(0, 3);
      const noticiasPrincipaisSlice = todasNoticias.slice(3); // Remova o limite de 10, pegue todas as notícias restantes
  
      // Combine the two sets of data
      const mergedData = [...noticiasDestaque, ...temporadasRecomendadas];
      mergedData.sort((a, b) => b.created_at - a.created_at);
      
      // Filtrar notícias únicas com base no id
      const noticiasUnicas = [];
      const noticiasIds = new Set();
      
      for (const noticia of mergedData) {
        if (!noticiasIds.has(noticia.id)) {
          noticiasUnicas.push(noticia);
          noticiasIds.add(noticia.id);
        }
      }

      const temporadaNews = await Temporada.findAll({
        order: [['created_at', 'DESC']]
      });

      const { titulo } = req.params;

      const curiosidadeNews = await News.findAll({
        where: {
          categoria: "Curiosidades"
        },
        order: [['created_at', 'DESC']]
        
      });



      res.render('index', {
        title: pageTitle,
        title: "Go Geek Animes - Tudo sobre animes, mangas, doramas e muito mais",
        noticiasUnicas: noticiasUnicas.slice(0, 10), // Passando noticiasUnicas para o template
        News,
        Recomenda,
        curiosidadeNews,
        temporadaNews,
        noticiasDestaqueSlice,
        noticiasPrincipaisSlice,
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
  
      res.render('partials/newsList', {
         newsSlice,
         News, 
         Recomenda,
        });
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
  

      const detailsTemporada = {
        estreia: new Date('2023-08-31')
      };
      
      // função para formatar a data no formato desejado (dd-mm-yyyy).
      function formatarData(data) {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // O mês é base 0, então adicionamos 1.
        const ano = data.getFullYear();
      
        return `${dia}-${mes}-${ano}`;
      }
      

  
      return res.render("temporadaViewsClient", {
        title: "Temporadas - Go Geek Animes",
        temporada, 
        dataFormatada: formatarData(detailsTemporada.estreia)
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
  
      return res.render("recomendaViewsClient", {
        title: "Recomendações - Go Geek Animes",
        recomenda, // Certifique-se de passar a variável temporada para a renderização
        Recomenda,

      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as Recomenda",
      });
    }
  },

  loadMoreNewsRecomenda: async (req, res) => {
    try {
      const offsetRecomenda = parseInt(req.params.offsetRecomenda);
  

      const recomenda = await Recomenda.findAll({
        order: [['created_at', 'DESC']]
      });

      // Atualize as URLs das imagens
      recomenda.map((detailsRecomenda) => {
        if (detailsRecomenda.image) {
          detailsRecomenda.imageUrl = '/images/' + detailsRecomenda.image; // Use '/images/' em vez de '/image/'
        }
      });
  
      const newsSliceRecomenda = recomenda.slice(offsetRecomenda, offsetRecomenda + 10);
  
      res.render('partials/newsListRecomenda', 
      { newsSliceRecomenda,
        News,
        Recomenda,

       });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar mais notícias');
    }
  },

  curiosidadeViewsClient: async (req, res, pageTitle) => {
    try {
      const curiosidades = await News.findAll({
        where: {
          categoria: "Curiosidades"
        },
        order: [['created_at', 'DESC']]
      });
  
      return res.render("curiosidadeViewsClient", {
        title: pageTitle, // Defina o título da página com base no argumento pageTitle
        title: "Curiosidades -  Go Geek Animes",

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
  

  loadMoreNewsCuriosidade: async (req, res) => {
    try {
      const offsetCuriosidade = parseInt(req.params.offsetCuriosidade);
  
      const curiosidades = await News.findAll({
        where: {
          categoria: "Curiosidades"
        },
        order: [['created_at', 'DESC']]
      });

      // Atualize as URLs das imagens
      curiosidades.map((curiosidade) => {
        if (curiosidade.image) {
          curiosidade.imageUrl = '/images/' + curiosidade.image; // Use '/images/' em vez de '/image/'
        }
      });
  
      const newsSliceCuriosidade = curiosidades.slice(offsetCuriosidade, offsetCuriosidade + 10);
  
      res.render('partials/newsListCuriosidade', {
        curiosidades,
        newsSliceCuriosidade,
        News,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar mais notícias');
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
 
        if (item instanceof News) {
          item.contentType = 'News';
        } else if (item instanceof Recomenda) {
          item.contentType = 'Recomenda';
        } 
      });
      
      return res.render("tipoAnimesViewsClient", {
        title: "Animes -Go Geek Animes",
        tipoAnime,
        Recomenda,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as informações de Animes",
      });
    }
  },

  loadMoreNewsAnimes: async (req, res) => {
    try {
      const offsetAnimes = parseInt(req.params.offsetAnimes);
  
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
      tipoAnime.sort((a, b) => b.created_at - a.created_at);
  
      // Atualize as URLs das imagens
      tipoAnime.map((item) => {
        if (item.image) {
          item.imageUrl = '/images/' + item.image; // Use '/images/' em vez de '/image/'
        }
      });
  
      const newsSliceAnimes = tipoAnime.slice(offsetAnimes, offsetAnimes + 10);
  
      res.render('partials/newsListAnimes', 
      { newsSliceAnimes,
        News,
        Recomenda,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar mais notícias');
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
        
        if (item instanceof News) {
          item.contentType = 'News';
        } else if (item instanceof Recomenda) {
          item.contentType = 'Recomenda';
        } 
      });
      
      return res.render("tipoMangasViewsClient", {
        title: "Mangas -  Go Geek Animes",
        tipoMangas,
        Recomenda,

        
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as informações de Mangas",
      });
    }
  },

  loadMoreNewsMangas: async (req, res) => {
    try {
      const offsetMangas = parseInt(req.params.offsetMangas);
  
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
      const tipoAnime = [...noticiasMangas, ...recomendacoesMangas];
      tipoAnime.sort((a, b) => b.created_at - a.created_at);
  
      // Atualize as URLs das imagens
      tipoAnime.map((item) => {
        if (item.image) {
          item.imageUrl = '/images/' + item.image; // Use '/images/' em vez de '/image/'
        }
      });
  
      const newsSliceMangas = tipoAnime.slice(offsetMangas, offsetMangas + 10);
  
      res.render('partials/newsListMangas', 
      { newsSliceMangas,
        News,
        Recomenda,

       });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar mais notícias');
    }
  },

  
};

module.exports = indexController;


