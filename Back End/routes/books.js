const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-config'); // Importez les middlewares correctement

const bookCtrl = require('../controllers/book'); 

// Route pour créer un nouveau livre
router.post('/', auth, upload.single('image'), optimizeImage, bookCtrl.createBook); // Utilise le middleware d'authentification, Multer, le middleware d'optimisation des images, et la méthode 'createBook' du contrôleur de livres


// Route pour obtenir tous les livres
router.get('/', bookCtrl.getAllBooks); // Utilise la méthode 'getAllBooks' du contrôleur de livres

// Route pour obtenir un livre par son ID
router.get('/:id', bookCtrl.getOneBook); // Utilise la méthode 'getOneBook' du contrôleur de livres

// Route pour modifier un livre spécifique par son ID
router.put('/:id', auth, upload.single('image'), optimizeImage, bookCtrl.modifyBook); // Utilise le middleware d'authentification, Multer, le middleware d'optimisation des images, et la méthode 'modifyBook' du contrôleur de livres

// Route pour supprimer un livre spécifique par son ID
router.delete('/:id', auth, bookCtrl.deleteBook); // Utilise le middleware d'authentification et la méthode 'deleteBook' du contrôleur de livres

module.exports = router;
