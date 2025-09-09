import TryoutBanner from '../../components/TryoutBanner'
import TryoutPageContent from '../../components/TryoutPageContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function TryoutPage() {
  return (
    <>
      <Header />
      <TryoutBanner />
      <TryoutPageContent />
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'Paket Tryout UKOM - Simulasi Ujian Online',
  description: 'Paket tryout UKOM lengkap dengan simulasi ujian, timer, dan analisis performa. Persiapkan diri Anda dengan tryout yang sesungguhnya.',
  keywords: 'tryout UKOM, simulasi ujian, latihan CBT, persiapan UKOM, bidan, perawat'
}
