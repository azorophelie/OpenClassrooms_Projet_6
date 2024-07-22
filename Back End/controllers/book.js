const Book = require('../models/book');
const fs = require('fs');

// Creer un livre 
exports.createBook = (req, res, next) => {
  try {
      const bookObject = JSON.parse(req.body.book);
      delete bookObject._id;
      delete bookObject._userId;

      // Création du livre avec ou sans image
      const book = new Book({
          ...bookObject,
          userId: req.auth.userId,
          imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
      });

      book.save()
          .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
          .catch(error => res.status(400).json({ error }));
  } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
  }
};

 // Récupère un livre spécifique 
exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modifie un livre
// Modifier un livre
exports.modifyBook = (req, res, next) => {
  try {
      const bookObject = req.file ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };

      delete bookObject._userId;

      // Recherche le livre par ID
      Book.findOne({ _id: req.params.id })
          .then(book => {
              if (book.userId != req.auth.userId) {
                  return res.status(401).json({ message: 'Not authorized' });
              } else {
                  Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                      .then(() => res.status(200).json({ message: 'Livre modifié!' }))
                      .catch(error => res.status(400).json({ error }));
              }
          })
          .catch(error => res.status(400).json({ error }));
  } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
  }
};

 // Supprimer un livre 
 exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
      .then(book => {
          if (book.userId != req.auth.userId) {
              return res.status(401).json({ message: 'Not authorized' });
          } else {
              const filename = book.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, (err) => {
                  if (err) return res.status(500).json({ error: 'Failed to delete image' });
                  Book.deleteOne({ _id: req.params.id })
                      .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
                      .catch(error => res.status(400).json({ error }));
              });
          }
      })
      .catch(error => res.status(500).json({ error }));
};

 // Récupère tous les livres
exports.getAllBooks = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
