"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CTA() {
  const team = [
    { name: "Kak Awan", photo: "/assets/team-member/Foto Baru Kak Awan.png" },
    { name: "Kak Bian", photo: "/assets/team-member/Foto Baru Kak Bian.png" },
    { name: "Kak Daffa", photo: "/assets/team-member/Foto Baru Kak Daffa.png" },
    { name: "Kak Naufal", photo: "/assets/team-member/Foto Baru Kak Naufal.png" },
    { name: "Kak Atta", photo: "/assets/team-member/Foto Baru Kak Atta.png" },
  ];

  // Gandakan list biar looping mulus
  const loopedTeam = [...team, ...team, ...team];

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden py-6 sm:py-8 md:py-12 lg:py-16">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-600">
        {/* Overlay patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Decorative elements - Responsive positioning */}
        <div className="absolute top-10 right-4 sm:top-16 sm:right-8 md:top-1/4 md:right-1/4 w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-10 left-4 sm:bottom-16 sm:left-8 md:bottom-1/4 md:left-1/4 w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 bg-cyan-300/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white space-y-4 sm:space-y-6 order-1 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-fit"
            >
              <span className="text-cyan-200 text-xs sm:text-sm font-medium">🚀 Mulai Perjalanan Sukses Anda</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              Siap Sukses
              <span className="block text-cyan-300">UKOM 2025?</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-blue-100 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
            >
              Dapatkan update terbaru materi, tips sukses, dan informasi eksklusif
              langsung dari mentor ahli Klinik UKOM. Bergabung sekarang dan raih skor impian Anda!
            </motion.p>

            {/* Enhanced Email Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 max-w-lg"
            >
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda"
                      className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                >
                  {isSubscribed ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Berhasil!</span>
                    </span>
                  ) : (
                    "Daftar Sekarang"
                  )}
                </button>
              </form>

              {/* Success Message */}
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3 text-green-300">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-sm">Berhasil terdaftar! Cek email Anda untuk informasi selanjutnya.</span>
                  </div>
                </motion.div>
              )}

              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-cyan-200 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Data Aman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unsubscribe Anytime</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Team Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-2"
          >
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl w-full max-w-md mx-auto lg:max-w-none">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4">
                  <span className="text-white font-bold text-xs sm:text-sm">👨‍🏫 TIM MENTOR KLINIK UKOM</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                  Mentor Ahli Siap Membimbing Anda
                </h3>
                <p className="text-blue-100 text-sm lg:text-base">
                  Tim profesional dengan pengalaman lebih dari 10 tahun di bidang kesehatan
                </p>
              </motion.div>

              {/* Enhanced Team Carousel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-white/5 to-white/10 p-4 mb-6"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-lg"></div>

                <motion.div
                  className="flex gap-3 relative"
                  animate={{ x: ["0%", "-33.333%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  {loopedTeam.map((member, i) => (
                    <motion.div
                      key={i}
                      className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden shadow-xl border-2 border-white/30 relative group"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-1 left-1 right-1 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="truncate text-center">{member.name.split(' ')[0]}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Carousel indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white/40 transition-all duration-300"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-3 text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-300">50+</div>
                  <div className="text-white/80 text-xs sm:text-sm">Mentor</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400">1000+</div>
                  <div className="text-white/80 text-xs sm:text-sm">Siswa</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-500">98%</div>
                  <div className="text-white/80 text-xs sm:text-sm">Kelulusan</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating elements - Better positioning */}
      <motion.div
        className="hidden lg:block absolute top-20 left-10 text-4xl xl:text-6xl opacity-40 text-cyan-200"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        📚
      </motion.div>

      <motion.div
        className="hidden lg:block absolute bottom-20 right-10 text-6xl xl:text-8xl opacity-40 text-blue-200"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🎓
      </motion.div>
    </section>
  );
}