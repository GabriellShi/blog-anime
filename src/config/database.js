require("dotenv").config();
const database = {
  username: process.env.DB_USERNAME || "bf258360bce196",
  password: process.env.DB_PASSWORD || "393a56bb",
  database: process.env.DB_DATABASE || "heroku_b3f2aa2d4c4e128",
  host: process.env.DB_HOST || "us-cdbr-east-06.cleardb.net",
  dialect: process.env.DB_DIALECT || "mysql",
};

module.exports = database;
