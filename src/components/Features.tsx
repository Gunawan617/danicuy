"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// === DATA FITUR ===
const features = [
  {
    icon: "💻",
    title: "Pelatihan Online LKOM Gratis",
    description: "Sistem belajar terbukti efektif untuk meningkatkan kemampuan",
  },
  {
    icon: "👥",
    title: "Mentor Berpengalaman",
    description: "Coaching dari mentor industri yang sudah berpengalaman bertahun-tahun",
  },
  {
    icon: "🎯",
    title: "Alur Materi Terbaik",
    description: "Materi pembelajaran disusun sistematis dan mudah dipahami",
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

// === KOMPONEN CARD DOSEN ===
function DosenCard({ name, src, category }: { name: string; src: string; category: string }) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ minWidth: 90, maxWidth: 90, marginLeft: 8, marginRight: 8 }}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-400 mb-2 bg-gray-100">
        <Image src={src} alt={name} width={80} height={80} className="object-cover w-full h-full" />
      </div>
      <div className="text-center">
        <div className="font-semibold text-gray-800 text-xs mb-1 line-clamp-2">{name}</div>
        <div className="text-xs text-gray-500">{category}</div>
      </div>
    </div>
  );
}

// === LOADING DOTS ===
function LoadingDots() {
  return (
    <div className="flex justify-center items-center mb-4">
      <span className="block w-2 h-2 bg-orange-500 rounded-full animate-bounce mr-1" style={{ animationDelay: "0ms" }} />
      <span className="block w-2 h-2 bg-orange-500 rounded-full animate-bounce mr-1" style={{ animationDelay: "150ms" }} />
      <span className="block w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

// === KOMPONEN UTAMA ===
export default function Features() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Gandakan list supaya infinite scroll mulus
  const infiniteDosen = [...dosenList, ...dosenList];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.style.scrollBehavior = "auto";
    el.style.setProperty("overflow-anchor", "none");

    let frame = 0;
    let running = true;
    let last = performance.now();
    let halfWidth = el.scrollWidth / 2;

    const ro = new ResizeObserver(() => {
      halfWidth = el.scrollWidth / 2;
    });
    ro.observe(el);

    const timer = setTimeout(() => setLoading(false), 1200);

    const SPEED = 40; // px per detik

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(64, now - last);
      last = now;

      el.scrollLeft += (SPEED * dt) / 1000;

      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="py-16 bg-white mt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Program Kami</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-4">Dosen Pengajar</h3>
        {loading && <LoadingDots />}

        <div className="relative py-4">
          <div
            ref={scrollRef}
            className="flex no-scrollbar select-none"
            style={{
              overflowX: "hidden",
              width: "100%",
            }}
            aria-label="Marquee dosen"
          >
            {infiniteDosen.map((dosen, idx) => (
              <DosenCard key={dosen.name + idx} {...dosen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
