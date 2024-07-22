const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    grade: { type: Number, min: 1, max: 5, required: true } // Note entre 1 et 5
  }],
  averageRating: { type: Number, default: 0 } // Note moyenne
});

bookSchema.methods.updateAverageRating = function () {
  const sum = this.ratings.reduce((acc, rating) => acc + rating.grade, 0);
  this.averageRating = this.ratings.length ? sum / this.ratings.length : 0;
};

module.exports = mongoose.model('Book', bookSchema);
