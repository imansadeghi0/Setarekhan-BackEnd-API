
const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const book = require('../models/book');

// گرفتن همه کتاب ها
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// گرفتن یدونه کتاب بر اساس ایدی
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error('Book not found');
    res.json(book);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//گرفتن کتاب بر اساس عنوان و نویسنده و ژانر
router.post('/search/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { title: new RegExp(search, 'i') }, 
          { author: new RegExp(search, 'i') },
          { gen: new RegExp(search, 'i') }, 
        ]
      };
    }
    
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  //try {
  //  const book = await Book.find({title : req.body.title});
  //  if (!book){ 
   //   return res.status(405).json({message: "nist khob kos kesh"});
   // }
   // else{
    //  return res.status(200).json(book);
//
  //  }
 // } catch (err) {
  //  res.status(404).json({ message: err.message });
  //}
});

// اضافه کردن کتاب جدید
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
    imagePath: req.body.imagePath,
    gen: req.body.gen,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// اپدیت محتویات کتاب
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error('Book not found');

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.description = req.body.description || book.description;
    book.rating = req.body.description || book.rating;
    book.imagePath = req.body.imagePath || book.imagePath;
    book.gen = req.body.gen || book.gen

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// حذف کتاب
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error('Book not found');

    await book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
