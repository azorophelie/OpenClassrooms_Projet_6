// middleware/auth.js

const jwt = require('jsonwebtoken');
require("dotenv").config();

// Middleware d'authentification
module.exports = (req, res, next) => {
  try {
     // Vérifie si le header Authorization est présent
    if (!req.headers.authorization) return res.status(401).json({ error: 'Requête non authentifiée!' });

    // Récupère le token depuis le header Authorization
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant!' });
    // Vérifie et décode le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Vérifie le token avec la clé secrète
    req.auth = { userId: decodedToken.userId }; // Ajoute l'ID de l'utilisateur décodé à l'objet req.auth
    next();
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée!' });
  }
};
