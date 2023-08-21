const Lancamento = require("../models/Lancamento");
const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");

const calendarioAnimesController = {
    // Pode retornar uma página ou não
    calendarioAnimes: async (req, res) => {
      const lancamento = await Lancamento.findAll();

      // Mapeie os URLs completos das imagens
      lancamento.map((detailsLancamento) => {
        if (detailsLancamento.image) {
          detailsLancamento.image = files.base64Encode(
            upload.path + detailsLancamento.image
          );
        }
      });
      return res.render("calendarioAnimes", {
        title: "Pagina de calendarioAnimes" ,
        lancamento, 
      });
    },
  
  };
  
  module.exports = calendarioAnimesController;
  