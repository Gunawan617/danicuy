"use client"
import { useState, useRef } from "react";
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
}

interface PurchaseModalProps {
  paket: Paket | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PurchaseModal({ paket, isOpen, onClose, onSuccess }: PurchaseModalProps) {
  const { user, token } = useAuth();
  const [buktiTransfer, setBuktiTransfer] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Hanya file gambar yang diperbolehkan');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB');
        return;
      }

      setBuktiTransfer(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePurchase = async () => {
    if (!paket || !user || !token || !buktiTransfer) {
      setError('Data tidak lengkap');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert image to base64 for API
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(buktiTransfer);
      });

      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          paket_id: paket.id,
          bukti_transfer: base64Image
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Pembelian berhasil! Pesanan Anda akan diproses dalam 1-2 hari kerja.');
        onSuccess();
        onClose();
        resetForm();
      } else {
        setError(data.message || 'Gagal melakukan pembelian');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setError('Terjadi kesalahan saat memproses pembelian');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBuktiTransfer(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || !paket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Konfirmasi Pembelian</h3>

          {/* Package Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-lg mb-2">{paket.nama}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Profesi:</span> {paket.profesi}</p>
              <p><span className="font-medium">Jenjang:</span> {paket.jenjang}</p>
              <p><span className="font-medium">Durasi:</span> {paket.durasi_bulan} bulan</p>
              <p><span className="font-medium">Jumlah Soal:</span> {paket.jumlah_soal}</p>
              <p className="text-lg font-bold text-blue-600 pt-2">
                Total: Rp {paket.harga.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h5 className="font-semibold text-blue-800 mb-2">Instruksi Pembayaran</h5>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Bank Transfer ke:</strong></p>
              <p>BCA: 1234567890</p>
              <p>Atas nama: PT CBT Indonesia</p>
              <p className="mt-2">Nominal: <strong>Rp {paket.harga.toLocaleString('id-ID')}</strong></p>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Bukti Transfer *
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: JPG, PNG, Max: 5MB
            </p>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview Bukti Transfer:</p>
              <div className="border border-gray-300 rounded-lg p-2">
                <img
                  src={previewUrl}
                  alt="Bukti transfer preview"
                  className="max-w-full h-auto max-h-48 mx-auto rounded"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Batal
            </button>
            <button
              onClick={handlePurchase}
              disabled={loading || !buktiTransfer}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Konfirmasi Pembelian'}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Pesanan akan diproses dalam 1-2 hari kerja setelah verifikasi pembayaran
          </p>
        </div>
      </div>
    </div>
  );
}

