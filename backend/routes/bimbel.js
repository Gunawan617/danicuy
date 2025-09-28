const express = require('express');
const router = express.Router();
const {
    upload,
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/bimbelController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', getAllPackages);
router.get('/:id', getPackageById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('gambar'), createPackage);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('gambar'), updatePackage);
router.delete('/:id', authMiddleware, adminMiddleware, deletePackage);

module.exports = router;