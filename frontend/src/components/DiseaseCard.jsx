import React from "react";
import { AlertCircle } from "lucide-react";

export default function DiseaseCard({ disease, onLearnMore }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="aspect-video overflow-hidden">
        <img
          src={disease.image}
          alt={disease.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            disease.severity === "critical"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          {disease.severity === "critical" ? "Kritis" : "Perhatian"}
        </div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">{disease.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {disease.description}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onLearnMore && onLearnMore(disease)}
            className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-1"
          >
            Pelajari
          </button>
        </div>
      </div>
    </div>
  );
}
