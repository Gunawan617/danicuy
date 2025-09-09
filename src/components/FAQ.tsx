"use client"
import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: "Apa itu Klinik UKOM?",
    answer: "Klinik UKOM adalah platform terdepan untuk persiapan ujian kompetensi bidan dan perawat di Indonesia. Kami menyediakan CBT (Computer Based Test), Tryout, dan Bimbel dengan materi berkualitas dan simulasi ujian yang akurat."
  },
  {
    id: 2,
    question: "Bagaimana cara mendaftar di Klinik UKOM?",
    answer: "Untuk mendaftar, klik tombol 'Registrasi' di bagian atas halaman, isi data diri Anda (nama, email, profesi, jenjang), kemudian pilih paket yang sesuai dengan kebutuhan Anda (CBT, Tryout, atau Bimbel). Setelah pembayaran dikonfirmasi, akun Anda akan aktif."
  },
  {
    id: 3,
    question: "Apa saja paket yang tersedia di Klinik UKOM?",
    answer: "Kami menyediakan berbagai paket: CBT (Computer Based Test), Tryout simulasi ujian, dan Bimbel intensif untuk Bidan D3, Bidan D4-S1, Perawat D3, dan Perawat D4-S1. Setiap paket mencakup ribuan soal latihan, simulasi ujian, dan materi pembelajaran berkualitas."
  },
  {
    id: 4,
    question: "Bagaimana sistem pembayaran di Klinik UKOM?",
    answer: "Pembayaran dapat dilakukan melalui transfer bank ke rekening yang tercantum. Setelah transfer, upload bukti pembayaran melalui dashboard Anda. Tim kami akan memverifikasi dalam 1-2 hari kerja dan mengaktifkan akses paket Anda."
  },
  {
    id: 5,
    question: "Apakah soal UKOM selalu update?",
    answer: "Ya, database soal kami terus diperbaharui oleh tim expert bidan dan perawat profesional. Soal-soal disusun berdasarkan kurikulum terbaru, standar kompetensi, dan perkembangan praktik kebidanan/keprawatan terkini."
  },
  {
    id: 6,
    question: "Apakah Klinik UKOM bisa diakses di HP?",
    answer: "Ya, Klinik UKOM dapat diakses melalui browser mobile. Namun, untuk pengalaman terbaik saat CBT dan simulasi ujian, kami rekomendasikan menggunakan desktop/laptop. Dashboard dan materi pembelajaran dapat diakses dengan baik di semua device."
  },
  {
    id: 7,
    question: "Bagaimana cara kerja fitur simulasi ujian?",
    answer: "Fitur simulasi ujian akan memberikan pengalaman ujian sesungguhnya dengan timer, jumlah soal, dan tingkat kesulitan yang sesuai dengan ujian UKOM asli. Hasil simulasi akan memberikan analisis detail performa Anda."
  },
  {
    id: 8,
    question: "Apakah ada batas waktu pengerjaan soal?",
    answer: "Ya, setiap sesi ujian CBT memiliki batas waktu sesuai dengan standar ujian UKOM. Timer akan muncul di bagian atas layar dan akan otomatis submit ketika waktu habis."
  },
  {
    id: 9,
    question: "Apakah ada fitur review pembahasan?",
    answer: "Tentu! Setiap paket CBT dilengkapi dengan fitur review pembahasan lengkap untuk setiap soal. Anda dapat melihat penjelasan detail, referensi, dan tips menjawab untuk meningkatkan pemahaman."
  },
  {
    id: 10,
    question: "Bagaimana jika saya lupa password?",
    answer: "Klik link 'Lupa Password' di halaman login, masukkan email Anda, dan kami akan mengirimkan link reset password. Pastikan email yang Anda gunakan aktif dan dapat diakses."
  },
  {
    id: 11,
    question: "Apakah data pribadi saya aman?",
    answer: "Keamanan data adalah prioritas utama kami. Semua data dienkripsi dengan standar keamanan tinggi, server menggunakan SSL certificate, dan kami tidak pernah membagikan data pribadi Anda kepada pihak ketiga tanpa izin."
  },
  {
    id: 12,
    question: "Apakah ada garansi kelulusan?",
    answer: "Kami tidak memberikan garansi kelulusan karena hasil ujian bergantung pada persiapan dan kondisi mental Anda saat ujian. Namun, kami berkomitmen memberikan materi berkualitas dan support maksimal untuk membantu Anda mencapai target skor UKOM."
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1])) // First FAQ open by default

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pertanyaan Yang Sering Ditanyakan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan-pertanyaan umum tentang Klinik UKOM
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {faqs.map((faq, index) => {
              const isOpen = openItems.has(faq.id)

              return (
                <div
                  key={faq.id}
                  className={`border-b border-gray-100 last:border-b-0 ${
                    index === 0 ? 'border-t-0' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${faq.id}`}
                  >
                    <span className="font-semibold text-gray-900 text-base md:text-lg pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 ${
                      isOpen ? 'bg-blue-600 border-blue-600 rotate-180' : 'bg-white'
                    }`}>
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 9l-7 7-7-7"
                          className={isOpen ? 'text-white' : 'text-gray-400'}
                        />
                      </svg>
                    </div>
                  </button>

                  <div
                    id={`faq-${faq.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Masih ada pertanyaan?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim support kami siap membantu Anda 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@cbtukom.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Support
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
