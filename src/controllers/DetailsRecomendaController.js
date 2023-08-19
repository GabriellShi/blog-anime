const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const News = require("../models/News");
const Recomenda = require("../models/Recomenda");
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
        if (detailsRecomenda.image1) {
          detailsRecomenda.image1 = files.base64Encode(upload.path + detailsRecomenda.image1);
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
    if (detailsRecomenda.image1) {
      detailsRecomenda.image1 = files.base64Encode(upload.path + detailsRecomenda.image1);
    }

    return res.render("detailsRecomenda", {
      title: "Visualizar notícia",
      recomenda: detailsRecomenda,
      detailsRecomenda,
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
    const { titulo1, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10, 
       description1, description2, description3, description4, description5, description6, description7, 
       description8, description9, description10,
        conecxao, categoria } = req.body;
    try {
      let filename = "default-image.jpeg";
      if (req.file) {
        filename = req.file.filename;
      }

      const novaNews = await Recomenda.create({
        titulo1, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10, 
        description1, description2, description3, description4, description5, description6, description7, 
        description8, description9, description10,

        conecxao,
        categoria,

        image1: filename, image2: filename, image3: filename, image4: filename, image5: filename, 
        image6: filename, image7: filename, image8: filename, image9: filename, image10: filename,
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
      if (detailsRecomenda.image1) {
        detailsRecomenda.image1 = files.base64Encode(upload.path + detailsRecomenda.image1);
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
    const { titulo, description, conecxao, categoria } = req.body;

    try {
      const newsToUpdate = await Recomenda.findByPk(id);

      let filename = newsToUpdate.image1;
      if (req.file) {
        filename = req.file.filename;
      }

      await newsToUpdate.update({
        titulo,
        description,
        conecxao,
        categoria,
        image1: filename,
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

      if (detailsRecomenda.image1) {
        detailsRecomenda.image1 = files.base64Encode(upload.path + detailsRecomenda.image1);
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
