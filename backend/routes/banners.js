const express = require('express');
const router = express.Router();
const {
    upload,
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
} = require('../controllers/bannerController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', getAllBanners);
router.get('/:id', getBannerById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createBanner);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateBanner);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBanner);

module.exports = router;
