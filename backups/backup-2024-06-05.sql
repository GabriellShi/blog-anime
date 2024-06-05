/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: lancamento
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `lancamento` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `dia` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `streaming` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: newpassword
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `newpassword` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `newpassword_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: news
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `description1` text NOT NULL,
  `description2` text NOT NULL,
  `conecxao` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `image2` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(150) NOT NULL,
  `link_video` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: recomenda
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `recomenda` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `titulo2` varchar(150) NOT NULL,
  `titulo3` varchar(150) NOT NULL,
  `titulo4` varchar(150) NOT NULL,
  `titulo5` varchar(150) NOT NULL,
  `titulo6` varchar(150) NOT NULL,
  `titulo7` varchar(150) NOT NULL,
  `titulo8` varchar(150) NOT NULL,
  `titulo9` varchar(150) NOT NULL,
  `titulo10` varchar(150) NOT NULL,
  `titulo11` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `description1` text NOT NULL,
  `description2` text NOT NULL,
  `description3` text NOT NULL,
  `description4` text NOT NULL,
  `description5` text NOT NULL,
  `description6` text NOT NULL,
  `description7` text NOT NULL,
  `description8` text NOT NULL,
  `description9` text NOT NULL,
  `description10` text NOT NULL,
  `description11` text NOT NULL,
  `conecxao` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `image2` varchar(500) DEFAULT NULL,
  `image3` varchar(500) DEFAULT NULL,
  `image4` varchar(500) DEFAULT NULL,
  `image5` varchar(500) DEFAULT NULL,
  `image6` varchar(500) DEFAULT NULL,
  `image7` varchar(500) DEFAULT NULL,
  `image8` varchar(500) DEFAULT NULL,
  `image9` varchar(500) DEFAULT NULL,
  `image10` varchar(500) DEFAULT NULL,
  `image11` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: temporada
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `temporada` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `conecxao` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `genero1` varchar(100) NOT NULL,
  `genero2` varchar(100) NOT NULL,
  `genero3` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `estreia` varchar(100) NOT NULL,
  `streaming` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(150) NOT NULL,
  `estacao` varchar(100) NOT NULL,
  `image2` varchar(500) DEFAULT NULL,
  `link_video` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  `is_admin` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: lancamento
# ------------------------------------------------------------

INSERT INTO
  `lancamento` (
    `id`,
    `titulo`,
    `horario`,
    `dia`,
    `image`,
    `streaming`,
    `created_at`
  )
VALUES
  (
    1,
    'tate no yusha',
    '08',
    'domingo',
    '0b5bd355eb900ff34ade.jpg',
    'disney',
    '2024-05-23 22:49:16'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: newpassword
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: news
# ------------------------------------------------------------

INSERT INTO
  `news` (
    `id`,
    `titulo`,
    `subtitulo`,
    `description`,
    `description1`,
    `description2`,
    `conecxao`,
    `categoria`,
    `image`,
    `image2`,
    `created_at`,
    `tipo`,
    `link_video`
  )
VALUES
  (
    1,
    'naruto vem ai',
    'naruto vem ai',
    'foi anunciado a data',
    'foi anunciado a data',
    'foi anunciado a data',
    'Naruto',
    'novidade',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '2024-05-23 22:49:16',
    'animes',
    'dd'
  );
INSERT INTO
  `news` (
    `id`,
    `titulo`,
    `subtitulo`,
    `description`,
    `description1`,
    `description2`,
    `conecxao`,
    `categoria`,
    `image`,
    `image2`,
    `created_at`,
    `tipo`,
    `link_video`
  )
VALUES
  (
    2,
    'naruto vem ai',
    'naruto vem ai',
    'foi anunciado a data',
    'foi anunciado a data',
    'foi anunciado a data',
    'Naruto',
    'novidade',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '2024-05-24 00:12:21',
    'animes',
    'dd'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: recomenda
# ------------------------------------------------------------

INSERT INTO
  `recomenda` (
    `id`,
    `titulo`,
    `titulo2`,
    `titulo3`,
    `titulo4`,
    `titulo5`,
    `titulo6`,
    `titulo7`,
    `titulo8`,
    `titulo9`,
    `titulo10`,
    `titulo11`,
    `description`,
    `description1`,
    `description2`,
    `description3`,
    `description4`,
    `description5`,
    `description6`,
    `description7`,
    `description8`,
    `description9`,
    `description10`,
    `description11`,
    `conecxao`,
    `categoria`,
    `image`,
    `image2`,
    `image3`,
    `image4`,
    `image5`,
    `image6`,
    `image7`,
    `image8`,
    `image9`,
    `image10`,
    `image11`,
    `created_at`,
    `tipo`
  )
VALUES
  (
    1,
    'naruto vem ai 1',
    'naruto vem ai2',
    'naruto vem ai3',
    'naruto vem ai4',
    'naruto vem ai',
    'naruto vem ai',
    'naruto vem ai',
    'naruto vem ai',
    'naruto vem ai',
    'naruto vem ai',
    'naruto vem ai',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'sinopse 1',
    'Naruto',
    'Recomendação',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '0b5bd355eb900ff34ade.jpg',
    '2024-05-23 22:49:16',
    'animes'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: temporada
# ------------------------------------------------------------

INSERT INTO
  `temporada` (
    `id`,
    `titulo`,
    `description`,
    `conecxao`,
    `categoria`,
    `genero1`,
    `genero2`,
    `genero3`,
    `image`,
    `estreia`,
    `streaming`,
    `created_at`,
    `tipo`,
    `estacao`,
    `image2`,
    `link_video`
  )
VALUES
  (
    1,
    'tate no yusha',
    'na luta pelos mundos',
    'tate',
    'temporada',
    'ação',
    'aventura',
    'drama',
    '0b5bd355eb900ff34ade.jpg',
    '2023',
    'disney',
    '2024-05-23 22:49:16',
    'animes',
    'verão',
    '0b5bd355eb900ff34ade.jpg',
    'ddf'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `nome`,
    `email`,
    `senha`,
    `is_active`,
    `is_admin`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Leticia',
    'lett@gmail.com',
    '123456',
    1,
    1,
    '2024-06-05 13:45:33',
    '2024-06-05 13:45:33'
  );
INSERT INTO
  `users` (
    `id`,
    `nome`,
    `email`,
    `senha`,
    `is_active`,
    `is_admin`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'Gabriel',
    'gabrieloliveirasantos196@gmail.com',
    'Tanjiro67**##/',
    1,
    1,
    '2024-06-05 14:34:25',
    '2024-06-05 18:00:30'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
