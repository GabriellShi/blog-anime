-- apaga o banco de dados
 DROP DATABASE IF EXISTS api_moloni_db;

-- Cria banco de dados
 CREATE DATABASE api_moloni_db;

-- Seleciona banco de  dados para uso
USE api_moloni_db;

-- Cria a tabela de todos clientes
CREATE TABLE getAll (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    number VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100)
);
-- Apagar a Tabela
  --
  -- DROP TABLE IF EXISTS getAll;

SELECT * FROM getAll;


-- Tabela do Resumo dos dados do Cliente Pendente
CREATE TABLE customers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50) NOT NULL,
    number VARCHAR(50),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    contact_email VARCHAR(100),
    vat VARCHAR(50) NOT NULL,
    num_docs VARCHAR(150) NOT NULL,
    net_value VARCHAR(50) NOT NULL,
    delay VARCHAR(200) NOT NULL,
    total_delay VARCHAR(200),
    total VARCHAR(100) NOT NULL,
    pending VARCHAR(100) NOT NULL
);


-- Adiciona a coluna email à tabela customers
-- ALTER TABLE customers
-- ADD COLUMN email VARCHAR(100);


-- Apagar a Tabela
--  DROP TABLE IF EXISTS customers;

-- Atualiza a tabela customers - coluna email com dados de getAll
UPDATE customers
JOIN getAll ON customers.customer_id = getAll.customer_id
SET customers.email = getAll.email;


-- Atualiza a tabela customers  - coluna number com dados de getAll
UPDATE customers
JOIN getAll ON customers.customer_id = getAll.customer_id
SET customers.number = getAll.number;


SELECT * FROM customers;	


-- Cria tabela dos Detalhes das Faturas
CREATE TABLE documents (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50) NOT NULL,
    delay VARCHAR(50) NOT NULL,
    document_id VARCHAR(50) NOT NULL,
    document_type_id VARCHAR(150) NOT NULL,
    number VARCHAR(50) NOT NULL,
    date VARCHAR(150) NOT NULL,
    expiration_date VARCHAR(50) NOT NULL,
    net_value VARCHAR(100) NOT NULL,
    pending VARCHAR(100) NOT NULL,
    customers_id INT UNSIGNED,
    FOREIGN KEY (customers_id) REFERENCES customers(id)
);


-- Atualiza a tabela customers - coluna email com dados de getAll
UPDATE documents
JOIN customers ON documents.customer_id = customers.customer_id
SET documents.customer_id = customers.customer_id;

-- Apaga as linhas de uma tabela
-- DELETE FROM documents WHERE id BETWEEN 70 AND 104;


-- Apagar a Tabela
--  DROP TABLE IF EXISTS documents;

SELECT * FROM documents;






