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
      // Não permite valor nulo
      // Por padrão ele permite nulo
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
    image: {
      type: Sequelize.DataTypes.STRING(500),
    },
    is_active: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    },


  },

);



module.exports = News;  