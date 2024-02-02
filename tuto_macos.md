
# Installer le projet sous MacOS

Si vous n'avez pas de serveur de base de donnée sur Mac, installer [ DBngin ](https://dbngin.com/) pour créer un serveur MariaDB/MySQL facilement et installer ensuite [ TablePlus ](https://tableplus.com/) afin de gérer plus facilement votre BDD.

Sinon utiliser une base de donnée Docker

## Premiere étape : python/Init.py
A la ligne 6 :

`
conn = mariadb.connect(
user="root",
password="",
host="127.0.0.1",
port=3306,
database="maintenanceapplicative"
)
`

Remplacer le user password host et database par les informations de votre serveurs de base de données. Faite ensuite la même chose dans le fichier python/controller/auth.py

## Deuxieme étape

Rendez-vous dans un terminal dans le dossier python et exécutez les commandes suivantes:

`pip3 install -r requirements.txt`

puis :

` python3 -m flask --debug run`

## Troisième étape

Rendez-vous dans le dossier parc dans un terminal puis exécutez les commandes suivantes:

`chmod +x copy.sh`

et executez le avec :

`./copy.sh`

## Dernière étape

Rendez-vous dans le dossier python et lancer le fichier init.py pour remplir la base de donnée :

`python3 init.py`


## A savoir:

Accès a l'api : http://127.0.0.1:5000/

Lancer le serveur API : dans le dossier python : python3 -m flask --debug run


Accès au site : http://localhost:4200/accueil

Lancer le site : dans le dossier parc : ./copy.sh

