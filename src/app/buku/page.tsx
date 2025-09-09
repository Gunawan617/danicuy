import Buku from '../../components/Buku'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BukuPage() {
  return (
    <>
      <Header />
      <Buku />
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'Koleksi Buku UKOM - Panduan Lengkap Persiapan UKOM',
  description: 'Koleksi buku berkualitas untuk persiapan UKOM Bidan dan Perawat. Panduan lengkap, soal latihan, dan strategi sukses ujian kompetensi.',
  keywords: 'buku UKOM, panduan bidan, buku perawat, persiapan UKOM, soal latihan, strategi ujian'
}

