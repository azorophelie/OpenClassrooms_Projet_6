//controllers/user.js
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Fonction de validation de l'email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Inscription
exports.signup = (req, res, next) => {
  const { email, password } = req.body; // Récupère l'email et le mot de passe du corps de la requête

  // Vérifie si l'email est valide
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email invalide !' });
  }

   // Hachage du mot de passe
  bcrypt.hash(password, 10)
    .then(hash => {
      // Création d'un nouvel utilisateur avec l'email et le mot de passe haché
      const user = new User({ email, password: hash });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur.' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur serveur lors de l\'hachage du mot de passe.' }));
};

// Connexion
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Recherche de l'utilisateur par email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Adresse email non trouvée !' });
      }
      // Comparaison du mot de passe saisi avec le mot de passe haché stocké
      bcrypt.compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // Réponse avec l'ID de l'utilisateur et un token JWT signé
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
          });
        })
        .catch(error => res.status(500).json({ error: 'Erreur serveur lors de la comparaison du mot de passe.' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur serveur lors de la recherche de l\'utilisateur.' }));
};
