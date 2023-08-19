const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Recomenda = db.define(
  "Recomenda",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    titulo1: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo2: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo3: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo4: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo5: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo6: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo7: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo8: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo9: { type: Sequelize.DataTypes.STRING(150), allowNull: false },

    titulo10: { type: Sequelize.DataTypes.STRING(150), allowNull: false },



    description1: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description2: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description3: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description4: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description5: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description6: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description7: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description8: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description9: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },

    description10: { type: Sequelize.DataTypes.TEXT(1000), allowNull: false },


    conecxao: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    categoria: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },


    image1: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image2: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image3: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image4: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image5: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image6: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image7: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image8: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image9: { type: Sequelize.DataTypes.STRING(500), allowNull: false },

    image10: { type: Sequelize.DataTypes.STRING(500), allowNull: false },
  },

  {
    tableName: "recomenda", // Defina o nome da tabela aqui
    timestamps: false,
  }
);

module.exports = Recomenda;
