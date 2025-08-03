// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  gen: {type: String, required: true},
  rating: { type: Number, default: 0 },
  imagePath: { type: String, required: false},
});

module.exports = mongoose.model('Book', BookSchema);
