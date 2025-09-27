const express = require('express');
const router = express.Router();
const bimbelController = require('../controllers/bimbelController');
const authMiddleware = require('../middleware/auth');
const packageUpload = require('../middleware/packageUpload');

// Public routes
router.get('/packages', bimbelController.getAllPackages);
router.get('/packages/:id', bimbelController.getPackageById);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/packages', packageUpload.single('gambar'), bimbelController.createPackage);
router.put('/packages/:id', packageUpload.single('gambar'), bimbelController.updatePackage);
router.delete('/packages/:id', bimbelController.deletePackage);

module.exports = router;