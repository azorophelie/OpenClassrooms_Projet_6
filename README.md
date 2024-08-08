# Mon Vieux Grimoire - Backend

Bienvenue dans le projet Mon Vieux Grimoire ! Ce dépôt contient le code source du backend de l'application de référencement et de notation de livres. Ce README vous guidera à travers l'installation des dépendances nécessaires, la configuration de votre environnement de développement, et les étapes pour lancer l'application.

## Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :


- **NODE.JS** (version 14.x ou plus récente)
- **NPM** ou **YARN** (NPM est installé par défaut avec Node.js)
- **MONGODB** (version 4.x ou plus récente)
- Un IDE ou éditeur de texte tel que **VS Code**

![Node.js](https://img.shields.io/badge/NODE.JS-blue?style=flat-square)
![npm](https://img.shields.io/badge/NPM-grey)
![bcrypt](https://img.shields.io/badge/BCRYPT-black)
![express.js](https://img.shields.io/badge/EXPRESS.JS-darkgreen)
![jsonwebtoken](https://img.shields.io/badge/JSONWEBTOKEN-red)

![mongoose](https://img.shields.io/badge/MONGOOSE-blue)
![multer](https://img.shields.io/badge/MULTER-grey)
![nodemon](https://img.shields.io/badge/NODEMON-black)
![sharp](https://img.shields.io/badge/SHARP-darkgreen)
![cors](https://img.shields.io/badge/CORS-red)
![dotenv](https://img.shields.io/badge/DOTENV-blue)








## 1. Installation

Suivez les étapes ci dessous pour installer et configurer le projet:

#### Clonez le dépôt : 
git clone ```https://github.com/azorophelie/OpenClassrooms_Projet_6.git```

#### Naviguez vers le répertoire du projet cloné :
```cd OpenClassrooms_Projet_6```

## 2. Installer le package des dépendances Back End:
Accédez au répertoire du backend et installez les dépendances :

```cd BackEnd```

```npm install```

### Lancer le serveur backend
Démarrez le serveur en utilisant nodemon :

```nodemon server```

Ou, si vous n'avez pas nodemon, utilisez la commande suivante :

```node server ```

## 3. Installer le package des dépendances Front End:
Accédez au répertoire du frontend et installez les dépendances :

```cd FrontEnd```

```npm install```

### Lancer l'application frontend
Démarrez l'application frontend :

```npm start```

## Utilisation de MongoDB
MongoDB est utilisé dans ce projet pour stocker et gérer les données, telles que les informations sur les livres, les utilisateurs, et les avis. La connexion à la base de données est réalisée grâce à Mongoose, un outil permettant de manipuler facilement les données MongoDB à travers un schéma bien défini.

Connexion à MongoDB
La connexion à MongoDB se fait via une URL définie dans le fichier .env.

Si vous n'avez pas encore de compte MongoDB, vous pouvez en créer un en suivant [ce lien](https://account.mongodb.com/account/login?_ga=2.256941059.947447953.1723121308-1757398436.1720363383)
