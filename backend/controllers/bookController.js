const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = 'uploads/books/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all books
const getAllBooks = async (req, res) => {
    try {
      const { kategori, bestSeller, limit = 10, page = 1 } = req.query;
      const query = {};
      
      if (kategori) query.kategori = kategori;
      if (bestSeller) query.isBestSeller = bestSeller === 'true';

      const books = await Book.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      const total = await Book.countDocuments(query);

      res.json({
        books,
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get book by ID
const getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Create new book
const createBook = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const gambar = `/${uploadDir}${req.file.filename}`;
        const book = new Book({
            ...req.body,
            gambar
        });
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update book
const updateBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      if (req.file) {
          if (book.gambar) {
              const oldImagePath = path.join(__dirname, '..', book.gambar);
              if (fs.existsSync(oldImagePath)) {
                  fs.unlink(oldImagePath, (err) => {
                      if (err) console.error('Error deleting old image:', err);
                  });
              }
          }
          book.gambar = `/${uploadDir}${req.file.filename}`;
      }

      Object.assign(book, req.body);
      const updatedBook = await book.save();
      res.json(updatedBook);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete book
const deleteBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      if (book.gambar) {
          const imagePath = path.join(__dirname, '..', book.gambar);
          if (fs.existsSync(imagePath)) {
              fs.unlink(imagePath, (err) => {
                  if (err) console.error('Error deleting image:', err);
              });
          }
      }

      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};