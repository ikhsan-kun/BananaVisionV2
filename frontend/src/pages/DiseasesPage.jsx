import React, { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import DiseaseCard from "../components/DiseaseCard";

export default function DiseasesPage({ diseases }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Katalog Penyakit
            </h1>
            <p className="text-gray-600">
              Pelajari tentang penyakit pohon pisang
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {diseases.map((disease) => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              onLearnMore={setSelected}
            />
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selected.name}
                </h2>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                    selected.severity === "critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {selected.severity === "critical"
                    ? "Tingkat Kritis"
                    : "Perlu Perhatian"}
                </div>
                <p className="text-gray-700 mt-3">{selected.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Gejala
                </h3>
                <ul className="space-y-2">
                  {selected.symptoms.map((s, i) => (
                    <li
                      key={i}
                      className="text-gray-700 text-sm flex items-start gap-2"
                    >
                      <span className="text-red-500 mt-1">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Pencegahan
                </h3>
                <ul className="space-y-2">
                  {selected.prevention.map((p, i) => (
                    <li
                      key={i}
                      className="text-gray-700 text-sm flex items-start gap-2"
                    >
                      <span className="text-green-500 mt-1">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
