const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book'); 

// Route pour obtenir tous les livres
router.get('/', auth, bookCtrl.getAllBooks); // Utilise le middleware d'authentification et la méthode 'getAllBooks' du contrôleur de livres
// Route pour créer un nouveau livre
router.post('/', auth, multer, bookCtrl.createBook); // Utilise le middleware d'authentification, le middleware de gestion des fichiers et la méthode 'createBook' du contrôleur de livres
// Route pour obtenir un livre par son ID
router.get('/:id', auth, bookCtrl.getOneBook); // Utilise le middleware d'authentification et la méthode 'getOneBook' du contrôleur de livres
// Route pour modifier un livre spécifique par son ID
router.put('/:id', auth, multer, bookCtrl.modifyBook); // Utilise le middleware d'authentification, le middleware de gestion des fichiers et la méthode 'modifyBook' du contrôleur de livres
// Route pour supprimer un livre spécifique par son ID
router.delete('/:id', auth, bookCtrl.deleteBook); // Utilise le middleware d'authentification et la méthode 'deleteBook' du contrôleur de livres

module.exports = router;
