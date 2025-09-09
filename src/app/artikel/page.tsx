import Artikel from '../../components/Artikel'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ArtikelPage() {
  return (
    <>
      <Header />
      <Artikel />
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'Artikel UKOM - Tips, Strategi & Informasi Terbaru',
  description: 'Artikel terbaru tentang UKOM, tips sukses ujian, strategi belajar, update kurikulum, dan panduan persiapan UKOM bidan perawat.',
  keywords: 'artikel UKOM, tips ujian, strategi belajar, update kurikulum, panduan UKOM, bidan, perawat'
}

