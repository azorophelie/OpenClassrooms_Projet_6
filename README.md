# Mon Vieux Grimoire - Backend

**Projet 6 de ma formation Développeur Web chez OpenClassrooms 2024**

Ce dépôt contient le code source du backend de l'application de référencement et de notation de livres. 

Ce README vous guidera pour : 
- Installer les dépendances
- Configurer l'environnement
- Lancer le serveur backend
- Comprendre le contexte du projet

---

## Fonctionnalités principales

- Gestion des utilisateurs (inscription, connexion, authentification JWT)
- Gestion des livres et des notes
- Upload et optimisation d’images via Multer et Sharp
- API REST sécurisée pour communiquer avec le frontend
- Structure MVC pour un code maintenable et évolutif

## Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :


- **NODE.JS** 
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


#### Cloner le dépôt : 
```sh
git clone git@github.com:azorophelie/Mon-Vieux-Grimoire.git

cd Mon-Vieux-Grimoire
```

#### 2. Installer le package des dépendances Back End:
Accédez au répertoire du backend et installez les dépendances :

```sh
cd BackEnd
```

```sh
npm install
```
#### ***3. Configuration de la Base de Données***
MongoDB est utilisé dans ce projet pour stocker et gérer les données, telles que les informations sur les livres, les utilisateurs, et les avis.   
La connexion à la base de données est réalisée grâce à Mongoose, un outil permettant de manipuler facilement les données MongoDB à travers un schéma bien défini.
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

#### Lancer le serveur backend
Démarrez le serveur en utilisant nodemon :

```sh
nodemon server
```

Ou, si vous n'avez pas nodemon, utilisez la commande suivante :

```sh
node server
 ```

#### 4. Installer le package des dépendances Front End:
Accédez au répertoire du frontend et installez les dépendances :

```sh
cd FrontEnd
```

```sh
npm install
```

#### Lancer l'application frontend
Démarrez l'application frontend :

```sh
npm start
```
---

## Contexte du projet
- Client : Chaîne de librairies "Le Vieux Grimoire", Lille
- Mission : Développer le backend en Node.js/Express pour gérer les livres, les utilisateurs et les notes.
- Collaboration : Kévin (développeur frontend), Designer pour la maquette
- Contraintes : Optimisation des images pour réduire la taille et améliorer les performances

##### Ressources fournies
- 🎨 [Maquette Figma ](https://www.figma.com/design/Snidyc45xi6qchoOPabMA9/Maquette-Mon-Vieux-Grimoir?node-id=0-1&p=f&t=Fvazw9OZcDC41vf1-0)
- 📝 [Spécifications de l'API](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf)
- 📄 [Spécifications fonctionnelles](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+fonctionnelles.pdf)
- 💻 [Code Front-End](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres)
