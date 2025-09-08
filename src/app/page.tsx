
'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Features from '../components/Features'
import Programs from '../components/Programs'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  const [selectedProfesi, setSelectedProfesi] = useState<'bidan' | 'perawat'>('bidan')
  const [selectedJenjang, setSelectedJenjang] = useState<'D3' | 'D4-S1'>('D3')
  const [packages, setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [buktiTransfer, setBuktiTransfer] = useState('')
  const [purchaseLoading, setPurchaseLoading] = useState(false)

  useEffect(() => {
    fetchPackages()
  }, [selectedProfesi, selectedJenjang])

  const fetchPackages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/paket/filtered?profesi=${selectedProfesi}&jenjang=${selectedJenjang}`)
      const data = await response.json()
      if (data.success) {
        setPackages(data.data)
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
    }
  }

  const handlePurchase = (pkg: any) => {
    setSelectedPackage(pkg)
    setShowPurchaseModal(true)
  }

  const submitPurchase = async () => {
    if (!selectedPackage || !buktiTransfer.trim()) {
      alert('Mohon lengkapi bukti transfer')
      return
    }

    try {
      setPurchaseLoading(true)
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // This should come from authentication
          paket_id: selectedPackage.id,
          bukti_transfer: buktiTransfer
        })
      })

      const data = await response.json()
      if (data.success) {
        alert('Pembelian berhasil! Silakan tunggu verifikasi dari admin.')
        setShowPurchaseModal(false)
        setBuktiTransfer('')
        setSelectedPackage(null)
      } else {
        alert('Terjadi kesalahan saat melakukan pembelian')
      }
    } catch (error) {
      console.error('Error submitting purchase:', error)
      alert('Terjadi kesalahan saat melakukan pembelian')
    } finally {
      setPurchaseLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Banner />

      {/* Toggle Profesi & Jenjang */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Program CBT UKOM</h2>
            <p className="text-lg text-gray-600">Persiapkan diri untuk ujian kompetensi dengan paket yang sesuai</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setSelectedProfesi('bidan')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedProfesi === 'bidan'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Bidan
              </button>
              <button
                onClick={() => setSelectedProfesi('perawat')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedProfesi === 'perawat'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Perawat
              </button>
            </div>

            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setSelectedJenjang('D3')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedJenjang === 'D3'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                D3
              </button>
              <button
                onClick={() => setSelectedJenjang('D4-S1')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedJenjang === 'D4-S1'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                D4-S1
              </button>
            </div>
          </div>

          {/* Packages Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg: any) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.nama}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">Rp {pkg.harga.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mb-4">{pkg.fitur}</p>
                <button
                  onClick={() => handlePurchase(pkg)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Beli Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />
      <Programs />
      <Testimonials />
      <CTA />
      <Footer />

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Pembelian</h3>
            <div className="mb-4">
              <h4 className="font-medium">{selectedPackage.nama}</h4>
              <p className="text-gray-600">Harga: Rp {selectedPackage.harga.toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bukti Transfer
              </label>
              <input
                type="text"
                value={buktiTransfer}
                onChange={(e) => setBuktiTransfer(e.target.value)}
                placeholder="Masukkan nomor referensi atau link bukti transfer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={purchaseLoading}
              >
                Batal
              </button>
              <button
                onClick={submitPurchase}
                disabled={purchaseLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {purchaseLoading ? 'Memproses...' : 'Konfirmasi Pembelian'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
