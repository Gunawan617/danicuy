const mongoose = require('mongoose');

const tryoutPackageSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },
  profesi: {
    type: String,
    required: true,
    enum: ['bidan', 'perawat']
  },
  jenjang: {
    type: String,
    required: true,
    enum: ['D3', 'D4-S1']
  },
  durasi_bulan: {
    type: Number,
    required: true,
    default: 1
  },
  harga: {
    type: Number,
    required: true
  },
  fitur: {
    type: String,
    required: true
  },
  jumlah_soal: {
    type: Number,
    required: true
  },
  tipe: {
    type: String,
    required: true,
    default: 'tryout',
    enum: ['tryout']
  },
  deskripsi: {
    type: String,
    required: true
  },
  target_audience: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TryoutPackage', tryoutPackageSchema);