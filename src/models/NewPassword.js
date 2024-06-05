const Sequelize = require("sequelize");
const db = require("../config/sequelize");

const NewPassword = db.define(
  "NewPassword",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    codigo: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    expires_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "newPassword",
    timestamps: false,
  }
);

module.exports = NewPassword;
