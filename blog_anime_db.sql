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
    tipo VARCHAR(150) NOT NULL,
	subtitulo VARCHAR(250) NOT NULL,
	description2 TEXT(1000) NOT NULL,
	image2 VARCHAR(500),
	link_video VARCHAR(250)
);

-- Altera tabela
 -- ALTER TABLE news ADD  image2 VARCHAR(500);
    

-- Insere um ou mais usuário
INSERT INTO news (titulo, description, conecxao, categoria, image)
VALUES 
	("naruto vem ai", "foi anunciado a data", "hNaruto", "novidade", "c81a386493658f2006dc.png"),
    ("Sasuke vem ai", "A data foi anunciado ", "Sasuke", "novidade", "c81a386493658f2006dc.png");


-- Lista todos os usuários
SELECT * FROM news;

-- UPDATE users SET is_admin = 1 WHERE id = 16;

-- Deleta o usuário a partir do id
 -- DELETE FROM news WHERE id = 3;

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


INSERT INTO recomenda (
titulo, titulo2, titulo3, titulo4, titulo5, titulo6, titulo7, titulo8, titulo9, titulo10,
description, description2, description3, description4, description5, description6, description7, description8, description9, description10,
conecxao, categoria, tipo,
image, image2, image3, image4, image5, image6, image7, image8, image9, image10
)
VALUES 
	(
"naruto vem ai 1", "naruto vem ai 2", "naruto vem ai 3", "naruto vem ai 4", "naruto vem ai 5", "naruto vem ai 6", "naruto vem ai 7", "naruto vem ai 8", "naruto vem ai 9", "naruto vem ai 10",
"foi anunciado a data 1", "foi anunciado a data 2", "foi anunciado a data 3", "foi anunciado a data 4", "foi anunciado a data 5", "foi anunciado a data 6", "foi anunciado a data 7", "foi anunciado a data 8", "foi anunciado a data 9", "foi anunciado a data 10",
"hNaruto", "novidade", "anime",
"1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png"
    );



-- Lista todos os usuários
SELECT * FROM recomenda;

 -- DELETE FROM recomenda WHERE id = 3;




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
    image2 VARCHAR(500),
    estreia VARCHAR(100) NOT NULL,
    streaming VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(150) NOT NULL,
    estacao VARCHAR(150) NOT NULL,
    link_video VARCHAR(250)
);

-- Adiciona Coluna
 -- ALTER TABLE temporada ADD link_video VARCHAR(250);

INSERT INTO temporada (
titulo, description, conecxao, categoria, genero1, genero2, genero3, estreia, streaming, image, image2, tipo, estacao
)

VALUES 
	(
"tate no yusha", "na luta pelos mundos", "tate", "temporada", "ação", "aventura", "drama", "2023", "desney", "1d8770ecb20c7c2248e6.png", "1d8770ecb20c7c2248e6.png", "animes", "Verão"
    );

-- Lista todos os usuários
SELECT * FROM temporada;	

  -- DELETE FROM temporada WHERE id = 65;


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
"tate no yusha", "na luta pelos mundos", "tate", "temporada", "ação"
    );

-- Lista todos os usuários
SELECT * FROM lancamento;

--  DELETE FROM lancamento WHERE id = 1;