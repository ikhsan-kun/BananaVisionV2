import React from "react";
import {
  Leaf,
  Camera,
  Activity,
  History,
  ChevronRight,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import StatCard from "../components/StatCard";
import DiseaseCard from "../components/DiseaseCard";

export default function HomePage({ setCurrentPage, diseases }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Leaf className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">AI-Powered Detection</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Deteksi Penyakit
              <br />
              Pohon Pisang dengan AI
            </h1>

            <p className="text-lg md:text-xl mb-8 text-green-50 max-w-3xl mx-auto opacity-95">
              Sistem deteksi cepat dan akurat menggunakan teknologi machine
              learning untuk kesehatan tanaman pisang Anda
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  setCurrentPage ? setCurrentPage("analyze") : null
                }
                className="group bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all transform hover:-translate-y-1 shadow-xl flex items-center gap-3"
                aria-label="Mulai Analisis"
              >
                <Camera className="w-5 h-5 text-green-600 group-hover:scale-105 transition-transform" />
                Mulai Analisis
              </button>

              <button
                onClick={() =>
                  setCurrentPage ? setCurrentPage("diseases") : null
                }
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-green-700/80 to-emerald-700/80 text-white hover:from-green-700 hover:to-emerald-800 transition-shadow shadow-lg"
                aria-label="Pelajari lebih lanjut"
              >
                Pelajari Lebih Lanjut
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Analisis Bulanan"
            value="1.2k"
            Icon={Activity}
            color="from-green-400 to-emerald-500"
            change="+12%"
          />
          <StatCard
            label="Akurasi Model"
            value="95%"
            Icon={TrendingUp}
            color="from-blue-500 to-indigo-500"
            change="+1%"
          />
          <StatCard
            label="Dataset"
            value="10k+"
            Icon={History}
            color="from-yellow-500 to-pink-500"
            change="+8%"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Fitur Unggulan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Camera,
              title: "Deteksi Instan",
              desc: "Upload atau foto langsung untuk analisis cepat",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Activity,
              title: "Akurasi Tinggi",
              desc: "Machine learning dengan akurasi di atas 95%",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: History,
              title: "Riwayat Lengkap",
              desc: "Lacak semua hasil deteksi Anda",
              color: "from-pink-500 to-pink-600",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common Diseases Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Penyakit Umum</h2>
          <button
            onClick={() => (setCurrentPage ? setCurrentPage("diseases") : null)}
            className="flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all"
          >
            Lihat Semua <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {diseases.map((d) => (
            <div
              key={d.id}
              onClick={() =>
                setCurrentPage ? setCurrentPage("diseases") : null
              }
              className="cursor-pointer"
            >
              <DiseaseCard
                disease={d}
                onLearnMore={() =>
                  setCurrentPage ? setCurrentPage("diseases") : null
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="py-12" />
    </div>
  );
}
