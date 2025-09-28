const express = require('express');
const router = express.Router();
const {
    getAllFaqs,
    getFaqById,
    createFaq,
    updateFaq,
    deleteFaq
} = require('../controllers/faqController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', getAllFaqs);
router.get('/:id', getFaqById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, createFaq);
router.put('/:id', authMiddleware, adminMiddleware, updateFaq);
router.delete('/:id', authMiddleware, adminMiddleware, deleteFaq);

module.exports = router;