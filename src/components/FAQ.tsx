const faqs = [
  {
    question: "Apa itu Test CBT?",
    answer: "CBT (Computer Based Test) adalah sistem ujian berbasis komputer yang memungkinkan peserta mengerjakan soal secara digital dengan interface yang user-friendly."
  },
  {
    question: "Bagaimana cara mengikuti ujian CBT?",
    answer: "Anda dapat mengikuti ujian CBT dengan mendaftar terlebih dahulu, kemudian mengakses platform ujian pada waktu yang telah ditentukan menggunakan komputer atau laptop."
  },
  {
    question: "Apa Saja yang akan dipelajari setelah CBT?",
    answer: "Setelah CBT, Anda akan mempelajari berbagai skill sesuai program yang dipilih, mulai dari programming, design, hingga business analytics dengan mentor berpengalaman."
  },
  {
    question: "Benefit apa saja yang saya dapatkan?",
    answer: "Anda akan mendapatkan sertifikat, akses ke komunitas alumni, job placement assistance, dan update materi terbaru sesuai perkembangan industri."
  },
  {
    question: "Apakah data saya aman?",
    answer: "Ya, data pribadi Anda dijamin aman dengan sistem keamanan berlapis dan enkripsi yang memenuhi standar keamanan internasional."
  },
  {
    question: "Apakah Saya Mendapatkan bantuan dari forum tersedia?",
    answer: "Tentu saja! Anda akan mendapatkan akses ke forum diskusi, mentoring session, dan support dari community manager yang siap membantu 24/7."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          Pertanyaan Yang Sering Ditanyakan
        </h2>
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-6">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-800 text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span className="text-gray-400 text-lg">+</span>
              </button>
              <div className="text-gray-600 text-sm mt-4 pr-8 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
