const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const News = db.define(
  "News",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: Sequelize.DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT(1000),
      allowNull: false,
    },
    conecxao: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    categoria: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    tipo: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    image: {
      type: Sequelize.DataTypes.STRING(500),
      allowNull: false,

    },

    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Define o valor padrão como a data e hora atual
    },

  },

  {
    tableName: "news", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = News;
