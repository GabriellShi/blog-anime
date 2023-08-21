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

const detailsRecomendaController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const recomenda = await Recomenda.findAll();

      // Mapeie os URLs completos das imagens
      recomenda.map((detailsRecomenda) => {
        if (detailsRecomenda.image) {
          detailsRecomenda.image = files.base64Encode(upload.path + detailsRecomenda.image);
        }
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

  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
// show - controlador que irá visualizar os detalhes de cada notícia
// show - controlador que irá visualizar os detalhes de cada notícia
show: async (req, res) => {
  try {
    const { id } = req.params;

    // Busque os detalhes da notícia no banco de dados pelo ID
    const detailsRecomenda = await Recomenda.findByPk(id);

    if (!detailsRecomenda) {
      return res.render("error", {
        title: "Ops!",
        message: "Detalhes da notícia não encontrado",
      });
    }

    // Converte a imagem em base64
    if (detailsRecomenda.image) {detailsRecomenda.image = files.base64Encode(upload.path + detailsRecomenda.image); }
    if (detailsRecomenda.image2) {detailsRecomenda.image2 = files.base64Encode(upload.path + detailsRecomenda.image2); }
    if (detailsRecomenda.image3) {detailsRecomenda.image3 = files.base64Encode(upload.path + detailsRecomenda.image3); }
    if (detailsRecomenda.image4) {detailsRecomenda.image4 = files.base64Encode(upload.path + detailsRecomenda.image4); }
    if (detailsRecomenda.image5) {detailsRecomenda.image5 = files.base64Encode(upload.path + detailsRecomenda.image5); }
    if (detailsRecomenda.image6) {detailsRecomenda.image6 = files.base64Encode(upload.path + detailsRecomenda.image6); }
    if (detailsRecomenda.image7) {detailsRecomenda.image7 = files.base64Encode(upload.path + detailsRecomenda.image7); }
    if (detailsRecomenda.image8) {detailsRecomenda.image8 = files.base64Encode(upload.path + detailsRecomenda.image8); }
    if (detailsRecomenda.image9) {detailsRecomenda.image9 = files.base64Encode(upload.path + detailsRecomenda.image9); }
    if (detailsRecomenda.image10) {detailsRecomenda.image10 = files.base64Encode(upload.path + detailsRecomenda.image10); }
    if (detailsRecomenda.image11) {detailsRecomenda.image11 = files.base64Encode(upload.path + detailsRecomenda.image11); }


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

    const temporadasAnimes = await Temporada.findAll({
      where: {
        tipo: "Animes"
      },
      order: [['created_at', 'DESC']]
    });

    // Combine the data from all three tables
    let tipoAnime = [...noticiasAnimes, ...recomendacoesAnimes, ...temporadasAnimes];

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

    const temporadasMangas = await Temporada.findAll({
      where: {
        tipo: "Mangas"
      },
      order: [['created_at', 'DESC']]
    });

    // Combine the data from all three tables
    let tipoMangas = [...noticiasMangas, ...recomendacoesMangas, ...temporadasMangas];


    // Sort tipoMangas by created_at in descending order
    tipoMangas.sort((a, b) => b.created_at - a.created_at);

 
    tipoMangas = tipoMangas.slice(0, 5);

    // Base64 encode images
    tipoMangas.map((item) => {
      if (item.image) {
        item.image = files.base64Encode(upload.path + item.image);
      }
      
    });

    return res.render("detailsRecomenda", {
      title: "Visualizar notícia",
      recomenda: detailsRecomenda,
      detailsRecomenda,
      tipoAnime,
      tipoMangas,
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
    const { titulo, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10, titulo11,
       description, description2, description3, description4, description5, description6, description7, 
       description8, description9, description10, description11,
        conecxao, categoria, tipo} = req.body;
    try {
      let filename = "default-image.jpeg";
      if (req.file) {
        filename = req.file.filename;
      }

      const novaNews = await Recomenda.create({
        titulo, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10, titulo11,
        description, description2, description3, description4, description5, description6, description7, 
        description8, description9, description10, description11,

        conecxao,
        categoria,
        tipo,

        image: filename, image2: filename, image3: filename, image4: filename, image5: filename, 
        image6: filename, image7: filename, image8: filename, image9: filename, image10: filename, image11: filename,
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
  
      // Converte a imagem em base64
      if (detailsRecomenda.image) {
        detailsRecomenda.image = files.base64Encode(upload.path + detailsRecomenda.image);
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
    const {  titulo, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10,  titulo11,
      description, description2, description3, description4, description5, description6, description7, 
      description8, description9, description10, description11,
       conecxao, categoria, tipo } = req.body;

    try {
      const newsToUpdate = await Recomenda.findByPk(id);

      let filename = newsToUpdate.image1;
      if (req.file) {
        filename = req.file.filename;
      }

      await newsToUpdate.update({
        titulo, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10, titulo11,
        description, description2, description3, description4, description5, description6, description7, 
        description8, description9, description10, description11,

        conecxao,
        categoria,
        tipo,

        image: filename, image2: filename, image3: filename, image4: filename, image5: filename, 
        image6: filename, image7: filename, image8: filename, image9: filename, image10: filename,  image11: filename,
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

      if (detailsRecomenda.image) {
        detailsRecomenda.image = files.base64Encode(upload.path + detailsRecomenda.image);
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
