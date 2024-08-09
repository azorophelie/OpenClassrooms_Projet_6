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
## 3. Configuration de la Base de Données
MongoDB est utilisé dans ce projet pour stocker et gérer les données, telles que les informations sur les livres, les utilisateurs, et les avis. La connexion à la base de données est réalisée grâce à Mongoose, un outil permettant de manipuler facilement les données MongoDB à travers un schéma bien défini.
#### Avant de lancer ce projet, assurez vous d'avoir bien configuré votre base de données sur MongoDB en suivant les étapes ci-dessous: 
 Si vous n'avez pas encore de compte MongoDB, inscrivez-vous sur [MongoDB](https://account.mongodb.com/account/register).

1. Après vous être connecté à MongoDB, créez un nouveau cluster. Cela hébergera vos bases de données.
2.  Dans le cluster, créez une base de données en lui donnant un nom (par exemple `mydatabase`).
   
3.Récupérez l'URL de connexion au cluster MongoDB et configurez les variables d'environnement dans le fichier `.env` que vous créez à la racine du projet.
   
#### Variables d'environnement
Configurez les variables d'environnement suivantes dans le fichier `.env` :

```plaintext
DB_PORT=PORT_BackEnd
DB_CONNECTION_STRING=URL_de_connexion_à_MongoDB
JWT_SECRET=Clé_secrète_pour_tokens_JWT
```
* DB_PORT : Remplacez ```PORT_BackEnd``` par le port local sur lequel votre backend sera connecté (par défaut : 4000).
* DB_CONNECTION_STRING : Remplacez ```URL_de_connexion_à_MongoDB``` par l'URL de connexion à votre base de données MongoDB, sous le format :
```mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<mydatabase>?retryWrites=true&w=majority.```
* JWT_SECRET : Remplacez ```Clé_secrète_tokens_JWT``` par une clé secrète de votre choix pour les tokens JWT.

Remplacez les valeurs génériques de l'URL :

- `<username>` par votre nom d'utilisateur MongoDB.
- `<password>` par votre mot de passe MongoDB.
- `<cluster>` par le nom de votre cluster MongoDB.
- `<mydatabase>` par le nom de la base de données que vous avez créée.

### Lancer le serveur backend
Démarrez le serveur en utilisant nodemon :

```nodemon server```

Ou, si vous n'avez pas nodemon, utilisez la commande suivante :

```node server ```

## 4. Installer le package des dépendances Front End:
Accédez au répertoire du frontend et installez les dépendances :

```cd FrontEnd```

```npm install```

### Lancer l'application frontend
Démarrez l'application frontend :

```npm start```

