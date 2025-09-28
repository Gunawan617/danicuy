const FAQ = require('../models/FAQ');

// Get all FAQs
const getAllFaqs = async (req, res) => {
    try {
      const { kategori } = req.query;
      const query = {};
      
      if (kategori) query.kategori = kategori;

      const faqs = await FAQ.find(query).sort({ urutan: 1 });
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get FAQ by ID
const getFaqById = async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
      res.json(faq);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Create new FAQ
const createFaq = async (req, res) => {
    const faq = new FAQ(req.body);
    try {
      const newFaq = await faq.save();
      res.status(201).json(newFaq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Update FAQ
const updateFaq = async (req, res) => {
    try {
      const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!faq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
      res.json(faq);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Delete FAQ
const deleteFaq = async (req, res) => {
    try {
      const faq = await FAQ.findByIdAndDelete(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
      res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFaqs,
    getFaqById,
    createFaq,
    updateFaq,
    deleteFaq
};