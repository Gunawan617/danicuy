"use client"
import { useState } from 'react'
import Header from './Header'
import BannerSelector from './BannerSelector'
import Banner from './Banner'
import TryoutBanner from './TryoutBanner'
import BimbelBanner from './BimbelBanner'
import Features from './Features'
import Programs from './Programs'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import Buku from './Buku'
import Artikel from './Artikel'
import CTA from './CTA'
import Footer from './Footer'

export default function HomePage() {
  const [selectedBanner, setSelectedBanner] = useState<'default' | 'tryout' | 'bimbel'>('default')

  const renderBanner = () => {
    switch (selectedBanner) {
      case 'tryout':
        return <TryoutBanner />
      case 'bimbel':
        return <BimbelBanner />
      default:
        return <Banner />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header dengan warna asli */}
      <Header />

      {/* Banner Selector */}
      <BannerSelector
        selectedBanner={selectedBanner}
        onBannerChange={setSelectedBanner}
      />

      {/* Main Content */}
      <main>
        {/* Banner Section */}
        <section id="home">
          {renderBanner()}
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* Programs Section */}
        <section id="programs">
          <Programs />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Books Section */}
        <section id="books">
          <Buku />
        </section>

        {/* Articles Section */}
        <section id="articles">
          <Artikel />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FAQ />
        </section>

        {/* CTA Section */}
        <section id="contact">
          <CTA />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
