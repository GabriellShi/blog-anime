const Lancamento = require("../models/Lancamento");
const fs = require("fs");
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
        title: "Calendario - Go Geek Animes" ,
        lancamento, 
      });
    },
  
  };
  
  module.exports = calendarioAnimesController;
  