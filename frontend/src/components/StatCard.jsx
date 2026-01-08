import React from "react";

export default function StatCard({
  label,
  value,
  Icon,
  color = "from-blue-500 to-blue-600",
  change = "",
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}
        >
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
        <span
          className={`text-sm font-semibold ${
            change.startsWith("+") ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
