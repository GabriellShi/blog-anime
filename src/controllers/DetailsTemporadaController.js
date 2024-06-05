const fs = require("fs");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const News = require("../models/News");
const Recomenda = require("../models/Recomenda");
const Temporada = require("../models/Temporada");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize"); 


const detailsTemporadaController = {
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const temporada = await Temporada.findAll({
        order: [['created_at', 'DESC']]
      });

      return res.render("temporada", {
        title: "Lista de Notícias",
        temporada,
      
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

    const detailsTemporada = await Temporada.findOne({
      where: {
        titulo: tituloDecodificado, // Mantenha o uso de "titulo" para buscar pelo título no URL
      },
    });
    

    if (!detailsTemporada) {
      return res.render("error", {
        title: "Ops!",
        message: "Detalhes da notícia não encontrado",
      });
    }

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
    let tipoAnime = [...noticiasAnimes, ...recomendacoesAnimes];

    // Sort tipoAnime by created_at in descending order
    tipoAnime.sort((a, b) => b.created_at - a.created_at);

    // Limitar a lista de notícias de anime a 5 itens
    tipoAnime = tipoAnime.slice(0, 5);

    // Base64 encode images
    tipoAnime.map((item) => {

      if (item instanceof News) {
        item.contentType = 'News';
      } else if (item instanceof Recomenda) {
        item.contentType = 'Recomenda';
      } else if (item instanceof Temporada) {
        item.contentType = 'Temporada';
      }
    });

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
    let tipoMangas = [...noticiasMangas, ...recomendacoesMangas];

    // Sort tipoMangas by created_at in descending order
    tipoMangas.sort((a, b) => b.created_at - a.created_at);

    tipoMangas = tipoMangas.slice(0, 5);

    // Base64 encode images
    tipoMangas.map((item) => {
    });

    const nextRecomenda = await Temporada.findAll({
      where: {
        titulo: {
          [Sequelize.Op.not]: titulo,
        },
        created_at: {
          [Sequelize.Op.lt]: detailsTemporada.created_at, // Alterado para "menor que" para pegar recomendações mais antigas
        },
      },
      order: [['created_at', 'DESC']], // Ordena por data descendente (mais antigas primeiro)
      limit: 3,
    });
    
    // Base64 encode images das próximas recomendações
    nextRecomenda.map((item) => {
    });

    

    return res.render("detailsTemporada", {
      title: detailsTemporada.titulo,
      temporada: detailsTemporada,
      detailsTemporada,
      tipoAnime,
      tipoMangas,
      nextRecomenda,
      News,
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
    return res.render("temporada-create", { title: "Cadastrar Noticia" });
  },
  store: async (req, res) => {
    const { titulo, description, conecxao, categoria, genero1, genero2, genero3, estreia, streaming, tipo, estacao, link_video, image, image2 } = req.body;
    const {  } = req.files;

    try {

      const novaNews = await Temporada.create({
        titulo,
        description,
        conecxao,
        categoria,
        tipo,
        genero1, 
        genero2, 
        genero3, 
        estreia, 
        streaming,
        estacao,
        link_video,
        image: image, 
        image2: image2, 
             
      });

      res.redirect("/detailsTemporada");
    } catch (error) {
      console.error(error); // Adicione essa linha para registrar o erro no console
      res.render("temporada-create", {
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
      const detailsTemporada = await Temporada.findByPk(id);
  
      if (!detailsTemporada) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      return res.render("temporada-edit", {
        title: "Editar Notícia",
        temporada: detailsTemporada, // Passamos os detalhes diretamente para a propriedade 'news'
        detailsTemporada,
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
    const { titulo, description, conecxao, categoria, genero1, genero2, genero3, estreia, streaming, tipo, estacao, link_video, image, image2  } = req.body;

    try {
      const newsToUpdate = await Temporada.findByPk(id);

      await newsToUpdate.update({
        titulo,
        description,
        conecxao,
        categoria,
        tipo,
        genero1, 
        genero2, 
        genero3, 
        estreia, 
        streaming,
        estacao,
        link_video,
        image: image,
        image2: image2, 
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
      const detailsTemporada = await Temporada.findByPk(id);

      if (!detailsTemporada) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      return res.render("temporada-delete", {
        title: "Deletar Notícia",
        detailsTemporada: detailsTemporada, // Certifique-se de passar o objeto corretamente aqui
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
      const newsToDelete = await Temporada.findByPk(id);

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

module.exports = detailsTemporadaController;
