"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Banner() {
  const team = [
    { name: "Kak Awan", photo: "/assets/team-member/Foto Baru Kak Awan.png" },
    { name: "Kak Bian", photo: "/assets/team-member/Foto Baru Kak Bian.png" },
    { name: "Kak Daffa", photo: "/assets/team-member/Foto Baru Kak Daffa.png" },
    { name: "Kak Naufal", photo: "/assets/team-member/Foto Baru Kak Naufal.png" },
    { name: "Kak Atta", photo: "/assets/team-member/Foto Baru Kak Atta.png" },
  ];

  const [index, setIndex] = useState(0);
  const total = team.length;
  const wrap = (i: number) => (i + total) % total;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => wrap(i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = wrap(index - 1);
  const nextIndex = wrap(index + 1);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background dengan gradient yang lebih menarik */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-slate-100/20">
        {/* Overlay pattern untuk depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/10 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gray-200/20 rounded-full blur-3xl"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100, 116, 139, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 116, 139, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-5 py-2.5 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="text-slate-700 text-sm font-semibold">✨ Klinik UKOM Terpercaya</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900"
            >
              Persiapkan Sukses
              <span className="block text-slate-700 mt-2">UKOM Impianmu</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-lg"
            >
              Klinik UKOM terdepan untuk persiapan ujian kompetensi bidan dan perawat.
              Dengan CBT, Tryout, dan Bimbel berkualitas tinggi.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                🚀 Mulai Belajar Sekarang
              </button>
              <button className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
                📋 Lihat Paket
              </button>
            </motion.div>

            {/* Enhanced Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100/60 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <div className="text-slate-800 font-semibold text-sm">Target Score</div>
                  <div className="text-slate-500 text-xs">Hasil Terjamin</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100/60 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div>
                  <div className="text-slate-800 font-semibold text-sm">Mentor Expert</div>
                  <div className="text-slate-500 text-xs">Pengalaman 10+ Tahun</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100/60 hover:bg-white/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <div className="text-slate-800 font-semibold text-sm">Analytics</div>
                  <div className="text-slate-500 text-xs">Progress Tracking</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content (Enhanced Carousel) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Carousel Container */}
            <div className="relative flex items-center justify-center min-h-[800px] md:min-h-[900px]">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-gray-200/30 rounded-full blur-3xl scale-[2]"></div>

              {/* Previous Image */}
              <motion.div
                key={`prev-${prevIndex}`}
                initial={{ opacity: 0, scale: 0.7, rotateY: -15 }}
                animate={{ opacity: 0.6, scale: 0.75, rotateY: -10 }}
                exit={{ opacity: 0, scale: 0.7, rotateY: -15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute left-0 md:left-1 top-1/2 transform -translate-y-1/2 w-40 h-52 md:w-52 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/20 hidden md:block"
                style={{ zIndex: 1, marginLeft: '0.5rem' }}
              >
                <img
                  src={team[prevIndex].photo}
                  alt={team[prevIndex].name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  {team[prevIndex].name}
                </div>
              </motion.div>

              {/* Current Main Image */}
              <motion.div
                key={`current-${index}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-80 h-[28rem] md:w-[28rem] md:h-[36rem] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30"
                style={{ zIndex: 10 }}
              >
                <img
                  src={team[index].photo}
                  alt={team[index].name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Name badge */}
                {/* <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30">
                    <div className="text-white text-lg font-bold">{team[index].name}</div>
                    <div className="text-white/80 text-sm">Mentor Klinik UKOM</div>
                  </div>
                </div> */}

                {/* Status indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </motion.div>

              {/* Next Image */}
              <motion.div
                key={`next-${nextIndex}`}
                initial={{ opacity: 0, scale: 0.7, rotateY: 15 }}
                animate={{ opacity: 0.6, scale: 0.75, rotateY: 10 }}
                exit={{ opacity: 0, scale: 0.7, rotateY: 15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute right-0 md:right-1 top-1/2 transform -translate-y-1/2 w-40 h-52 md:w-52 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/20 hidden md:block"
                style={{ zIndex: 1, marginRight: '0.5rem' }}
              >
                <img
                  src={team[nextIndex].photo}
                  alt={team[nextIndex].name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  {team[nextIndex].name}
                </div>
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {team.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'bg-slate-600 w-8'
                      : 'bg-slate-300 hover:bg-slate-400 w-3'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-4 mt-8 text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-2xl font-bold text-slate-700">500+</div>
                <div className="text-slate-600 text-sm font-medium">Siswa Aktif</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-2xl font-bold text-slate-700">95%</div>
                <div className="text-slate-600 text-sm font-medium">Kelulusan</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-2xl font-bold text-amber-500">4.9★</div>
                <div className="text-slate-600 text-sm font-medium">Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center bg-white/50 backdrop-blur-sm">
          <div className="w-1 h-3 bg-slate-600 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}