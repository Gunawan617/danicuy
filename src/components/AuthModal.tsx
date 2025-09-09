"use client"
import { useState } from "react";
import { useAuth } from "./AuthGuard";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    profesi: 'bidan',
    jenjang: 'D3'
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onClose();
          // Reset form
          setFormData({
            nama: '',
            email: '',
            password: '',
            profesi: 'bidan',
            jenjang: 'D3'
          });
        } else {
          setError(result.message || 'Login gagal');
        }
      } else {
        const result = await register({
          nama: formData.nama,
          email: formData.email,
          password: formData.password,
          profesi: formData.profesi,
          jenjang: formData.jenjang
        });

        if (result.success) {
          alert('Registrasi berhasil! Silakan login dengan akun Anda.');
          setMode('login');
          setFormData({
            nama: '',
            email: '',
            password: '',
            profesi: 'bidan',
            jenjang: 'D3'
          });
        } else {
          setError(result.message || 'Registrasi gagal');
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      email: '',
      password: '',
      profesi: 'bidan',
      jenjang: 'D3'
    });
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {mode === 'login' ? 'Masuk' : 'Daftar'}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profesi
                  </label>
                  <select
                    name="profesi"
                    value={formData.profesi}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bidan">Bidan</option>
                    <option value="perawat">Perawat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenjang
                  </label>
                  <select
                    name="jenjang"
                    value={formData.jenjang}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="D3">D3</option>
                    <option value="D4-S1">D4-S1</option>
                  </select>
                </div>
              </>
            )}

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : (mode === 'login' ? 'Masuk' : 'Daftar')}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={switchMode}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {mode === 'login'
                ? 'Belum punya akun? Daftar di sini'
                : 'Sudah punya akun? Masuk di sini'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
