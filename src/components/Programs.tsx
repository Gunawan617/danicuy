"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PurchaseCard from "./PurchaseCard";
import PurchaseModal from "./PurchaseModal";
import { useAuth } from "./AuthGuard";
import { apiService, type Paket } from "../lib/api";

const filters = ["Semua Paket", "Bidan D3", "Bidan D4-S1", "Perawat D3", "Perawat D4-S1"];

export default function Programs() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("Semua Paket");
  const [activeTab, setActiveTab] = useState<'tryout' | 'bimbel'>('tryout');
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [paketList, setPaketList] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch packages from API
  useEffect(() => {
    const fetchPaket = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getPaket();
        setPaketList(data);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setError('Gagal memuat data paket. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaket();
  }, []);

  // Auto-detect active tab based on pathname
  useEffect(() => {
    if (pathname === '/tryout') {
      setActiveTab('tryout');
    } else if (pathname === '/bimbel') {
      setActiveTab('bimbel');
    } else {
      // Default to tryout for homepage
      setActiveTab('tryout');
    }
  }, [pathname]);

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

  const currentPaketList = paketList.filter(paket => paket.tipe === activeTab);

  const filteredPaket = currentPaketList.filter((paket) => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket Terbaik Untuk Anda
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Persiapkan diri Anda untuk sukses dalam ujian UKOM dengan paket tryout dan bimbel berkualitas
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex">
            <button
              onClick={() => setActiveTab('tryout')}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'tryout'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🧪 Paket Tryout
            </button>
            <button
              onClick={() => setActiveTab('bimbel')}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'bimbel'
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📚 Paket Bimbel
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {activeTab === 'tryout' ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🧪</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Paket Tryout UKOM
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Uji kemampuan Anda dengan simulasi ujian UKOM yang sesungguhnya.
                Dapatkan analisis performa detail dan rekomendasi persiapan yang tepat.
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Paket Bimbel UKOM
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Program bimbingan intensif dengan materi komprehensif, webinar interaktif,
                dan konsultasi personal untuk mencapai skor UKOM impian Anda.
              </p>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeFilter === filter
                  ? activeTab === 'tryout'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat paket...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">⚠️</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Terjadi Kesalahan</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Paket Cards */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredPaket.map((paket) => (
            <div
              key={paket.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className={`h-4 ${
                activeTab === 'tryout' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'
              }`}></div>

              <div className="p-8">
                {/* Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    activeTab === 'tryout'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {activeTab === 'tryout' ? '🧪 TRYOUT' : '📚 BIMBEL'}
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
                        <span className={`text-sm mt-1 ${
                          activeTab === 'tryout' ? 'text-blue-500' : 'text-green-500'
                        }`}>✓</span>
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
                      ? activeTab === 'tryout'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                  disabled={!isLoggedIn}
                >
                  {isLoggedIn ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{activeTab === 'tryout' ? '🧪 Mulai Tryout' : '📚 Daftar Bimbel'}</span>
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
        )}

        {/* No packages found */}
        {!loading && !error && filteredPaket.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Paket Tidak Ditemukan</h3>
            <p className="text-gray-600">
              Tidak ada paket {activeTab} tersedia untuk filter yang dipilih.
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
