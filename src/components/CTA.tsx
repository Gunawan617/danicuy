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
  const loopedTeam = [...team, ...team];

  return (
    <section className="bg-gray-600 py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Masih Bingung Mau Join apa<br />Tidak ?
            </h2>
            <p className="text-gray-200 mb-6 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur. Viverra et 
              magna bibendum diam augue amet sed ac dui.
            </p>
            <div className="flex max-w-md">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 px-4 py-2 rounded-l text-gray-800 text-sm"
              />
              <button className="bg-orange-500 px-4 py-2 rounded-r text-white hover:bg-orange-600 transition duration-300 text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Content → Carousel */}
          <div className="bg-gray-500 rounded-lg p-6 text-center text-white overflow-hidden">
            <button className="bg-white text-gray-800 px-4 py-2 rounded mb-4 hover:bg-gray-100 transition duration-300 text-sm">
              With Animas
            </button>
            <h3 className="text-lg font-bold mb-4">
              Bertemu professional<br />dan pelajari
            </h3>

            {/* Auto-scroll row */}
          <motion.div
  className="flex gap-4"
  animate={{ x: ["0%", "-50%"] }}
  transition={{
    repeat: Infinity,
    duration: 12,
    ease: "linear",
  }}
>
  {loopedTeam.map((member, i) => (
    <div
      key={i}
      className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-lg border border-white/10 flex-shrink-0"
    >
      <img
        src={member.photo}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</motion.div>


            <p className="text-gray-200 text-xs md:text-sm mt-4">
              Bergabunglah dengan komunitas profesional dan tingkatkan skill Anda
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
