INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Silver Star', 'Montagne russe', 3, 1);
INSERT INTO attraction (nom, description, difficulte, visible) VALUES ('Montagne 8', 'Montagne russe', 4, 1);

INSERT INTO users (name, password) VALUES ('toto', 'toto');

INSERT INTO critiques (attraction_id, nom, prenom, texte, note) VALUES
(1, 'Ferroli', 'Anonyme', 'Peu mieux faire', '1'),
(2, 'Baptman', 'SpiderMan', 'Super', '5'),
(1, 'John', 'Doe', 'En vrai pas mal du tout', '3'),
(1, 'Philippe', 'Even', 'J\'ai trouvé super cool', '4');