const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;