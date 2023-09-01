const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");



// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const News = require("../models/News");
const Recomenda = require("../models/Recomenda");
const Temporada = require("../models/Temporada");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize"); 


const detailsNewsController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const news = await News.findAll({
        order: [['created_at', 'DESC']]
      });

      // Mapeie os URLs completos das imagens
      news.map((detailsNews) => {
        if (detailsNews.image) {
          detailsNews.image = files.base64Encode(upload.path + detailsNews.image);
        }
      });

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
// show - controlador que irá visualizar os detalhes de cada notícia
// show - controlador que irá visualizar os detalhes de cada notícia
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



    if (detailsNews.created_at) {
      const createdAtDate = new Date(detailsNews.created_at);
      const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
      detailsNews.formattedCreatedAt = formattedCreatedAt;
    }

    // Converte a imagem em base64
    if (detailsNews.image) {
      detailsNews.image = files.base64Encode(upload.path + detailsNews.image);
    }

    if (detailsNews.image2) {
      detailsNews.image2 = files.base64Encode(upload.path + detailsNews.image2);
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
      if (item.image) {
        item.image = files.base64Encode(upload.path + item.image);
      }

      if (item instanceof News) {
        item.contentType = 'News';
      } else if (item instanceof Recomenda) {
        item.contentType = 'Recomenda';
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
      if (item.image) {
        item.image = files.base64Encode(upload.path + item.image);
      }
      
    });

    const nextRecomenda = await News.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: id,
        },
        created_at: {
          [Sequelize.Op.lt]: detailsNews.created_at, // Alterado para "menor que" para pegar recomendações mais antigas
        },
      },
      order: [['created_at', 'DESC']], // Ordena por data descendente (mais antigas primeiro)
      limit: 3,
    });
    

    // Base64 encode images das próximas recomendações
    nextRecomenda.map((item) => {
      if (item.image) {
        item.image = files.base64Encode(upload.path + item.image);
      }
    });



    return res.render("detailsNews", {
      title: detailsNews.titulo, // Use o título da notícia como título da guia do navegador
      news: detailsNews,
      detailsNews,
      tipoAnime,
      tipoMangas,
      nextRecomenda,
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
    return res.render("news-create", { title: "Cadastrar Noticia" });
  },
  store: async (req, res) => {
    const { titulo, description, subtitulo, description2, conecxao, categoria, tipo, link_video } = req.body;
    const { image, image2} = req.files;

    
    try {

        let filename1 = "user-default.jpg";
        let filename2 = "user-default.jpg";


        if (image) { filename1 = image[0].filename; }
        if (image2) { filename2 = image2[0].filename; }
 


      const novaNews = await News.create({
        titulo,
        description,
        conecxao,
        categoria,
        tipo,
        link_video,
        subtitulo, description2,

        image: filename1, image2: filename2,
          
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
  
      // Converte a imagem em base64
      if (detailsNews.image) {
        detailsNews.image = files.base64Encode(upload.path + detailsNews.image);
        detailsNews.imageURL = `${upload.path}${detailsNews.image}`;
      }
      
      if (detailsNews.image2) {
        detailsNews.image2 = files.base64Encode(upload.path + detailsNews.image2);
        detailsNews.image2URL = `${upload.path}${detailsNews.image2}`;
      }
  
      return res.render("news-edit", {
        title: "Editar Notícia",
        news: detailsNews, // Passamos os detalhes diretamente para a propriedade 'news'
        detailsNews,
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
    const { titulo, description, subtitulo, description2, conecxao, categoria, tipo, link_video } = req.body;
    const { image, image2 } = req.files;
  
    try {
      const newsToUpdate = await News.findByPk(id);
  
      // Verificar se o campo 'image' está presente no objeto 'req.files'
      if (image) {
        const filename1 = image[0].filename;
        newsToUpdate.image = filename1;
      }
  
      // Verificar se o campo 'image2' está presente no objeto 'req.files'
      if (image2) {
        const filename2 = image2[0].filename;
        newsToUpdate.image2 = filename2;
      }
  
      // Verificar se o campo 'description' foi preenchido no formulário
      // Se não foi preenchido, manter o valor original
      if (description.trim() === '') {
        description = newsToUpdate.description;
      }
  
      // Restante do código de atualização permanece igual
  
      await newsToUpdate.update({
        titulo,
        description,
        conecxao,
        categoria,
        tipo,
        link_video,
        subtitulo,
        description2,
        // Certifique-se de incluir as propriedades de imagem aqui
        image: newsToUpdate.image,
        image2: newsToUpdate.image2,
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

      if (detailsNews.image) {
        detailsNews.image = files.base64Encode(upload.path + detailsNews.image);
      }

      return res.render("news-delete", {
        title: "Deletar Notícia",
        detailsNews: detailsNews, // Certifique-se de passar o objeto corretamente aqui
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
