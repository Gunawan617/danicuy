const express = require('express');
const router = express.Router();
const {
    upload,
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('gambar'), createArticle);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('gambar'), updateArticle);
router.delete('/:id', authMiddleware, adminMiddleware, deleteArticle);

module.exports = router;