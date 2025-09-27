const FAQ = require('../models/FAQ');

const faqController = {
  // Get all FAQs
  getAllFaqs: async (req, res) => {
    try {
      const { kategori } = req.query;
      const query = { active: true };
      
      if (kategori) query.kategori = kategori;

      const faqs = await FAQ.find(query).sort({ urutan: 1 });
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get FAQ by ID
  getFaqById: async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      if (!faq || !faq.active) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
      res.json(faq);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new FAQ
  createFaq: async (req, res) => {
    const faq = new FAQ(req.body);
    try {
      const newFaq = await faq.save();
      res.status(201).json(newFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update FAQ
  updateFaq: async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }

      Object.assign(faq, req.body);
      const updatedFaq = await faq.save();
      res.json(updatedFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete FAQ (soft delete)
  deleteFaq: async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }

      faq.active = false;
      await faq.save();
      res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = faqController;