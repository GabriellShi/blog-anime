const fs = require("fs");
const axios = require('axios');
const express = require("express");
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'testehabil.cnajtz6ttvye.sa-east-1.rds.amazonaws.com',
  user: 'testeHabil',
  password: 'testeHabil',
  database: 'api_moloni_db'
});

connection.connect();

console.log("Rota getAllController atingida");

const getAllController = async () => {
  try {
    let accessToken = 'b21c12f3d68cc72c0d9b8ef0774c41985686e57f';
    const companyId = 158513;

    const apiEndpointURL = 'https://api.moloni.pt/v1/customers/getAll/?access_token=b21c12f3d68cc72c0d9b8ef0774c41985686e57f';
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const payload = {
      'company_id': companyId
    };

    const response = await axios.post(apiEndpointURL, payload, { headers });

    const data = response.data;
    const getAlls = response.data; // A resposta da API já contém os dados desejados

    // Itera sobre os clientes e insere no banco de dados
    for (const getAll of getAlls) {
      await insertGetAll(getAll);
    }

    // Retorna os dados da getAllController
    return getAlls;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function insertGetAll(getAll) {
  console.log('Inserindo cliente no banco de dados:', getAll);

  const selectGetAllSql = `
    SELECT * FROM getAll WHERE customer_id = ?
  `;

  const selectGetAllValues = [getAll.customer_id];

  connection.query(selectGetAllSql, selectGetAllValues, (selectGetAllError, selectGetAllResults, selectGetAllFields) => {
    if (selectGetAllError) {
      console.error(`Erro ao verificar cliente na tabela "getAll" do banco de dados: ${selectGetAllError.message}`);
    } else {
      if (selectGetAllResults.length > 0) {
        // Dados já existem, você pode optar por atualizar os dados ou ignorar
        console.log(`Dados já existem na tabela "getAll" do banco de dados: ${getAll.name}`);
      } else {
        // Dados não existem, proceda com a inserção
        const insertGetAllSql = `
          INSERT INTO getAll (
            customer_id, email, number, contact_email
          )
          VALUES (?, ?, ?, ?)
        `;

        const insertGetAllValues = [
          getAll.customer_id,
          getAll.email,
          getAll.number,
          getAll.contact_email
        ];

        connection.query(insertGetAllSql, insertGetAllValues, (insertGetAllError, insertGetAllResults, insertGetAllFields) => {
          if (insertGetAllError) {
            console.error(`Erro ao inserir dados na tabela "getAll" do banco de dados : ${insertGetAllError.message}`);
          } else {
            console.log(`Dados inseridos na tabela "getAll" do banco de dados: ${getAll.name}`);
          }
        });
      }
    }
  });
}

module.exports = getAllController;
