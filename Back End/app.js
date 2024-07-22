const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({ path: ".env.local" });

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Static file serving middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

// Database connection
const dbConnectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Connexion à MongoDB échouée :', err));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;
