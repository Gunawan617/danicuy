"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
// HAPUS: import { apiService, type Paket } from "../lib/api";

const filters = ["Semua Paket", "Bidan D3", "Bidan D4-S1", "Perawat D3", "Perawat D4-S1"];

export default function Programs() {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("Semua Paket");
  const [activeTab, setActiveTab] = useState<'tryout' | 'bimbel'>('tryout');
  // HAPUS: const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  // HAPUS: const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  // HAPUS: const [paketList, setPaketList] = useState<Paket[]>([]);
  // HAPUS: const [loading, setLoading] = useState(true);
  // HAPUS: const [error, setError] = useState<string | null>(null);

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

  // HAPUS: const getFilterKey = (filter: string) => { ... };

  // HAPUS: const currentPaketList = paketList.filter(paket => paket.tipe === activeTab);

  // HAPUS: const filteredPaket = currentPaketList.filter((paket) => { ... });

  // HAPUS: const handlePurchaseClick = (paket: Paket) => { ... };
  // HAPUS: const handlePurchaseSuccess = () => { ... };

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
        {/* Error State */}
        {/* Paket Cards */}
        {/* No packages found */}
      </div>

      {/* Purchase Modal */}
      {/* HAPUS: <PurchaseModal ... /> */}
    </section>
  );
}
