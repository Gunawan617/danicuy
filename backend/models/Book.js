const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true
  },
  penulis: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true,
    enum: ['Bidan', 'Perawat']
  },
  halaman: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  jumlahUlasan: {
    type: Number,
    default: 0
  },
  stok: {
    type: Number,
    required: true,
    min: 0
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  diskon: {
    type: Number,
    min: 0,
    max: 100
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);