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

console.log("Rota SalesPendingController atingida");

const salesPendingController = async () => {
  try {
    let accessToken = 'b21c12f3d68cc72c0d9b8ef0774c41985686e57f ';
    const companyId = 158513;

    const apiEndpointURL = 'https://api.moloni.pt/v2/SalesPending/getAllByClient/?access_token=b21c12f3d68cc72c0d9b8ef0774c41985686e57f ';
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(apiEndpointURL, { company_id: companyId }, { headers });

    const data = response.data;
    const customers = data.customers;

    // Itera sobre os clientes e insere no banco de dados
    for (const customer of customers) {
      await insertCustomer(customer);
    }

    // Retorna os dados da salesPendingController
    return customers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function insertCustomer(customer) {
  console.log('Inserindo cliente no banco de dados:', customer);

  const selectCustomerSql = `
    SELECT * FROM customers WHERE customer_id = ?
  `;

  const selectCustomerValues = [customer.customer_id];

  connection.query(selectCustomerSql, selectCustomerValues, async (error, customerResults, fields) => {
    if (error) {
      console.error(`Erro ao verificar cliente na tabela "customers" do banco de dados: ${error.message}`);
    } else {
      if (customerResults.length > 0) {
        // Cliente já existe, você pode optar por atualizar os dados ou ignorar
        console.log(`Cliente já existe na tabela "customers" do banco de dados: ${customer.customer.name}`);
      } else {
        // Cliente não existe, proceda com a inserção
        const insertCustomerSql = `
          INSERT INTO customers (
            customer_id, number, name, vat, num_docs, net_value, delay, total_delay, total, pending 
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertCustomerValues = [
          customer.customer_id,
          customer.number,
          customer.customer.name,
          customer.customer.vat,
          customer.num_docs,
          customer.net_value,
          customer.delay,
          customer.total_delay,
          customer.total,
          customer.pending
        ];

        connection.query(insertCustomerSql, insertCustomerValues, (insertCustomerError, insertCustomerResults, insertCustomerFields) => {
          if (insertCustomerError) {
            console.error(`Erro ao inserir cliente na tabela "customers" do banco de dados : ${insertCustomerError.message}`);
          } else {
            console.log(`Cliente inserido na tabela "customers" do banco de dados: ${customer.customer.name}`);
            // Após inserir o cliente, insere os documentos
            insertDocuments(customer);
          }
        });
      }
    }
  });
}

async function insertDocuments(customer) {
  // Verifica se há documentos para o cliente
  if (customer.documents && customer.documents.length > 0) {
    // Itera sobre os documentos e insere na tabela 'documents'
    for (const document of customer.documents) {
      await insertDocument(document, customer.customer_id);
    }
  }
}

async function insertDocument(document, customer_id) {
  console.log('Inserindo documento no banco de dados:', document);

  const selectDocumentSql = `
    SELECT * FROM documents WHERE document_id = ?
  `;

  const selectDocumentValues = [document.document_id];

  connection.query(selectDocumentSql, selectDocumentValues, (selectDocumentError, selectDocumentResults, selectDocumentFields) => {
    if (selectDocumentError) {
      console.error(`Erro ao verificar documento na tabela "documents" do banco de dados: ${selectDocumentError.message}`);
    } else {
      if (selectDocumentResults.length > 0) {
        // Documento já existe, você pode optar por atualizar os dados ou ignorar
        console.log(`Documento já existe na tabela "documents" do banco de dados: ${document.number}`);
      } else {
        // Documento não existe, proceda com a inserção
        const insertDocumentSql = `
          INSERT INTO documents (
            customer_id, delay, document_id, document_type_id, number, date, expiration_date, net_value, pending, customers_id
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertDocumentValues = [
          document.customer_id,
          document.delay,
          document.document_id,
          document.document_type_id,
          document.number,
          document.date,
          document.expiration_date,
          document.net_value,
          document.pending,
          null, // customers_id será atualizado posteriormente com o ID correspondente da tabela 'customers'
        ];

        connection.query(insertDocumentSql, insertDocumentValues, (insertDocumentError, insertDocumentResults, insertDocumentFields) => {
          if (insertDocumentError) {
            console.error(`Erro ao inserir documento na tabela "documents" do banco de dados: ${insertDocumentError.message}`);
          } else {
            console.log(`Documento inserido na tabela "documents" do banco de dados: ${document.number}`);
          }
        });
      }
    }
  });
}

module.exports = salesPendingController;
