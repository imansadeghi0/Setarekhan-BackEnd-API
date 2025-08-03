
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Book = require('../models/book');

// گرفتن همه نظرات کتاب ها
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// اضافه کردن نظر جدید
router.post('/r', async (req, res) => {
  const review = new Review({
    userName: req.body.userName,
    bookId: req.body.bookId,
    review: req.body.review,
    rating: req.body.rating,
  });

  try {
    const newReview = await review.save();
    
    // تغییر امتیاز هر کتاب بعد از نظر جدید
    const book = await Book.findById(req.body.bookId);
    if (book) {
      const reviews = await Review.find({ bookId: req.body.bookId });
      const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
      book.rating = avgRating;
      await book.save();
    }

    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message + res.statusCode});
  }
});

module.exports = router;
