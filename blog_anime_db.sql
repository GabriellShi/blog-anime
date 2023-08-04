DROP DATABASE IF EXISTS blog_anime_db;

-- Cria banco de dados
CREATE DATABASE blog_anime_db;

-- Seleciona banco de  dados para uso
USE blog_anime_db;

-- Cria tabela de usuário
CREATE TABLE news (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    description TEXT(1000)  NOT NULL,
    conecxao VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

);

-- Altera tabela
-- ALTER TABLE users ADD is_admin TINYINT DEFAULT 0;
    

-- Insere um ou mais usuário
INSERT INTO news (titulo, description, conecxao, categoria, image)
VALUES 
	("naruto vem ai", "foi anunciado a data", "hNaruto", "novidade", "c81a386493658f2006dc.png");


-- Lista todos os usuários
SELECT * FROM news;

-- UPDATE users SET is_admin = 1 WHERE id = 16;

-- Deleta o usuário a partir do id
-- DELETE FROM users WHERE id = 1;

-- Atualiza dados de uma linha
-- UPDATE users 
-- SET 
	-- name = "Henrique Atualizado", 
    -- email = "batatinha@email.com",
   --  birthdate = "1800-11-01"
-- WHERE id = 3;
