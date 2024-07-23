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
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `dia` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `streaming` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: newPassword
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `newPassword` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `newPassword_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: news
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `news` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `description1` text NOT NULL,
  `description2` text NOT NULL,
  `conecxao` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `image2` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(150) NOT NULL,
  `link_video` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: recomenda
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `recomenda` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: temporada
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `temporada` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(150) NOT NULL,
  `estacao` varchar(100) NOT NULL,
  `image2` varchar(500) DEFAULT NULL,
  `link_video` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_admin` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
    '2024-02-22 21:47:10'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: newPassword
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
    2,
    'NieR: Automata – 2º parte do Anime ganha visual e estreia ainda esse ano',
    '',
    '<p><strong>A imagem trás em destaque a protagonista, além de revelar que o anime deve estrear em algum momento desse ano.</strong></p>',
    'O site oficial da adaptação em anime de NieR: Automata liberou um visual para a 2º parte da obra.',
    '<p><strong>A história se passa em um futuro onde a humanidade foi obrigada a abandonar a Terra por conta da invasão de máquinas vinda de outro mundo. Como forma de defesa, androides especializados em combates foram criados para tentar retomar o planeta.</strong></p><p>&nbsp;</p><p><strong>O enredo segue 2B e 9S, dois androides que acabam se envolvendo em situações inesperadas, desenterrando evento do passado e da origem das máquinas que deveriam permanecer ocultos.</strong></p>',
    'NieR: Automata',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/27-02/NieR%20Automata%20%E2%80%93%202%C2%BA%20parte%20img1%2027-02.png',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/27-02/NieR%20Automata%20%E2%80%93%202%C2%BA%20parte%20img2%2027-02.png',
    '2024-02-27 23:11:37',
    'Animes',
    ''
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
    3,
    'Maou Gakuin – 2º parte da 2º temporada ganha trailer com OP e data de estreia',
    '',
    '<p><strong>O vídeo trás detalhes da história e dos personagens, além de dar uma prévia da abertura “Maou”, cantada por BURNOUT SYNDROMES.</strong></p><p>&nbsp;</p><p><strong>O anime tem previsão de estreia para o dia 12 de abril.</strong></p>',
    'O site oficial da adaptação em anime de Maou Gakuin no Futekigousha ~Shijou Saikyou no Maou no Shiso-tachi, Tensei Shite Shison-tachi no Gakkou e Kayou (The Misfit of Demon King Academy: History’s Strongest Demon King Reincarnates and Goes to School with His Descendants) liberou um novo trailer para a 2º parte da 2º temporada.',
    '<p><strong>A história acompanha o rei demônio Anos, que após vários séculos semeando caos e destruição, decide que quer ter uma vida mais calma na sua próxima encarnação. Por conta desse desejo, ele acaba reencarnado 2 mil anos depois, junto de seus servos, em uma escola de magia. O problema, no entanto, é que o mundo parece ter sido distorcido, e ninguém se lembra e Anos, ou do quão poderoso ele é.</strong></p>',
    'Maou Gakuin',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/27-02/Maou%20Gakuin%20%E2%80%93%202%C2%BA%20parte%20%20img1%2027-02.png',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/27-02/Maou%20Gakuin%20%E2%80%93%202%C2%BA%20parte%20%20img2%2027-02.png',
    '2024-02-27 23:11:54',
    'Animes',
    'Suk6N56VDMQ'
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
    4,
    'SAO Gun Gale – 2º temporada ganha visual, janela de estreia e confirma volta da staff',
    '',
    '<p><strong>A imagem trás em destaque alguns dos personagens principais, além de confirmar a volta da staff da 1º temporada e o anime deve estrear ainda esse ano.</strong></p>',
    'A conta oficial no twitter de Sword Art Online Alternative: Gun Gale Online liberou um novo visual para a 2º temporada da obra.',
    '<p><strong>A história acompanha Karen Kohiruimaki, uma garota de 1,83m de altura, bastante insegura na escola devido à atenção que chama por seu tamanho, e que é ruim em lidar com as pessoas no mundo real.</strong></p><p>&nbsp;</p><p><strong>Ela acaba entrando em um mundo de realidade virtual chamado Guns Gale Online, com um avatar de apenas 1,50m de altura, e roupa rosa. Lá ela conhece uma garota morena e as duas começam a se dar bem dentro do jogo. Mas um dia a garota a chama para participar da ‘Squad Jam’, um battle royal de times dentro do jogo.</strong></p>',
    'SAO Gun Gale',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/27-02/SAO%20Gun%20Gale%20%E2%80%93%202%C2%BA%20temporada%20img1%2027-02.png',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/27-02/SAO%20Gun%20Gale%20%E2%80%93%202%C2%BA%20temporada%20img2%2027-02.png',
    '2024-02-27 23:12:12',
    'Animes',
    ''
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
    5,
    'Kaii to Otome – Anime de mistério sobrenatural ganha trailer com OP e ED e data de estreia',
    '',
    '<p><strong>O vídeo trás detalhes da história e dos personagens, além de dar uma prévia da abertura “Hazard Symbol”, cantada por Yuyu, e do encerramento “Shuku Somete Shinzou”, cantado por Nonoka Oobuchi.</strong></p><p>&nbsp;</p><p><strong>O anime tem previsão de estreia para o dia 10 de abril.</strong></p><p><br>&nbsp;</p>',
    'O site oficial da adaptação em anime de Kaii to Otome to Kamikakushi (Mysteries, Maidens, And Mysterious Disappearances) liberou um novo trailer para a obra.',
    '<p><strong>A história acompanha Sumireko Ogawa, uma aspirante a escritora que ama mistérios e trabalha em uma livraria junto de um garoto chamado Ren Adashino.</strong></p><p><strong>Junto os dois acabam se envolvendo em estranhos mistérios que rodeiam a cidade, descobrindo segredos estranhos e um mundo sobrenatural que muitos não conhecem.</strong></p>',
    'Kaii to Otome',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/29-02/Kaii%20to%20Otome%2027-02%20img1.png',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/29-02/Kaii%20to%20Otome%2027-02%20img2.png',
    '2024-02-29 20:40:57',
    'Animes',
    'fWrAVCixX7k'
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
    6,
    'Re:Monster – Isekai sobre garoto reencarnado em Goblin ganha visual e data de estreia',
    '',
    '<p><strong>A imagem trás em destaque alguns dos personagens principais, além de confirmar a estreia da obra para o dia 4 de abril.</strong></p><p><br>&nbsp;</p><p>&nbsp;</p>',
    'O site oficial da adaptação em anime de Re:Monster liberou um novo visual para a obra.',
    '<p><strong>A história acompanha Tomokui Kanata, um jovem que teve uma morte prematura e acabou sendo reencarnado em um mundo de fantasia. Entretanto, ao invés de voltar como um humano ele acabou se tornou um goblin.</strong></p><p>&nbsp;</p><p><strong>Para sobreviver ao novo mundo, Tomokui assumiu o nome de Rou e passou a consumir e derrotar várias criaturas, absorvendo seus poderes e se tornando cada vez mais poderoso.</strong></p>',
    'Re:Monster',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/29-02/Re%20Monster%2027-02%20img1.png',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/29-02/Re%20Monster%2027-02%20img2.png',
    '2024-02-29 20:43:09',
    'Animes',
    ''
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
    7,
    ' One Punch Man – 3º temporada ganha 1º trailer e confirma retorno da staff da temporada passada',
    ' ',
    '<p>O vídeo trás algumas cenas da obra, além de confirmar o retorno da staff da 2º temporada. O anime ainda não tem previsão de estreia.</p>',
    'O site oficial da adaptação em anime de One Punch Man liberou o 1º trailer para a 3º temporada da obra.',
    '<p>A história acompanha Saitama, um homem que decidiu se tornar um herói, mas acabou ficou tão forte que passou a derrotar todos os seus oponentes com um único soco. Depois disso, Saitama começou a viver desmotivado, até que encontra Genos, um poderoso ciborgue que pede para ser seu discípulo, e o motiva a tentar subir sua popularidade dentro da Associação de Heróis.</p>',
    ' One Punch Man',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/06-03/One%20Punch%20Man%20%E2%80%93%203%C2%BA%20temporada%2006-03%20img1.png',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/06-03/IMG-20240321-WA0018.jpg',
    '2024-03-21 20:40:20',
    'Animes',
    'h71d0QyZqRE'
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
    8,
    ' KonoSuba – 3º temporada ganha trailer com OP e ED e data de estreia',
    ' ',
    '<p>O vídeo trás algumas cenas do anime, além de dar uma prévia da abertura “Growing Up”, cantada por Machiko, e do encerramento “Ano Hi no Mama no Bokura”, cantado pelas 3 dubladoras principais. O anime tem previsão de estreia para o dia 10 de abril.</p>',
    'O site oficial da adaptação em anime de KonoSuba liberou um novo trailer para a 3º temporada da obra.',
    '<p>A história acompanha Kazuma, um jovem que morre de forma humilhante após tentar salvar uma garota. Ele recebe a oportunidade de reencarnar em um novo mundo, decidindo levar a Deusa que debochou dele como “arma”. Porém, para sua surpresa, a Deusa é completamente inútil, tornando a vida de Kazuma mais complicada do que ele gostaria.</p>',
    ' KonoSuba ',
    'Novidades',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/06-03/IMG-20240321-WA0013.jpg',
    'https://bloggeek.b-cdn.net/2024/NOVIDADES/06-03/IMG-20240321-WA0020.jpg',
    '2024-03-21 20:43:11',
    'Animes',
    'Meo3mO98huE'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: recomenda
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: temporada
# ------------------------------------------------------------


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
    'Gabriel',
    'gabrieloliveirasantos196@gmail.com',
    'Tanjiro67**##/',
    1,
    1,
    '2024-06-05 20:25:59',
    '2024-06-05 20:25:59'
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
    'leticia',
    'leticia2011@hotmail.com.br',
    'Gordos2@',
    1,
    1,
    '2024-06-15 17:23:28',
    '2024-06-15 17:23:28'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
