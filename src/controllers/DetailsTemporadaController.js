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

const detailsTemporadaController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const temporada = await Temporada.findAll();

      // Mapeie os URLs completos das imagens
      temporada.map((detailsTemporada) => {
        if (detailsTemporada.image) {
          detailsTemporada.image = files.base64Encode(upload.path + detailsTemporada.image);
        }
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

  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
// show - controlador que irá visualizar os detalhes de cada notícia
// show - controlador que irá visualizar os detalhes de cada notícia
show: async (req, res) => {
  try {
    const { id } = req.params;

    // Busque os detalhes da notícia no banco de dados pelo ID
    const detailsTemporada = await Temporada.findByPk(id);

    if (!detailsTemporada) {
      return res.render("error", {
        title: "Ops!",
        message: "Detalhes da notícia não encontrado",
      });
    }

    // Converte a imagem em base64
    if (detailsTemporada.image) {
      detailsTemporada.image = files.base64Encode(upload.path + detailsTemporada.image);
    }

    return res.render("detailsTemporada", {
      title: "Visualizar notícia",
      temporada: detailsTemporada,
      detailsTemporada,
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
    const { titulo, description, conecxao, categoria, genero1, genero2, genero3, estreia, streaming } = req.body;
    try {
      let filename = "default-image.jpeg";
      if (req.file) {
        filename = req.file.filename;
      }

      const novaNews = await Temporada.create({
        titulo,
        description,
        conecxao,
        categoria,
        genero1, 
        genero2, 
        genero3, 
        estreia, 
        streaming,
        image: filename,
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
  
      // Converte a imagem em base64
      if (detailsTemporada.image) {
        detailsTemporada.image = files.base64Encode(upload.path + detailsTemporada.image);
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
    const { titulo, description, conecxao, categoria, genero1, genero2, genero3, estreia, streaming } = req.body;

    try {
      const newsToUpdate = await Temporada.findByPk(id);

      let filename = newsToUpdate.image;
      if (req.file) {
        filename = req.file.filename;
      }

      await newsToUpdate.update({
        titulo,
        description,
        conecxao,
        categoria,
        genero1, 
        genero2, 
        genero3, 
        estreia, 
        streaming,
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
      const detailsTemporada = await Temporada.findByPk(id);

      if (!detailsTemporada) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      if (detailsTemporada.image) {
        detailsTemporada.image = files.base64Encode(upload.path + detailsTemporada.image);
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
