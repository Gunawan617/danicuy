const express = require('express');
const router = express.Router();
const tryoutController = require('../controllers/tryoutController');
const authMiddleware = require('../middleware/auth');
const packageUpload = require('../middleware/packageUpload');

// Public routes
router.get('/packages', tryoutController.getAllPackages);
router.get('/packages/:id', tryoutController.getPackageById);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/packages', packageUpload.single('gambar'), tryoutController.createPackage);
router.put('/packages/:id', packageUpload.single('gambar'), tryoutController.updatePackage);
router.delete('/packages/:id', tryoutController.deletePackage);

module.exports = router;