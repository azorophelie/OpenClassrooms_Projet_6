const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config({ path: ".env.local" });
const path = require('path');

// Importation des routeurs pour les livres et utilisateurs
const bookRoutes = require('./routes/books'); 
const userRoutes = require('./routes/user');
// Création de l'application express
const app = express();

app.use(express.json());

// Chaîne de connection a la base de MongoDB
const dbConnectionString = process.env.DB_CONNECTION_STRING;
// Connexion a MongoDB
mongoose.connect(dbConnectionString)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée :', err));

// Middleware pour gerer les headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Utilisation des routeurs pour les livres et utilisateurs 
app.use('/api/books', bookRoutes); 
app.use('/api/auth', userRoutes);
// Middleware pour servir les images statiques 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

module.exports = app;
