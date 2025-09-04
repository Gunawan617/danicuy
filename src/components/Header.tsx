// src/components/Header.tsx
"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#484848] sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="bg-white px-3 py-1 rounded">
          <span className="font-bold text-black text-sm">LOGO</span>
        </div>
        <nav className="flex space-x-8 text-white text-sm">
          <Link href="#" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">Berkas</Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">Tentang Kami</Link>
        </nav>
        <div className="flex space-x-3">
          <button className="text-white text-sm hover:text-orange-400 transition-colors">Masuk</button>
          <button className="bg-white text-black px-4 py-1 rounded text-sm hover:bg-gray-100 transition-colors">Registrasi</button>
        </div>
      </div>
    </header>
  );
}