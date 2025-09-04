const features = [
  {
    icon: "💻",
    title: "Pelatihan Online LKOM",
    description: "Sistem belajar terbukti efektif untuk meningkatkan kemampuan dengan teknologi terdepan"
  },
  {
    icon: "👥",
    title: "Mentor Berpengalaman",
    description: "Coaching dari mentor industri yang sudah berpengalaman bertahun-tahun di bidangnya"
  },
  {
    icon: "🎯",
    title: "Alur Materi Terbaik",
    description: "Materi pembelajaran disusun sistematis dan mudah dipahami untuk semua level"
  }
];

export default function WhyJoin() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Kenapa harus Join CBT Kami</h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
          labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
