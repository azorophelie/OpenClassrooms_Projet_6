const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String },
  userId: { type: String, required: true },
  ratings: [{
    userId: { type: String, required: true },
    grade: { type: Number, min: 1, max: 5, required: true }
  }],
  averageRating: { type: Number, default: 0 }
});

bookSchema.methods.updateAverageRating = function () {
  const sum = this.ratings.reduce((acc, rating) => acc + rating.grade, 0);
  this.averageRating = this.ratings.length ? sum / this.ratings.length : 0;
};

module.exports = mongoose.model('Book', bookSchema);
