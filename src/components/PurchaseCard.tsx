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
}

interface PurchaseCardProps {
  paket: Paket;
  onPurchaseClick: (paket: Paket) => void;
  isLoggedIn: boolean;
}

export default function PurchaseCard({ paket, onPurchaseClick, isLoggedIn }: PurchaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePurchase = () => {
    if (!isLoggedIn) {
      alert('Silakan login terlebih dahulu untuk membeli paket');
      return;
    }
    onPurchaseClick(paket);
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ${
        isHovered ? 'shadow-xl transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-90"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
            {paket.profesi}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h4 className="text-lg font-bold leading-tight mb-2">{paket.nama}</h4>
          <div className="flex justify-between items-center text-sm">
            <span>{paket.jenjang}</span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded">
              {paket.durasi_bulan} bulan
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <p className="text-2xl font-bold text-blue-600 mb-1">
            Rp {paket.harga.toLocaleString('id-ID')}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{paket.jumlah_soal} soal</span>
            <span className="text-green-600 font-medium">
              {paket.durasi_bulan} bulan akses
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Fitur:</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            {paket.fitur.split(', ').map((fitur, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {fitur}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handlePurchase}
          className={`w-full py-3 rounded-md font-medium transition duration-300 ${
            isLoggedIn
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          disabled={!isLoggedIn}
        >
          {isLoggedIn ? 'Beli Paket' : 'Login untuk Membeli'}
        </button>

        {!isLoggedIn && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Anda perlu login untuk membeli paket ini
          </p>
        )}
      </div>
    </div>
  );
}

