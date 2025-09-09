"use client"
import { useState } from "react";
import PurchaseCard from "./PurchaseCard";
import PurchaseModal from "./PurchaseModal";
import { useAuth } from "./AuthGuard";

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

// Data Paket Bimbel
const paketBimbel: Paket[] = [
  {
    id: 201,
    nama: "Bimbel UKOM Bidan D3 - 3 Bulan",
    profesi: "bidan",
    jenjang: "D3",
    durasi_bulan: 3,
    harga: 750000,
    fitur: "Akses materi 3 bulan, 300+ soal latihan, Webinar mingguan, Konsultasi online, Target skor",
    jumlah_soal: 300,
    tipe: "bimbel",
    deskripsi: "Program bimbingan intensif 3 bulan untuk persiapan ujian UKOM Bidan D3",
    target_audience: "Mahasiswa Bidan D3 yang ingin bimbingan komprehensif"
  },
  {
    id: 202,
    nama: "Bimbel UKOM Bidan D4-S1 - 6 Bulan",
    profesi: "bidan",
    jenjang: "D4-S1",
    durasi_bulan: 6,
    harga: 1200000,
    fitur: "Akses materi 6 bulan, 500+ soal latihan, Webinar 2x/minggu, Konsultasi online, Simulasi ujian, Target skor",
    jumlah_soal: 500,
    tipe: "bimbel",
    deskripsi: "Program bimbingan premium 6 bulan untuk persiapan ujian UKOM Bidan D4-S1",
    target_audience: "Mahasiswa Bidan D4-S1 yang ingin persiapan maksimal"
  },
  {
    id: 203,
    nama: "Bimbel UKOM Perawat D3 - 3 Bulan",
    profesi: "perawat",
    jenjang: "D3",
    durasi_bulan: 3,
    harga: 750000,
    fitur: "Akses materi 3 bulan, 300+ soal latihan, Webinar mingguan, Konsultasi online, Target skor",
    jumlah_soal: 300,
    tipe: "bimbel",
    deskripsi: "Program bimbingan intensif 3 bulan untuk persiapan ujian UKOM Perawat D3",
    target_audience: "Mahasiswa Perawat D3 yang ingin bimbingan komprehensif"
  },
  {
    id: 204,
    nama: "Bimbel UKOM Perawat D4-S1 - 6 Bulan",
    profesi: "perawat",
    jenjang: "D4-S1",
    durasi_bulan: 6,
    harga: 1200000,
    fitur: "Akses materi 6 bulan, 500+ soal latihan, Webinar 2x/minggu, Konsultasi online, Simulasi ujian, Target skor",
    jumlah_soal: 500,
    tipe: "bimbel",
    deskripsi: "Program bimbingan premium 6 bulan untuk persiapan ujian UKOM Perawat D4-S1",
    target_audience: "Mahasiswa Perawat D4-S1 yang ingin persiapan maksimal"
  }
]

const filters = ["Semua Paket", "Bidan D3", "Bidan D4-S1", "Perawat D3", "Perawat D4-S1"];

export default function BimbelPageContent() {
  const { isLoggedIn } = useAuth();
  const [activeFilter, setActiveFilter] = useState("Semua Paket");
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

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

  const filteredPaket = paketBimbel.filter((paket) => {
    if (activeFilter === "Semua Paket") return true;

    const filterKey = getFilterKey(activeFilter);
    if (!filterKey) return true;

    return paket.profesi === filterKey.profesi && paket.jenjang === filterKey.jenjang;
  });

  const handlePurchaseClick = (paket: Paket) => {
    setSelectedPaket(paket);
    setShowPurchaseModal(true);
  };

  const handlePurchaseSuccess = () => {
    alert('Pembelian berhasil diproses!');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Paket Bimbel UKOM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Program bimbingan intensif dengan materi komprehensif, webinar interaktif,
            dan konsultasi personal untuk mencapai skor UKOM impian Anda.
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
                  ? 'bg-green-600 text-white shadow-lg'
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
              <div className="h-4 bg-gradient-to-r from-green-500 to-green-600"></div>

              <div className="p-8">
                {/* Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                    📚 BIMBEL
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
                        <span className="text-sm mt-1 text-green-500">✓</span>
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
                  {paket.durasi_bulan > 1 && (
                    <div className="text-sm text-gray-600">
                      Rp {Math.round(paket.harga / paket.durasi_bulan).toLocaleString('id-ID')}/bulan
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePurchaseClick(paket)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isLoggedIn
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                  disabled={!isLoggedIn}
                >
                  {isLoggedIn ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>📚 Daftar Bimbel</span>
                    </div>
                  ) : (
                    'Login untuk Membeli'
                  )}
                </button>

                {!isLoggedIn && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Anda perlu login untuk membeli paket ini
                  </p>
                )}
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
              Tidak ada paket bimbel tersedia untuk filter yang dipilih.
            </p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        paket={selectedPaket}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onSuccess={handlePurchaseSuccess}
      />
    </section>
  );
}

