const Banner = require('../models/Banner');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = 'uploads/banners/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create a new banner
const createBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const imageUrl = `/${uploadDir}${req.file.filename}`;
        
        const banner = new Banner({
            ...req.body,
            image: imageUrl // Corrected field name to 'image'
        });

        const newBanner = await banner.save();
        res.status(201).json(newBanner);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(500).json({ message: 'Error creating banner', error: error.message });
    }
};

// Get all banners
const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banners', error: error.message });
    }
};

// Get a single banner by ID
const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banner', error: error.message });
    }
};

// Update a banner
const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        if (req.file) {
            if (banner.image) {
                const oldImagePath = path.join(__dirname, '..', banner.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.error('Error deleting old image:', err);
                    });
                }
            }
            banner.image = `/${uploadDir}${req.file.filename}`;
        }

        Object.keys(req.body).forEach(key => {
            banner[key] = req.body[key];
        });

        const updatedBanner = await banner.save();
        res.json(updatedBanner);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(500).json({ message: 'Error updating banner', error: error.message });
    }
};

// Delete a banner
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        if (banner.image) {
            const imagePath = path.join(__dirname, '..', banner.image);
             if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error('Error deleting image:', err);
                });
            }
        }

        await Banner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting banner', error: error.message });
    }
};

module.exports = {
    upload,
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};