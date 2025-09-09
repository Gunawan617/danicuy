"use client"
import { useState } from 'react'
import Image from 'next/image'

interface Artikel {
  id: number
  judul: string
  excerpt: string
  konten: string
  penulis: string
  tanggal: string
  gambar: string
  kategori: string
  waktuBaca: number
  tags: string[]
  featured?: boolean
  jumlahViews: number
}

const artikelData: Artikel[] = [
  {
    id: 1,
    judul: "Strategi Ampuh Lulus UKOM Bidan di Era Digital",
    excerpt: "Pelajari strategi efektif untuk menghadapi ujian UKOM Bidan dengan memanfaatkan teknologi dan metode pembelajaran modern.",
    konten: "Dalam era digital saat ini, persiapan ujian UKOM memerlukan pendekatan yang berbeda...",
    penulis: "Dr. Siti Aminah",
    tanggal: "2024-01-15",
    gambar: "/api/placeholder/600/300",
    kategori: "Tips & Strategi",
    waktuBaca: 8,
    tags: ["UKOM", "Bidan", "Strategi"],
    featured: true,
    jumlahViews: 2450
  },
  {
    id: 2,
    judul: "Update Kurikulum UKOM 2025: Apa yang Berubah?",
    excerpt: "Pembaruan kurikulum UKOM 2025 membawa perubahan signifikan dalam materi dan sistem penilaian. Simak penjelasannya.",
    konten: "Setiap tahun, kurikulum UKOM mengalami pembaruan untuk menyesuaikan dengan perkembangan...",
    penulis: "Prof. Dr. Hendra Gunawan",
    tanggal: "2024-01-12",
    gambar: "/api/placeholder/600/300",
    kategori: "Update Kurikulum",
    waktuBaca: 6,
    tags: ["Kurikulum", "2025", "Update", "UKOM"],
    featured: true,
    jumlahViews: 1890
  },
  {
    id: 3,
    judul: "Panduan Lengkap Sistem UKOM untuk Mahasiswa Baru",
    excerpt: "Bingung dengan sistem UKOM? Artikel ini akan memandu Anda step by step memahami dan menguasai platform UKOM.",
    konten: "Bagi mahasiswa baru, sistem UKOM mungkin terasa asing dan menakutkan...",
    penulis: "Ns. Maya Sari",
    tanggal: "2024-01-10",
    gambar: "/api/placeholder/600/300",
    kategori: "Panduan",
    waktuBaca: 10,
    tags: ["Panduan", "Mahasiswa Baru", "CBT", "UKOM"],
    jumlahViews: 3120
  },
  {
    id: 4,
    judul: "Teknik Manajemen Waktu dalam UKOM Perawat",
    excerpt: "Master teknik manajemen waktu yang efektif untuk menyelesaikan UKOM Perawat dengan optimal dan minim stres.",
    konten: "Waktu adalah faktor krusial dalam ujian UKOM. Dengan teknik manajemen waktu yang tepat...",
    penulis: "Ns. Ahmad Rahman",
    tanggal: "2024-01-08",
    gambar: "/api/placeholder/600/300",
    kategori: "Teknik Belajar",
    waktuBaca: 7,
    tags: ["Waktu", "Manajemen", "Perawat", "Teknik"],
    jumlahViews: 1560
  },
  {
    id: 5,
    judul: "Mengenal Jenis-Jenis Soal UKOM Bidan D4-S1",
    excerpt: "Pelajari berbagai jenis soal yang sering muncul dalam UKOM Bidan D4-S1 dan cara menjawabnya dengan benar.",
    konten: "UKOM Bidan D4-S1 memiliki variasi soal yang berbeda dengan jenjang lainnya...",
    penulis: "Dr. Rina Marlina",
    tanggal: "2024-01-05",
    gambar: "/api/placeholder/600/300",
    kategori: "Jenis Soal",
    waktuBaca: 9,
    tags: ["Soal", "Bidan", "D4-S1", "Jenis"],
    jumlahViews: 2230
  },
  {
    id: 6,
    judul: "Tips Mengatasi Nervous saat Ujian UKOM",
    excerpt: "Nervous adalah hal wajar saat ujian. Pelajari teknik relaksasi dan strategi mengatasi nervous sebelum dan saat ujian UKOM.",
    konten: "Perasaan nervous saat ujian adalah respons alami tubuh terhadap situasi bertekanan tinggi...",
    penulis: "Psikolog UKOM",
    tanggal: "2024-01-03",
    gambar: "/api/placeholder/600/300",
    kategori: "Kesehatan Mental",
    waktuBaca: 5,
    tags: ["Nervous", "Relaksasi", "Mental", "Tips"],
    jumlahViews: 2890
  }
]

const categories = ["Semua", "Tips & Strategi", "Update Kurikulum", "Panduan", "Teknik Belajar", "Jenis Soal", "Kesehatan Mental"]

export default function Artikel() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = artikelData.filter(article => {
    const matchesCategory = selectedCategory === "Semua" || article.kategori === selectedCategory
    const matchesSearch = article.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredArticles = artikelData.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Artikel UKOM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan tips, strategi, dan informasi terbaru seputar persiapan UKOM
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Artikel Unggulan</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((artikel) => (
                <div
                  key={artikel.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                          {artikel.kategori}
                        </span>
                      </div>
                      <h3 className="text-white text-xl font-bold line-clamp-2 group-hover:text-blue-200 transition-colors">
                        {artikel.judul}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {artikel.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>oleh <span className="font-medium text-gray-900">{artikel.penulis}</span></span>
                        <span>•</span>
                        <span>{formatDate(artikel.tanggal)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{artikel.waktuBaca} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {selectedCategory === "Semua" ? "Semua Artikel" : `Artikel ${selectedCategory}`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((artikel) => (
              <article
                key={artikel.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {artikel.kategori}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {artikel.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {artikel.judul}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {artikel.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span>oleh <span className="font-medium text-gray-900">{artikel.penulis}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{artikel.waktuBaca} min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(artikel.tanggal)}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{artikel.jumlahViews.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {regularArticles.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-gray-600">
                Tidak ada artikel yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        {regularArticles.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Muat Artikel Lainnya
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Jangan Lewatkan Artikel Terbaru
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Berlangganan newsletter kami dan dapatkan artikel UKOM terbaru langsung di email Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
              Berlangganan
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            Kami hormati privasi Anda. Unsubscribe kapan saja.
          </p>
        </div>
      </div>
    </section>
  )
}

