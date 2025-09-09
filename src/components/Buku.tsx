"use client"
import { useState } from 'react'
import Image from 'next/image'

interface Buku {
  id: number
  judul: string
  penulis: string
  deskripsi: string
  harga: number
  gambar: string
  kategori: string
  halaman: number
  rating: number
  jumlahUlasan: number
  stok: number
  isBestSeller?: boolean
  diskon?: number
}

const bukuData: Buku[] = [
  {
    id: 1,
    judul: "Panduan Lengkap UKOM Bidan",
    penulis: "Dr. Siti Aminah, S.SiT., M.Kes",
    deskripsi: "Buku panduan komprehensif untuk persiapan ujian UKOM Bidan dengan ribuan soal latihan dan pembahasan detail.",
    harga: 125000,
    gambar: "/api/placeholder/300/400",
    kategori: "Bidan",
    halaman: 450,
    rating: 4.8,
    jumlahUlasan: 127,
    stok: 50,
    isBestSeller: true,
    diskon: 15
  },
  {
    id: 2,
    judul: "Master UKOM Perawat Profesional",
    penulis: "Ns. Ahmad Rahman, S.Kep., M.Kep",
    deskripsi: "Panduan praktis untuk menguasai UKOM Perawat dengan strategi efektif dan tips rahasia lulus ujian.",
    harga: 135000,
    gambar: "/api/placeholder/300/400",
    kategori: "Perawat",
    halaman: 520,
    rating: 4.9,
    jumlahUlasan: 89,
    stok: 35,
    isBestSeller: true
  },
  {
    id: 3,
    judul: "Soal-Soal Terpilih UKOM Bidan D3",
    penulis: "Tim Klinik UKOM",
    deskripsi: "Koleksi 2000+ soal UKOM Bidan D3 dengan pembahasan lengkap dan analisis tingkat kesulitan.",
    harga: 95000,
    gambar: "/api/placeholder/300/400",
    kategori: "Bidan D3",
    halaman: 380,
    rating: 4.7,
    jumlahUlasan: 203,
    stok: 75,
    diskon: 10
  },
  {
    id: 4,
    judul: "Strategi Sukses UKOM Perawat D4-S1",
    penulis: "Dr. Maya Sari, S.Kep., Ns., M.Kep",
    deskripsi: "Buku strategi lengkap untuk sukses dalam UKOM Perawat D4-S1 dengan teknik manajemen waktu dan stres.",
    harga: 115000,
    gambar: "/api/placeholder/300/400",
    kategori: "Perawat D4-S1",
    halaman: 420,
    rating: 4.6,
    jumlahUlasan: 156,
    stok: 28
  },
  {
    id: 5,
    judul: "Simulasi UKOM Bidan D4-S1",
    penulis: "Prof. Dr. Hendra Gunawan, Sp.OG",
    deskripsi: "Buku simulasi ujian UKOM Bidan D4-S1 dengan 1500 soal yang disusun berdasarkan kurikulum terbaru.",
    harga: 145000,
    gambar: "/api/placeholder/300/400",
    kategori: "Bidan D4-S1",
    halaman: 480,
    rating: 4.8,
    jumlahUlasan: 94,
    stok: 42,
    isBestSeller: true,
    diskon: 20
  },
  {
    id: 6,
    judul: "Panduan Klinis UKOM Perawat D3",
    penulis: "Ns. Rina Marlina, S.Kep., M.Kep",
    deskripsi: "Buku panduan klinis untuk persiapan UKOM Perawat D3 dengan fokus pada aspek praktis dan kasus nyata.",
    harga: 110000,
    gambar: "/api/placeholder/300/400",
    kategori: "Perawat D3",
    halaman: 395,
    rating: 4.5,
    jumlahUlasan: 178,
    stok: 31
  }
]

const categories = ["Semua", "Bidan", "Perawat", "Bidan D3", "Bidan D4-S1", "Perawat D3", "Perawat D4-S1"]

export default function Buku() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)

  const filteredBooks = selectedCategory === "Semua"
    ? bukuData
    : bukuData.filter(book => book.kategori === selectedCategory)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price)
  }

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price - (price * discount / 100)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Koleksi Buku UKOM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perkaya pengetahuan Anda dengan koleksi buku berkualitas untuk persiapan UKOM
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((buku) => (
            <div
              key={buku.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredBook(buku.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              {/* Book Cover */}
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Best Seller Badge */}
                {buku.isBestSeller && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    BEST SELLER
                  </div>
                )}

                {/* Discount Badge */}
                {buku.diskon && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    -{buku.diskon}%
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(buku.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-white font-medium text-sm">
                        {buku.rating}
                      </span>
                    </div>
                    <span className="text-white/80 text-sm">
                      ({buku.jumlahUlasan})
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-3">
                    {buku.kategori}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {buku.judul}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    oleh <span className="font-medium">{buku.penulis}</span>
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {buku.deskripsi}
                  </p>
                </div>

                {/* Book Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{buku.halaman} halaman</span>
                  <span>Stok: {buku.stok}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  {buku.diskon ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(calculateDiscountedPrice(buku.harga, buku.diskon))}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(buku.harga)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(buku.harga)}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13l1.5 5m0 0h8m-8 0v2a2 2 0 002 2h4a2 2 0 002-2v-2" />
                    </svg>
                    Beli Buku
                  </button>
                  <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
            Muat Lebih Banyak
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Dapatkan Update Buku Terbaru
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Berlangganan newsletter kami dan dapatkan informasi buku terbaru serta diskon eksklusif
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              Berlangganan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

