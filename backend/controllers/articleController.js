const Article = require('../models/Article');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = 'uploads/articles/';
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

// Get all articles
const getAllArticles = async (req, res) => {
    try {
      const { featured, kategori, limit = 10, page = 1 } = req.query;
      const query = {};
      
      if (featured) query.featured = featured === 'true';
      if (kategori) query.kategori = kategori;

      const articles = await Article.find(query)
        .sort({ tanggal: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      const total = await Article.countDocuments(query);

      res.json({
        articles,
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get article by ID
const getArticleById = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      // Increment view count if you want
      // article.jumlahViews += 1;
      // await article.save();
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Create new article
const createArticle = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const gambar = `/${uploadDir}${req.file.filename}`;
        const article = new Article({
            ...req.body,
            gambar,
            tanggal: new Date(req.body.tanggal)
        });
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update article
const updateArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      if (req.file) {
          if (article.gambar) {
              const oldImagePath = path.join(__dirname, '..', article.gambar);
              if (fs.existsSync(oldImagePath)) {
                  fs.unlink(oldImagePath, (err) => {
                      if (err) console.error('Error deleting old image:', err);
                  });
              }
          }
          article.gambar = `/${uploadDir}${req.file.filename}`;
      }

      Object.assign(article, req.body);
      if (req.body.tanggal) {
        article.tanggal = new Date(req.body.tanggal);
      }

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete article
const deleteArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      if (article.gambar) {
          const imagePath = path.join(__dirname, '..', article.gambar);
          if (fs.existsSync(imagePath)) {
              fs.unlink(imagePath, (err) => {
                  if (err) console.error('Error deleting image:', err);
              });
          }
      }
      
      await Article.findByIdAndDelete(req.params.id);
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};