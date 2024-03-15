DROP TABLE IF EXISTS critiques;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS attraction;


CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);


CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);


CREATE TABLE critiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attraction_id INT NOT NULL,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    texte TEXT NOT NULL,
    note VARCHAR(255) NOT NULL,
    FOREIGN KEY (attraction_id) REFERENCES attraction(attraction_id)
);