"use client"
import { useState } from "react";

const programs = [
  {
    id: 1,
    title: "Become a Professional Full Stack Developer",
    category: "Programming",
    rating: 4.8,
    students: "2.1k siswa",
    level: "Beginner to Advanced"
  },
  {
    id: 2,
    title: "Big 4 Auditor & Financial Analyst",
    category: "Finance",
    rating: 4.9,
    students: "1.8k siswa",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Mastering Webflow",
    category: "Design",
    rating: 4.7,
    students: "950 siswa",
    level: "Beginner"
  },
  {
    id: 4,
    title: "Become a Professional Backend Developer",
    category: "Programming",
    rating: 4.8,
    students: "1.5k siswa",
    level: "Advanced"
  }
];

const filters = ["Semua Program", "Programming", "Design", "Finance", "Marketing"];

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState("Semua Program");
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8">PAKET CBT TERSEDIA</h3>
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeFilter === filter 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs
            .filter((program) => activeFilter === "Semua Program" || program.category === activeFilter)
            .map((program) => (
              <div key={program.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                <div className="relative h-48 bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-90"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold leading-tight">{program.title}</h4>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{program.level}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{program.students}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
