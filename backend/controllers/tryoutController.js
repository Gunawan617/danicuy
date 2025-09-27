const TryoutPackage = require('../models/TryoutPackage');

const tryoutController = {
  // Get all tryout packages
  getAllPackages: async (req, res) => {
    try {
      const packages = await TryoutPackage.find({ active: true });
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get tryout package by ID
  getPackageById: async (req, res) => {
    try {
      const package = await TryoutPackage.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(package);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new tryout package
  createPackage: async (req, res) => {
    const package = new TryoutPackage(req.body);
    try {
      const newPackage = await package.save();
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update tryout package
  updatePackage: async (req, res) => {
    try {
      const package = await TryoutPackage.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      
      Object.assign(package, req.body);
      const updatedPackage = await package.save();
      res.json(updatedPackage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete tryout package (soft delete)
  deletePackage: async (req, res) => {
    try {
      const package = await TryoutPackage.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ message: 'Package not found' });
      }
      
      package.active = false;
      await package.save();
      res.json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = tryoutController;