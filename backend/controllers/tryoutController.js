const TryoutPackage = require('../models/TryoutPackage');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = 'uploads/tryouts/';
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

// Get all tryout packages
const getAllPackages = async (req, res) => {
    try {
      const packages = await TryoutPackage.find();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get tryout package by ID
const getPackageById = async (req, res) => {
    try {
      const package = await TryoutPackage.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(package);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Create new tryout package
const createPackage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const gambar = `/${uploadDir}${req.file.filename}`;
        const newPackage = new TryoutPackage({
            ...req.body,
            gambar
        });
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update tryout package
const updatePackage = async (req, res) => {
    try {
      const package = await TryoutPackage.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      
      if (req.file) {
          if (package.gambar) {
              const oldImagePath = path.join(__dirname, '..', package.gambar);
              if (fs.existsSync(oldImagePath)) {
                  fs.unlink(oldImagePath, (err) => {
                      if (err) console.error('Error deleting old image:', err);
                  });
              }
          }
          package.gambar = `/${uploadDir}${req.file.filename}`;
      }

      Object.assign(package, req.body);
      const updatedPackage = await package.save();
      res.json(updatedPackage);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete tryout package
const deletePackage = async (req, res) => {
    try {
      const package = await TryoutPackage.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      
      if (package.gambar) {
          const imagePath = path.join(__dirname, '..', package.gambar);
          if (fs.existsSync(imagePath)) {
              fs.unlink(imagePath, (err) => {
                  if (err) console.error('Error deleting image:', err);
              });
          }
      }

      await TryoutPackage.findByIdAndDelete(req.params.id);
      res.json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};