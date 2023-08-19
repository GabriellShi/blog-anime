const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Temporada = db.define(
  "Temporada",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    titulo: 
    {   type: Sequelize.DataTypes.STRING(150),
        allowNull: false 
    },

    description:
    {   type: Sequelize.DataTypes.TEXT(1000),
        allowNull: false
    },

    conecxao: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    categoria: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    image:
     { type: Sequelize.DataTypes.STRING(500), 
        allowNull: false 
    },

    genero1: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },

      genero2: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },

      genero3: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },

      estreia: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },

      streaming: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
  },

  {
    tableName: "temporada", // Defina o nome da tabela aqui
    timestamps: false,
  }
);

module.exports = Temporada;
