const Book = require('../models/book');
const fs = require('fs');

exports.createBook = (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    });

    book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
      .catch(error => res.status(400).json({ error: error.message }));
  } catch (error) {
    res.status(400).json({ error: 'Données invalides' });
  }
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Livre non trouvé!' });
      res.status(200).json(book);
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;

  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Livre non trouvé!' });
      if (book.userId !== req.auth.userId) return res.status(401).json({ message: 'Non autorisé' });

      Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => {
          if (req.file && book.imageUrl) {
            const imagePath = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${imagePath}`, err => {
              if (err) console.error(`Erreur lors de la suppression de l'image: ${err.message}`);
            });
          }
          res.status(200).json({ message: 'Livre modifié!' });
        })
        .catch(error => res.status(400).json({ error: `Erreur de mise à jour: ${error.message}` }));
    })
    .catch(error => res.status(500).json({ error: `Erreur lors de la recherche: ${error.message}` }));
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Livre non trouvé!' });
      if (book.userId !== req.auth.userId) return res.status(401).json({ message: 'Non autorisé' });

      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, err => {
        if (err) {
          console.error(`Erreur lors de la suppression de l'image: ${err.message}`);
          return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
        }

        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé' }))
          .catch(error => res.status(400).json({ error: `Erreur lors de la suppression du livre: ${error.message}` }));
      });
    })
    .catch(error => res.status(500).json({ error: `Erreur lors de la recherche du livre: ${error.message}` }));
};

exports.rateBook = (req, res, next) => {
  const userId = req.auth.userId;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) return res.status(400).json({ message: "La note doit être comprise entre 1 et 5." });

  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (!book) return res.status(404).json({ message: "Livre non trouvé!" });

      const existingRatingIndex = book.ratings.findIndex(r => r.userId.toString() === userId);
      if (existingRatingIndex > -1) return res.status(400).json({ message: "L'utilisateur a déjà noté ce livre" });

      book.ratings.push({ userId, grade: rating });

      const totalGrade = book.ratings.reduce((accumulator, currentValue) => accumulator + currentValue.grade, 0);
      book.averageRating = parseFloat((totalGrade / book.ratings.length).toFixed(1));

      book.save()
        .then(() => res.status(200).json({ message: 'Note mise à jour avec succès', averageRating: book.averageRating }))
        .catch(error => res.status(500).json({ error: 'Erreur lors de la sauvegarde de la note' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur lors de la recherche du livre' }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.bestRatings = (req, res, next) => {
  console.log('Fetching best rated books');
  Book.find()
  .sort({ averageRating: -1 }).limit(5)
  .limit(3)
    .then(books => {
      console.log('Books fetched successfully', books);
      res.status(200).json(books);
    })
    .catch(error => {
      console.error('Error fetching best rated books', error);
      res.status(500).json({ error: error.message });
    });
};