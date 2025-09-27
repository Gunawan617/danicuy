const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  konten: {
    type: String,
    required: true
  },
  penulis: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true
  },
  waktuBaca: {
    type: Number,
    required: true
  },
  tags: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  jumlahViews: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);