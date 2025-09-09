"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface TryoutBannerProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
  features?: string[]
}

export default function TryoutBanner({
  title = "Paket Tryout UKOM",
  subtitle = "Uji Kemampuan Anda Sekarang",
  description = "Simulasi ujian UKOM yang sesungguhnya dengan timer, soal terbaru, dan analisis performa detail untuk persiapan maksimal.",
  ctaText = "Mulai Tryout",
  ctaLink = "#programs",
  backgroundImage = "/api/placeholder/1920/600",
  features = [
    "50-75 Soal simulasi UKOM",
    "Timer sesuai standar UKOM",
    "Review pembahasan lengkap",
    "Analisis performa detail",
    "Prediksi skor akhir"
  ]
}: TryoutBannerProps) {
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full">
              <span className="text-blue-200 text-sm font-medium">🧪 Tryout UKOM</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-blue-100">
                {subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-lg">
              {description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Yang Anda Dapatkan:</h3>
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
                      index === currentFeature ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                    <span className="text-blue-100">{feature}</span>
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
                Lihat Fitur
              </a>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            {/* Mockup Device */}
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
                    cbtukom.com/tryout
                  </div>
                </div>

                {/* Browser Content */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">🧪</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Tryout UKOM</h3>
                    <p className="text-sm text-gray-600">Bidan D3 - 50 Soal</p>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>15/50 Soal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{width: '30%'}}></div>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3">Soal No. 15</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Apa yang dimaksud dengan asuhan kebidanan komprehensif?
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-6">
                    {['A. Asuhan yang hanya fokus pada persalinan', 'B. Asuhan yang mencakup seluruh siklus kehidupan wanita', 'C. Asuhan yang hanya untuk ibu hamil', 'D. Asuhan yang hanya untuk bayi'].map((option, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                          index === 1
                            ? 'bg-blue-100 border-blue-300 text-blue-900'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm">{option}</span>
                      </button>
                    ))}
                  </div>

                  {/* Timer */}
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                      <span className="text-lg font-mono font-bold">45:30</span>
                      <span className="text-sm">tersisa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-xs">⚡</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xs">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-blue-200">Peserta Tryout</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-200">Tingkat Kelulusan</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-200">Support Online</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">4.9★</div>
            <div className="text-blue-200">Rating Pengguna</div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-300 rounded-full"></div>
      </div>
    </section>
  )
}

