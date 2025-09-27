const Book = require('../models/Book');

const bookController = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const { kategori, bestSeller, limit = 10, page = 1 } = req.query;
      const query = { active: true };
      
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
  },

  // Get book by ID
  getBookById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book || !book.active) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new book
  createBook: async (req, res) => {
    const book = new Book(req.body);
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update book
  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      Object.assign(book, req.body);
      const updatedBook = await book.save();
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete book (soft delete)
  deleteBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      book.active = false;
      await book.save();
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = bookController;