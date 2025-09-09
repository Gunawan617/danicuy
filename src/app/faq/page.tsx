import FAQ from '../../components/FAQ'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function FAQPage() {
  return (
    <>
      <Header />
      <FAQ />
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'FAQ - Pertanyaan Umum UKOM',
  description: 'Temukan jawaban untuk pertanyaan-pertanyaan umum tentang platform UKOM untuk persiapan ujian kompetensi bidan dan perawat.',
  keywords: 'FAQ, UKOM, pertanyaan umum, bidan, perawat, ujian kompetensi'
}

