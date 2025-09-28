const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// Register endpoint
router.post('/register', authController.register);
// Login endpoint
router.post('/login', authController.login);
// Debug endpoint
router.post('/debug', (req, res) => {
	res.json({ message: 'Auth debug route working' });
});
// Get current user profile
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
