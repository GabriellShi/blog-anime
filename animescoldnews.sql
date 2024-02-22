-- DROP DATABASE IF EXISTS animescoldnews;

-- Cria banco de dados
CREATE DATABASE animescoldnews;

-- Seleciona banco de  dados para uso
USE animescoldnews;

-- Cria tabela de usuário
CREATE TABLE news (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    subtitulo VARCHAR(250) NOT NULL,
    description TEXT(1000)  NOT NULL,
    description1 TEXT(1000)  NOT NULL,
    description2 TEXT(1000)  NOT NULL,
    conecxao VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    image2 VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(150) NOT NULL,
    link_video VARCHAR(250) NOT NULL
);

-- Altera tabela
ALTER TABLE news ADD description1 TEXT(1000)  NOT NULL;
  
 -- Apagar Coluna
 
  -- ALTER TABLE news
 -- DROP COLUMN image;

-- Insere um ou mais usuário
INSERT INTO news (titulo, subtitulo, description, description2, conecxao, categoria, image, image2, tipo, link_video)
VALUES 
	("naruto vem ai", "naruto vem ai", "foi anunciado a data", "foi anunciado a data", "Naruto", "novidade",
    "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "animes", "dd");



-- Lista todos os usuários
SELECT * FROM news;

-- UPDATE users SET is_admin = 1 WHERE id = 16;

-- Deleta o usuário a partir do id
 -- DELETE FROM news WHERE id = 54;

-- Atualiza dados de uma linha
-- UPDATE users 
-- SET 
	-- name = "Henrique Atualizado", 
    -- email = "batatinha@email.com",
   --  birthdate = "1800-11-01"
-- WHERE id = 3;






-- Cria tabela de usuário
CREATE TABLE recomenda (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    titulo2 VARCHAR(150) NOT NULL,
    titulo3 VARCHAR(150) NOT NULL,
    titulo4 VARCHAR(150) NOT NULL,
    titulo5 VARCHAR(150) NOT NULL,
    titulo6 VARCHAR(150) NOT NULL,
    titulo7 VARCHAR(150) NOT NULL,
    titulo8 VARCHAR(150) NOT NULL,
    titulo9 VARCHAR(150) NOT NULL,
    titulo10 VARCHAR(150) NOT NULL,
    titulo11 VARCHAR(150) NOT NULL,
    description TEXT(1000)  NOT NULL,
    description1 TEXT(1000)  NOT NULL,
    description2 TEXT(1000)  NOT NULL,
    description3 TEXT(1000)  NOT NULL,
    description4 TEXT(1000)  NOT NULL,
    description5 TEXT(1000)  NOT NULL,
    description6 TEXT(1000)  NOT NULL,
    description7 TEXT(1000)  NOT NULL,
    description8 TEXT(1000)  NOT NULL,
    description9 TEXT(1000)  NOT NULL,
    description10 TEXT(1000)  NOT NULL,
    description11 TEXT(1000)  NOT NULL,
    conecxao VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    image2 VARCHAR(500),
    image3 VARCHAR(500),
    image4 VARCHAR(500),
    image5 VARCHAR(500),
    image6 VARCHAR(500),
    image7 VARCHAR(500),
    image8 VARCHAR(500),
    image9 VARCHAR(500),
    image10 VARCHAR(500),
    image11 VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(150) NOT NULL
);

-- Altera tabela
-- ALTER TABLE recomenda ADD description1 TEXT(1000)  NOT NULL;

INSERT INTO recomenda (
titulo, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10, titulo11,
description, description2, description3, description4, description5, description6, description7, description8, description9, description10, description11,
conecxao, categoria, 
image, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, tipo
)
VALUES 
	(

"naruto vem ai 1", "naruto vem ai2", "naruto vem ai3", "naruto vem ai4", "naruto vem ai", "naruto vem ai", "naruto vem ai", "naruto vem ai", "naruto vem ai", "naruto vem ai", "naruto vem ai",
"sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1", "sinopse 1",
"Naruto", "Recomendação",
"0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", "0b5bd355eb900ff34ade.jpg", 
"animes"  );



-- Lista todos os usuários
SELECT * FROM recomenda;

-- DELETE FROM recomenda WHERE id = 14;




-- Cria tabela de usuário
CREATE TABLE temporada (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    description TEXT(1000)  NOT NULL,
    conecxao VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    genero1 VARCHAR(100) NOT NULL,
    genero2 VARCHAR(100) NOT NULL,
    genero3 VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    estreia VARCHAR(100) NOT NULL,
    streaming VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(150) NOT NULL,
    estacao VARCHAR(100) NOT NULL,
    image2 VARCHAR(500),
    link_video VARCHAR(250) NOT NULL
);

-- Altera tabela
--  ALTER TABLE temporada ADD link_video VARCHAR(250) NOT NULL;
    
INSERT INTO temporada (
titulo, description, conecxao, categoria, genero1, genero2, genero3, image, estreia, streaming, tipo, estacao, image2, link_video
)

VALUES 
	(
"tate no yusha", "na luta pelos mundos", "tate", "temporada", "ação", "aventura", "drama", "0b5bd355eb900ff34ade.jpg", "2023", "disney", "animes",
"verão", "0b5bd355eb900ff34ade.jpg", "ddf"
    );

-- Lista todos os usuários
SELECT * FROM temporada;

-- DELETE FROM temporada WHERE id = 24;


-- Cria tabela de usuário
CREATE TABLE lancamento (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    horario VARCHAR(100) NOT NULL,
    dia VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    streaming VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO lancamento (
titulo, horario, dia, image, streaming
)

VALUES 
	(
"tate no yusha", "08", "domingo", "0b5bd355eb900ff34ade.jpg", "disney"
    );

-- Lista todos os usuários
SELECT * FROM lancamento;

-- DELETE FROM lancamento WHERE id = 154;