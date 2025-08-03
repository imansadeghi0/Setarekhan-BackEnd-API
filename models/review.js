// models/Review.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: {type:String,required: true},
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);
