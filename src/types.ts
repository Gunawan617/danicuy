// src/types/index.ts

export interface Banner {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
  type: 'home' | 'tryout' | 'bimbel';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  _id: string;
  judul: string;
  excerpt: string;
  konten: string;
  penulis: string;
  tanggal: string;
  kategori: string;
  tags: string[];
  gambar: string;
  isPublished: boolean;
}

export interface Book {
  _id: string;
  judul: string;
  penulis: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  kategori: 'Bidan' | 'Perawat';
  halaman: number;
  rating: number;
  jumlahUlasan: number;
  stok: number;
  isBestSeller: boolean;
  diskon?: number;
  active: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  kategori: string;
  urutan: number;
  active: boolean;
}

export interface BimbelPackage {
  _id: string;
  nama: string;
  gambar: string;
  profesi: 'bidan' | 'perawat';
  jenjang: 'D3' | 'D4-S1';
  durasi_bulan: number;
  harga: number;
  fitur: string;
  jumlah_soal: number;
  tipe: 'bimbel';
  deskripsi: string;
  target_audience: string;
  isActive: boolean;
}

export interface TryoutPackage {
  _id: string;
  nama: string;
  gambar: string;
  profesi: 'bidan' | 'perawat';
  jenjang: 'D3' | 'D4-S1';
  durasi_bulan: number;
  harga: number;
  fitur: string;
  jumlah_soal: number;
  tipe: 'tryout';
  deskripsi: string;
  target_audience: string;
  isActive: boolean;
}

export interface User {
  _id: string;
  nama: string;
  email: string;
  profesi: 'bidan' | 'perawat' | 'admin';
  jenjang: 'D3' | 'D4-S1' | 'N/A';
  role: 'user' | 'admin';
}
