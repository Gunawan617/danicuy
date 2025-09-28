const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// Register endpoint
router.post('/register', authController.register);
// Login endpoint
router.post('/login', authController.login);
// Get current user profile
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
