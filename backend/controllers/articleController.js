const Article = require('../models/Article');

const articleController = {
  // Get all articles
  getAllArticles: async (req, res) => {
    try {
      const { featured, kategori, limit = 10, page = 1 } = req.query;
      const query = { active: true };
      
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
  },

  // Get article by ID
  getArticleById: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article || !article.active) {
        return res.status(404).json({ message: 'Article not found' });
      }
      
      // Increment view count
      article.jumlahViews += 1;
      await article.save();
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new article
  createArticle: async (req, res) => {
    const article = new Article({
      ...req.body,
      tanggal: new Date(req.body.tanggal)
    });

    try {
      const newArticle = await article.save();
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update article
  updateArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      Object.assign(article, req.body);
      if (req.body.tanggal) {
        article.tanggal = new Date(req.body.tanggal);
      }

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete article (soft delete)
  deleteArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      article.active = false;
      await article.save();
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = articleController;