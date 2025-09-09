'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  nama: string
  email: string
  profesi: string
  jenjang: string
  created_at: string
}

interface Stats {
  total_users: number
  active_sessions: number
  completed_exams: number
  popular_packages: Array<{
    nama: string
    order_count: number
  }>
}

interface Package {
  id: number
  nama: string
  profesi: string
  jenjang: string
  durasi_bulan: number
  harga: number
  fitur: string
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState<User[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'users', name: 'Manajemen User' },
    { id: 'packages', name: 'Paket' },
    { id: 'questions', name: 'Bank Soal' },
    { id: 'orders', name: 'Verifikasi Order' },
    { id: 'reports', name: 'Laporan' }
  ]

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchStats()
    } else if (activeTab === 'users') {
      fetchUsers()
    } else if (activeTab === 'packages') {
      fetchPackages()
    }
  }, [activeTab])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/admin/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/admin/users')
      const data = await response.json()
      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/paket')
      const data = await response.json()
      if (data.success) {
        setPackages(data.data)
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel Klinik UKOM</h1>
            <button className="text-gray-600 hover:text-gray-900">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64">
            <div className="bg-white rounded-lg shadow p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-600">Memuat data...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-blue-900">Total Users</h3>
                        <p className="text-2xl font-bold text-blue-600">{stats?.total_users || 0}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-green-900">Active Sessions</h3>
                        <p className="text-2xl font-bold text-green-600">{stats?.active_sessions || 0}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-purple-900">Completed Exams</h3>
                        <p className="text-2xl font-bold text-purple-600">{stats?.completed_exams || 0}</p>
                      </div>
                    </div>
                  )}
                  {stats?.popular_packages && stats.popular_packages.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Paket Terpopuler</h3>
                      <div className="bg-white border rounded-lg p-4">
                        {stats.popular_packages.map((pkg, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <span className="text-gray-700">{pkg.nama}</span>
                            <span className="text-sm text-gray-500">{pkg.order_count} pesanan</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Manajemen User</h2>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-600">Memuat data user...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nama
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Profesi
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Jenjang
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tanggal Daftar
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.length > 0 ? (
                            users.map((user) => (
                              <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {user.nama}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.profesi}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.jenjang}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(user.created_at).toLocaleDateString('id-ID')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                                  <button className="text-red-600 hover:text-red-900">Hapus</button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                Tidak ada data user
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'packages' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Manajemen Paket</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4">
                    Tambah Paket Baru
                  </button>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-600">Memuat data paket...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {packages.length > 0 ? (
                        packages.map((pkg) => (
                          <div key={pkg.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.nama}</h3>
                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Profesi:</span> {pkg.profesi}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Jenjang:</span> {pkg.jenjang}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Durasi:</span> {pkg.durasi_bulan} bulan
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                Rp {pkg.harga.toLocaleString()}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700 mb-4">{pkg.fitur}</p>
                            <div className="flex space-x-2">
                              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                                Edit
                              </button>
                              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm">
                                Hapus
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8">
                          <p className="text-gray-500">Tidak ada data paket</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'questions' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Bank Soal</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4">
                    Tambah Soal Baru
                  </button>
                  {/* Question bank content */}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Verifikasi Order</h2>
                  {/* Order verification content */}
                </div>
              )}

              {activeTab === 'reports' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Laporan & Statistik</h2>
                  {/* Reports content */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
