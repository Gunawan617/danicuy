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
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = wrap(index - 1);
  const nextIndex = wrap(index + 1);

  return (
    <section className="bg-[#484848] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              LOREM IPSUM SIT<br />AMET DOLOR
            </h1>
            <p className="text-gray-300 mb-8 text-base">
              ULTRICIES LEO ET IMPERDIET DULLA
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-orange-600 transition duration-300">
              Gabung sekarang
            </button>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-300">
              <span className="flex items-center">
                <span className="w-4 h-4 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </span>
                Free trial
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </span>
                Bersertifikat
              </span>
              <span className="flex items-center">
                <span className="w-4 h-4 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                </span>
                Berpengalaman
              </span>
            </div>
          </div>

          {/* Right Content (Carousel) */}
          <div>
            <div className="flex items-center justify-center">
  {/* Prev kecil */}
  <motion.div
    key={prevIndex}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 0.8 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="w-50 h-78 rounded-lg overflow-hidden shadow-lg 
               hidden md:block relative z-0 -mr-6"
  >
    <img
      src={team[prevIndex].photo}
      alt={team[prevIndex].name}
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* Current besar */}
  <motion.div
    key={index}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
    className="w-45 h-64 md:w-64 md:h-80 rounded-2xl 
               overflow-hidden shadow-2xl border border-white/10 relative z-10"
  >
    <img
      src={team[index].photo}
      alt={team[index].name}
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* Next kecil */}
  <motion.div
    key={nextIndex}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 0.8 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="w-50 h-78 rounded-lg overflow-hidden shadow-lg 
               hidden md:block relative z-0 -ml-6"
  >
    <img
      src={team[nextIndex].photo}
      alt={team[nextIndex].name}
      className="w-full h-full object-cover"
    />
  </motion.div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
}
