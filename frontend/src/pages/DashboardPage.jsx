import React from "react";
import {
  Activity,
  CheckCircle,
  AlertCircle,
  Camera,
  History,
  ChevronRight,
} from "lucide-react";
import StatCard from "../components/StatCard";

export default function DashboardPage({ user, historyData, setCurrentPage }) {
  const stats = [
    {
      label: "Total Analisis",
      value: historyData.length,
      Icon: Activity,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
    },
    {
      label: "Terdeteksi Sehat",
      value: historyData.filter((h) => h.status === "healthy").length,
      Icon: CheckCircle,
      color: "from-green-500 to-green-600",
      change: "+8%",
    },
    {
      label: "Perlu Perhatian",
      value: historyData.filter((h) => h.status === "warning").length,
      Icon: AlertCircle,
      color: "from-yellow-500 to-yellow-600",
      change: "-5%",
    },
    {
      label: "Status Kritis",
      value: historyData.filter((h) => h.status === "critical").length,
      Icon: AlertCircle,
      color: "from-red-500 to-red-600",
      change: "-15%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-xl shadow-md"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Selamat datang, {user?.name}
              </h1>
              <p className="text-sm text-gray-600">
                Lihat rangkuman aktivitas dan mulai analisis baru
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage("analyze")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
            >
              <Camera className="w-5 h-5" />
              Analisis Baru
            </button>
            <button
              onClick={() => setCurrentPage("history")}
              className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg font-medium border border-gray-100 shadow-sm hover:bg-gray-50 transition"
            >
              <History className="w-4 h-4 text-gray-700" />
              Riwayat
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              label={s.label}
              value={s.value}
              Icon={s.Icon}
              color={s.color}
              change={s.change}
            />
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => setCurrentPage("analyze")}
            className="cursor-pointer bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mulai Analisis</h3>
                <p className="text-white/90">
                  Upload gambar atau ambil foto daun pisang
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setCurrentPage("diseases")}
            className="cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Pelajari Penyakit
                </h3>
                <p className="text-gray-600">
                  Panduan gejala dan pencegahan untuk tiap penyakit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Aktivitas Terbaru
            </h2>
            <button
              onClick={() => setCurrentPage("history")}
              className="text-green-600 font-semibold flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {historyData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Belum ada aktivitas. Mulai analisis pertama Anda sekarang.
              </div>
            )}

            {historyData.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage("history")}
                className="w-full text-left flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src={item.image}
                  alt={item.disease}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {item.disease}
                  </div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === "healthy"
                      ? "bg-green-100 text-green-700"
                      : item.status === "warning"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.confidence}%
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
