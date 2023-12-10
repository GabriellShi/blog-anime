require("dotenv").config();
const database = {
  username: process.env.DB_USERNAME || "admin123",
  password: process.env.DB_PASSWORD || "Naruto67**",
  database: process.env.DB_DATABASE || "animescoldnews",
  host: process.env.DB_HOST || "animescoldnews.cnajtz6ttvye.sa-east-1.rds.amazonaws.com",
  dialect: process.env.DB_DIALECT || "mysql",
};

module.exports = database;
