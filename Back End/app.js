const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({ path: ".env.local" });

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Middleware pour gérer les en-têtes CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise les requêtes depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorise certains en-têtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autorise certaines méthodes HTTP
    next();
});

// Middleware pour servir les fichiers statiques (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Connexion à la base de données
const dbConnectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbConnectionString)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Connexion à MongoDB échouée :', err));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;
