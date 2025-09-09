"use client"
import { useState } from 'react'

interface BannerSelectorProps {
  selectedBanner: 'default' | 'tryout' | 'bimbel'
  onBannerChange: (banner: 'default' | 'tryout' | 'bimbel') => void
  className?: string
}

export default function BannerSelector({
  selectedBanner,
  onBannerChange,
  className = ""
}: BannerSelectorProps) {
  return (
    <section className={`bg-white/50 backdrop-blur-md py-6 border-b border-blue-100/60 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-1.5 flex border border-blue-200/60 overflow-hidden shadow-sm">
            <button
              onClick={() => onBannerChange('default')}
              className={`px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                selectedBanner === 'default'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-blue-700 hover:bg-blue-100/60 hover:text-blue-800'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => onBannerChange('tryout')}
              className={`px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                selectedBanner === 'tryout'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-blue-700 hover:bg-blue-100/60 hover:text-blue-800'
              }`}
            >
              🧪 Tryout
            </button>
            <button
              onClick={() => onBannerChange('bimbel')}
              className={`px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                selectedBanner === 'bimbel'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-blue-700 hover:bg-blue-100/60 hover:text-blue-800'
              }`}
            >
              📚 Bimbel
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}