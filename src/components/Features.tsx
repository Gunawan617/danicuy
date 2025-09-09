"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// === DATA FITUR ===
const features = [
  {
    icon: "💻",
    title: "Pelatihan Online UKOM",
    description: "Simulasi ujian UKOM yang akurat dengan timer dan pembahasan lengkap",
  },
  {
    icon: "👨‍🏫",
    title: "Mentor Berpengalaman",
    description: "Bimbingan dari dosen dan praktisi kesehatan berpengalaman 10+ tahun",
  },
  {
    icon: "🎯",
    title: "Target Skor Tinggi",
    description: "Program terstruktur untuk mencapai passing grade UKOM dengan target skor jelas",
  },
];

// === DATA DOSEN ===
const bidan = [
  "Dr. Bdn. Kursih Sulastriningsih SSiT, M. Kes.jpeg",
  "Dr. Budi Astyandini.S.SiT.M. Kes.jpeg",
  "Dr. Rizka Ayu Setyani, SST MPH.jpeg",
  "Muayah, SKM., SST., M.Tr. Keb.jpeg",
  "Nur Maziyah Hurin_in, S.Tr.Keb., M. Kes..jpeg",
  "Pariqa Annisa, S.Tr.Keb., BD., M.Keb..jpeg",
  "Ratna Suminar, S.ST., M.Tr. Keb..jpeg",
  "Risda Mariana Manik SST., M.K.M.jpeg",
  "Sri Wisnu Wardani, S.ST., S.Keb..jpeg",
  "Stella Maris Bakara, S.Tr.Keb., M.K.M, CHE.JPG",
  "Yessy Arisman, S.Tr.Keb., M.Tr. Keb.jpeg",
  "YUNI VIVI SANTRI P, SKM,.S.Keb. MKM.jpeg",
];

const perawat = [
  "Afrizal Hasan S.Kep.,Ns.,M.Kep.jpeg",
  "Dr. Nurma Afiani, S.Kep., Ns., M.Kep..png",
  "Dr. Sestu Retno Dwi Andayani, S.Kp., M.Kes.jpg",
  "M. Iqbal Angga Kusuma, S.Kep., Ns., M.Kep..jpeg",
  "Ns. Andrik Hermanto, S.Kep., M.Kep.png",
  "Ns. Ayuda Nia Agustina, M.Kep., Sp.Kep.An.jpeg",
  "Ns. Hairunnisa, S.Kep., M.Kep.jpg",
  "Ns. Harmilah, S.Pd., S.Kep., M. Kep. Sp. KMB.jpeg",
  "Ns. Umi Hani, M.Kep., Sp.Kep.Kom. .png",
  "Retno Ayu Yuliastuti, S.Kep., Ns., M.Tr.Kep.jpeg",
  "Riza Arisanty Latifah, S.Kep., Ners., M.Kep.jpeg",
  "Sulastri, SKp, M. Kep.jpg",
  "Supriatin, S.Kep., Ners., M.Kep.jpeg",
];

// === LIST DOSEN GABUNGAN ===
const dosenList = [
  ...bidan.map((name) => ({
    name: name.replace(/\.[^.]+$/, ""),
    src: `/assets/dosen/bidan/${encodeURIComponent(name)}`,
    category: "Bidan",
  })),
  ...perawat.map((name) => ({
    name: name.replace(/\.[^.]+$/, ""),
    src: `/assets/dosen/perawat/${encodeURIComponent(name)}`,
    category: "Perawat",
  })),
];

// === ENHANCED DOSEN CARD ===
function DosenCard({ name, src, category, index }: { name: string; src: string; category: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
        <div className="relative mb-3">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-gradient-to-r from-orange-400 to-pink-400 bg-gray-100 shadow-md">
            <Image
              src={src}
              alt={name}
              width={80}
              height={80}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            category === "Bidan" ? "bg-pink-400" : "bg-blue-400"
          }`}></div>
        </div>

        <div className="text-center">
          <div className="font-semibold text-gray-800 text-xs md:text-sm mb-1 line-clamp-2 leading-tight">
            {name}
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            category === "Bidan"
              ? "bg-pink-100 text-pink-700"
              : "bg-blue-100 text-blue-700"
          }`}>
            {category}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// === KOMPONEN UTAMA ===
export default function Features() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "bidan" | "perawat">("all");

  // Filter dosen berdasarkan kategori
  const filteredDosen = selectedCategory === "all"
    ? dosenList
    : dosenList.filter(dosen => dosen.category.toLowerCase() === selectedCategory);

  // Pagination
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredDosen.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedDosen = filteredDosen.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Auto-play pagination
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Program Unggulan Klinik UKOM
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Persiapkan diri Anda dengan program terbaik dari dosen-dosen ahli di bidang kesehatan
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dosen Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tim Dosen Pengajar
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Belajar dari para ahli yang telah berpengalaman di dunia pendidikan kesehatan
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-2 flex border border-gray-200">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(0);
              }}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Semua ({dosenList.length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory("bidan");
                setCurrentPage(0);
              }}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                selectedCategory === "bidan"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Bidan ({bidan.length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory("perawat");
                setCurrentPage(0);
              }}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                selectedCategory === "perawat"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Perawat ({perawat.length})
            </button>
          </div>
        </motion.div>

        {/* Dosen Grid */}
        <motion.div
          key={`${selectedCategory}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12"
        >
          {paginatedDosen.map((dosen, index) => (
            <DosenCard
              key={`${dosen.name}-${currentPage}`}
              {...dosen}
              index={index}
            />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-4"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "bg-orange-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">{dosenList.length}+</div>
            <div className="text-gray-600">Dosen Ahli</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-500 mb-2">{bidan.length}</div>
            <div className="text-gray-600">Dosen Bidan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">{perawat.length}</div>
            <div className="text-gray-600">Dosen Perawat</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">10+</div>
            <div className="text-gray-600">Tahun Pengalaman</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
