const express = require('express');
const router = express.Router();
const {
    upload,
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('gambar'), createBook);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('gambar'), updateBook);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

module.exports = router;