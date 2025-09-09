"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BimbelBannerProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  features?: string[]
}

export default function BimbelBanner({
  title = "Paket Bimbel UKOM",
  subtitle = "Bimbingan Intensif Menuju Sukses",
  description = "Program bimbingan komprehensif dengan materi lengkap, webinar interaktif, dan konsultasi personal untuk mencapai skor UKOM impian Anda.",
  ctaText = "Daftar Bimbel",
  ctaLink = "#programs",
  backgroundImage = "/api/placeholder/1920/600",
  features = [
    "Materi lengkap UKOM",
    "Webinar interaktif mingguan",
    "Konsultasi personal mentor",
    "Simulasi ujian berkala",
    "Target skor personal"
  ]
}: BimbelBannerProps) {
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-emerald-900">
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full">
              <span className="text-green-200 text-sm font-medium">📚 Bimbel UKOM</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-green-100">
                {subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-green-100 leading-relaxed max-w-lg">
              {description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-200">Program Lengkap:</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-500 ${
                      index === currentFeature
                        ? 'opacity-100 transform translate-x-0'
                        : 'opacity-60 transform translate-x-2'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      index === currentFeature ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <span className="text-green-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={ctaLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">🚀</span>
                {ctaText}
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-xl transition-all duration-300"
              >
                <span className="mr-2">📋</span>
                Lihat Program
              </a>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            {/* Learning Dashboard Mockup */}
            <div className="relative mx-auto max-w-md">
              {/* Browser Window */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-600 text-center">
                    cbtukom.com/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                  {/* Student Info */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">JD</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">John Doe</h3>
                      <p className="text-sm text-gray-600">Bidan D3 - Semester 6</p>
                    </div>
                  </div>

                  {/* Progress Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">75%</div>
                      <div className="text-xs text-gray-600">Progress Materi</div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div className="bg-green-600 h-1 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                      <div className="text-xs text-gray-600">Rata-rata Nilai</div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div className="bg-blue-600 h-1 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Schedule */}
                  <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Jadwal Mendatang</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Webinar: Persiapan UKOM</span>
                        </div>
                        <span className="text-xs text-gray-600">Hari Ini</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Konsultasi Mentor</span>
                        </div>
                        <span className="text-xs text-gray-600">Besok</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">🏆</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">📚</span>
                    </div>
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">🎯</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-xs">📈</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xs">👨‍🏫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">5K+</div>
            <div className="text-green-200">Siswa Aktif</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-green-200">Tingkat Kelulusan</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-green-200">Mentor Berpengalaman</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">4.9★</div>
            <div className="text-green-200">Rating Program</div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-300 rounded-full"></div>
      </div>
    </section>
  )
}

