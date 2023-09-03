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
      const lancamento = await Lancamento.findAll({
        order: [['created_at', 'DESC']]

      });

      return res.render("calendarioAnimes", {
        title: "Calendario" ,
        lancamento, 
      });
    },
  
  };
  
  module.exports = calendarioAnimesController;
  