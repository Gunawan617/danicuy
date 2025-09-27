const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', faqController.getAllFaqs);
router.get('/:id', faqController.getFaqById);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/', faqController.createFaq);
router.put('/:id', faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

module.exports = router;