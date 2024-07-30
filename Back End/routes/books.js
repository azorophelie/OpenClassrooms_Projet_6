// routes/books.js

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');

// Route pour créer un nouveau livre
router.post('/', auth, upload.single('image'), optimizeImage, bookCtrl.createBook);
// Route pour modifier un livre spécifique par son ID
router.put('/:id', auth, upload.single('image'), optimizeImage, bookCtrl.modifyBook);
// Route pour supprimer un livre spécifique par son ID
router.delete('/:id', auth, bookCtrl.deleteBook);
// Route pour obtenir les livres avec les meilleures notes
router.get('/bestrating', bookCtrl.bestRatings);
// Route pour obtenir un livre par son ID
router.get('/:id', bookCtrl.getOneBook);
// Route pour obtenir tous les livres
router.get('/', bookCtrl.getAllBooks);
// Route pour l'ajout d'une note à un livre
router.post("/:id/rating", auth, bookCtrl.rateBook);

module.exports = router;
