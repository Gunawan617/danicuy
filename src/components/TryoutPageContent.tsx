"use client"
import { useState } from "react";

interface Paket {
  id: number;
  nama: string;
  profesi: string;
  jenjang: string;
  durasi_bulan: number;
  harga: number;
  fitur: string;
  jumlah_soal: number;
  tipe: 'tryout' | 'bimbel';
  deskripsi: string;
  target_audience: string;
}

// Data Paket Tryout
const paketTryout: Paket[] = [
  {
    id: 101,
    nama: "Tryout UKOM Bidan D3",
    profesi: "bidan",
    jenjang: "D3",
    durasi_bulan: 1,
    harga: 25000,
    fitur: "50 soal simulasi, Timer CBT, Review pembahasan, Analisis performa",
    jumlah_soal: 50,
    tipe: "tryout",
    deskripsi: "Simulasi ujian UKOM Bidan D3 dengan soal terbaru dan analisis mendalam",
    target_audience: "Mahasiswa Bidan D3 yang akan menghadapi ujian kompetensi"
  },
  {
    id: 102,
    nama: "Tryout UKOM Bidan D4-S1",
    profesi: "bidan",
    jenjang: "D4-S1",
    durasi_bulan: 1,
    harga: 35000,
    fitur: "75 soal simulasi, Timer CBT, Review pembahasan, Laporan progress",
    jumlah_soal: 75,
    tipe: "tryout",
    deskripsi: "Paket tryout lengkap untuk persiapan ujian UKOM Bidan D4-S1",
    target_audience: "Mahasiswa Bidan D4-S1 yang ingin mengukur kemampuan sebelum ujian"
  },
  {
    id: 103,
    nama: "Tryout UKOM Perawat D3",
    profesi: "perawat",
    jenjang: "D3",
    durasi_bulan: 1,
    harga: 25000,
    fitur: "50 soal simulasi, Timer CBT, Review pembahasan, Prediksi skor",
    jumlah_soal: 50,
    tipe: "tryout",
    deskripsi: "Simulasi ujian UKOM Perawat D3 dengan pembahasan detail",
    target_audience: "Mahasiswa Perawat D3 yang mempersiapkan ujian kompetensi"
  },
  {
    id: 104,
    nama: "Tryout UKOM Perawat D4-S1",
    profesi: "perawat",
    jenjang: "D4-S1",
    durasi_bulan: 1,
    harga: 35000,
    fitur: "75 soal simulasi, Timer CBT, Review pembahasan, Target skor",
    jumlah_soal: 75,
    tipe: "tryout",
    deskripsi: "Paket tryout premium untuk persiapan ujian UKOM Perawat D4-S1",
    target_audience: "Mahasiswa Perawat D4-S1 yang ingin mencapai skor maksimal"
  }
]

const filters = ["Semua Paket", "Bidan D3", "Bidan D4-S1", "Perawat D3", "Perawat D4-S1"];

export default function TryoutPageContent() {
  const [activeFilter, setActiveFilter] = useState("Semua Paket");

  const getFilterKey = (filter: string) => {
    switch (filter) {
      case "Bidan D3":
        return { profesi: "bidan", jenjang: "D3" };
      case "Bidan D4-S1":
        return { profesi: "bidan", jenjang: "D4-S1" };
      case "Perawat D3":
        return { profesi: "perawat", jenjang: "D3" };
      case "Perawat D4-S1":
        return { profesi: "perawat", jenjang: "D4-S1" };
      default:
        return null;
    }
  };

  const filteredPaket = paketTryout.filter((paket) => {
    if (activeFilter === "Semua Paket") return true;

    const filterKey = getFilterKey(activeFilter);
    if (!filterKey) return true;

    return paket.profesi === filterKey.profesi && paket.jenjang === filterKey.jenjang;
  });

  const handlePurchaseClick = (paket: Paket) => {
    alert('Redirect to purchase page for ' + paket.nama);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🧪</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Paket Tryout UKOM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uji kemampuan Anda dengan simulasi ujian UKOM yang sesungguhnya.
            Dapatkan analisis performa detail dan rekomendasi persiapan yang tepat.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Paket Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredPaket.map((paket) => (
            <div
              key={paket.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="h-4 bg-gradient-to-r from-blue-500 to-blue-600"></div>

              <div className="p-8">
                {/* Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    🧪 TRYOUT
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {paket.profesi} {paket.jenjang}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {paket.nama}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {paket.deskripsi}
                </p>

                {/* Target Audience */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">Target:</span> {paket.target_audience}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Yang Didapat:</h4>
                  <ul className="space-y-2">
                    {paket.fitur.split(', ').map((fitur, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-sm mt-1 text-blue-500">✓</span>
                        <span className="text-sm text-gray-700">{fitur}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{paket.jumlah_soal}</div>
                    <div className="text-xs text-gray-600">Soal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{paket.durasi_bulan}</div>
                    <div className="text-xs text-gray-600">
                      {paket.durasi_bulan === 1 ? 'Bulan' : 'Bulan'}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    Rp {paket.harga.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePurchaseClick(paket)}
                  className='w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>🧪 Mulai Tryout</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPaket.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Paket Tidak Ditemukan</h3>
            <p className="text-gray-600">
              Tidak ada paket tryout tersedia untuk filter yang dipilih.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

