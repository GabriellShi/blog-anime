require("dotenv").config();
const database = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "fE26H3He41bBFf6BcHEC1dD6AGE4f1Fd",
  database: process.env.DB_DATABASE || "railway",
  host: process.env.DB_HOST || "roundhouse.proxy.rlwy.net",
  dialect: process.env.DB_DIALECT || "mysql",
};

module.exports = database;
