const Banner = require('../models/Banner');

const bannerController = {
  // Get all banners
  getAllBanners: async (req, res) => {
    try {
      const { type } = req.query;
      const query = { isActive: true };
      
      if (type) {
        query.type = type;
      }

      const currentDate = new Date();
      query.$or = [
        { startDate: { $exists: false } },
        { startDate: { $lte: currentDate } }
      ];
      query.$or.push(
        { endDate: { $exists: false } },
        { endDate: { $gte: currentDate } }
      );

      const banners = await Banner.find(query)
        .sort({ order: 1, createdAt: -1 });
      
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get banner by ID
  getBannerById: async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
      res.json(banner);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new banner with image upload
  createBanner: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Please upload an image' });
      }

      const imageUrl = `/uploads/banners/${req.file.filename}`;
      
      const banner = new Banner({
        ...req.body,
        imageUrl
      });

      const newBanner = await banner.save();
      res.status(201).json(newBanner);
    } catch (error) {
      // If there's an error, delete the uploaded file
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      res.status(400).json({ message: error.message });
    }
  },

  // Update banner
  updateBanner: async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }

      // If there's a new file uploaded
      if (req.file) {
        // Delete old image
        const oldImagePath = path.join(__dirname, '..', banner.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== 'ENOENT') console.error('Error deleting old image:', err);
        });

        // Update with new image
        banner.imageUrl = `/uploads/banners/${req.file.filename}`;
      }

      // Update other fields
      Object.keys(req.body).forEach(key => {
        banner[key] = req.body[key];
      });

      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } catch (error) {
      // If there's an error and a new file was uploaded, delete it
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      res.status(400).json({ message: error.message });
    }
  },

  // Delete banner
  deleteBanner: async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }

      // Delete image file
      const imagePath = path.join(__dirname, '..', banner.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== 'ENOENT') console.error('Error deleting image:', err);
      });

      await banner.remove();
      res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = bannerController;