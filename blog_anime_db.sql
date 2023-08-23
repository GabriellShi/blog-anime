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
    tipo VARCHAR(150) NOT NULL
);

-- Altera tabela
 -- ALTER TABLE news ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    

-- Insere um ou mais usuário
INSERT INTO news (titulo, description, conecxao, categoria, image, tipo)
VALUES 

('Oshi no Ko – Mães proíbem que seus filhos leiam o mangá', 'Não é de hoje que o anime e mangá de Oshi no Ko causa controvérsias pelo mundo, no entanto a reviravolta dessa vez, uma imagem de um aviso na biblioteca de um centro infantil no Japão, tornando viral nas mídias sociais.  Oshi no Ko – Mães proíbem que seus filhos leiam o mangá Confira:  A imagem publicada mostra um aviso: Infeliz notícia. Recebemos reclamações sobre a presença do mangá “Oshi no Ko” neste centro. A história parece ser projetada para meninos e meninas em idade escolar e acima. Lamentamos não poder fornecer estes livros agora.  A franquia “ Oshi no Ko ” tornou-se o centro das atenções devido às diferentes reações que gerou na comunidade. A série de mangá, escrita por Aka Akasaka e ilustrada por Mengo Yokoyari , conta a história dos filhos renascidos de um ídolo adolescente e apresenta temas complexos e maduros. Embora tenha sido muito bem recebido pelo público adulto, sua presença em uma biblioteca destinada a crianças pequenas gerou debates.', 'Oshi no Ko', 'Novidades', '1c8f4edc5a0af315ae0c.jpg', 'Animes'
);
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
    estreia VARCHAR(100) NOT NULL,
    streaming VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(150) NOT NULL
);

INSERT INTO temporada (
titulo, description, conecxao, categoria, genero1, genero2, genero3, estreia, streaming, image, tipo
)

VALUES 


( 'Hunter x Hunter nova tempora', 'Um rumor corre forte no twitter do usuário @Tsumize, que ao que tudo indica, Hunter x Hunter vai ganhar um novo projeto em anime. De acordo com o vazamento, a Shueisha decidiu em março deste ano a condução e preparativos para o novo anime.  Alerta de Rumor – Hunter x Hunter terá novo anime', 'Hunter x Hunter', 'Temporadas', 'aventura', 'aventura', 'aventura', '392353c51e859ceb25bb.jpe', '2023-08-23', 'Crunchyoul', 'Mangas'
);
-- Lista todos os usuários
SELECT * FROM temporada;

-- DELETE FROM temporada WHERE id = 1;


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