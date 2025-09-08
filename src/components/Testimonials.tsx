import { useState, useEffect } from 'react'

interface Testimonial {
  name: string
  role: string
  testimonial: string
  date: string
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Meghan Roberto",
    role: "Perawat",
    testimonial: "Becoming a nurse professional, mengembangkan karir saya dengan baik dan sistematis",
    date: "Jun 30, 2023"
  },
  {
    name: "Jisep Soliman",
    role: "Bidan",
    testimonial: "Alhamdulillah bisa lulus dan menjadi perawat professional yang berkualitas",
    date: "Apr 28, 2023"
  },
  {
    name: "Ari",
    role: "Perawat",
    testimonial: "Dapat sertifikat nasional sehingga lebih mudah untuk mencari kerja dan berkarir",
    date: "Mar 15, 2023"
  },
  {
    name: "Heni",
    role: "Bidan",
    testimonial: "Dapat berkarir dan yang terpenting telah lulus uji kompetensi perawat",
    date: "Jan 28, 2023"
  },
  {
    name: "Mujiana",
    role: "Perawat",
    testimonial: "Berkarena dengan pembelajaran yang mudah dipahami serta materinya lengkap",
    date: "Dec 30, 2022"
  },
  {
    name: "Ajrina",
    role: "Bidan",
    testimonial: "Lulus dengan nilai yang baik di uji kompetensi dengan bantuan CBT Kami",
    date: "Nov 25, 2022"
  },
  {
    name: "Meghan Roberto",
    role: "Perawat",
    testimonial: "Dapat bantuan yang maksimal sehingga nilai uji kompetensi bisa tinggi",
    date: "Jan 15, 2023"
  },
  {
    name: "Meghan Roberto",
    role: "Bidan",
    testimonial: "Dapat bantuan dan yang paling penting saya bisa lulus uji kompetensi dengan baik",
    date: "Jan 25, 2023"
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [loading, setLoading] = useState(false)
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          Cerita Sukses Alumni UKOM CBT
        </h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Memuat testimonials...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">{testimonial.testimonial}</p>
                <p className="text-xs text-gray-400">{testimonial.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
