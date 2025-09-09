"use client"
import { useState, useEffect } from "react";
import { useAuth } from "./AuthGuard";
import { apiService } from "../lib/api";

interface UserPackage {
  id: number;
  paket_id: number;
  paket_nama: string;
  paket_profesi: string;
  paket_jenjang: string;
  paket_tipe: 'tryout' | 'bimbel';
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'pending';
}

interface ExamHistory {
  id: number;
  paket_nama: string;
  score: number;
  total_questions: number;
  completed_at: string;
  status: 'passed' | 'failed';
}

export default function UserDashboard() {
  const { user, token, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'packages' | 'history'>('packages');
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [examHistory, setExamHistory] = useState<ExamHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchUserData();
    }
  }, [isLoggedIn, token, activeTab]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeTab === 'packages') {
        const data = await apiService.getUserPackages(token!);
        setPackages(data);
      } else {
        const data = await apiService.getExamHistory(token!);
        setExamHistory(data);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Gagal memuat data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'passed':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'expired':
        return 'Kadaluarsa';
      case 'pending':
        return 'Menunggu';
      case 'passed':
        return 'Lulus';
      case 'failed':
        return 'Tidak Lulus';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Silakan login untuk mengakses dashboard</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Selamat datang, {user?.nama}!
        </h1>
        <p className="text-gray-600">
          {user?.profesi} - {user?.jenjang}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'packages'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📦 Paket Saya
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 Riwayat Ujian
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
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
            onClick={fetchUserData}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Packages Tab */}
      {!loading && !error && activeTab === 'packages' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paket Saya</h2>

          {packages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada paket</h3>
              <p className="text-gray-600 mb-4">
                Anda belum memiliki paket aktif. Mulai belajar dengan membeli paket tryout atau bimbel.
              </p>
              <button
                onClick={() => window.location.href = '#programs'}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Lihat Paket
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{pkg.paket_nama}</h3>
                      <p className="text-sm text-gray-600">{pkg.paket_profesi} - {pkg.paket_jenjang}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                      {getStatusText(pkg.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mulai:</span>
                      <span className="font-medium">{formatDate(pkg.start_date)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Berakhir:</span>
                      <span className="font-medium">{formatDate(pkg.end_date)}</span>
                    </div>
                  </div>

                  {pkg.status === 'active' && (
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                      {pkg.paket_tipe === 'tryout' ? 'Mulai Tryout' : 'Akses Materi'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Exam History Tab */}
      {!loading && !error && activeTab === 'history' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Ujian</h2>

          {examHistory.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat ujian</h3>
              <p className="text-gray-600">
                Anda belum menyelesaikan ujian apapun. Mulai dengan paket tryout pertama Anda.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paket
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examHistory.map((exam) => (
                      <tr key={exam.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{exam.paket_nama}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {exam.score}/{exam.total_questions}
                            <span className="text-gray-500 ml-1">
                              ({Math.round((exam.score / exam.total_questions) * 100)}%)
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                            {getStatusText(exam.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(exam.completed_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
