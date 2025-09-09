import BimbelBanner from '../../components/BimbelBanner'
import BimbelPageContent from '../../components/BimbelPageContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BimbelPage() {
  return (
    <>
      <Header />
      <BimbelBanner />
      <BimbelPageContent />
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'Paket Bimbel UKOM - Program Bimbingan Intensif',
  description: 'Paket bimbel UKOM dengan program bimbingan intensif, webinar interaktif, dan konsultasi personal untuk sukses ujian kompetensi.',
  keywords: 'bimbel UKOM, bimbingan UKOM, program belajar, webinar CBT, konsultasi UKOM, bidan, perawat'
}
