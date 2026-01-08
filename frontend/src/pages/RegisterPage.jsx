import React, { useState } from "react";
import { Leaf } from "lucide-react";

export default function RegisterPage({ handleLogin, setCurrentPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Buat Akun Baru
            </h2>
            <p className="text-gray-600">
              Daftar untuk mulai menggunakan BananaAI
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // simple mock register -> login
              handleLogin && handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-gray-600">Nama</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 outline-none"
                placeholder="Nama lengkap"
                aria-label="Nama"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 outline-none"
                placeholder="you@example.com"
                aria-label="Email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 outline-none"
                placeholder="••••••••"
                aria-label="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:from-green-600 hover:to-emerald-700 transition shadow-lg"
            >
              Daftar
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">atau</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage && setCurrentPage("login")}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-md hover:shadow-lg"
          >
            Sudah punya akun? Masuk
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Dengan mendaftar, Anda menyetujui syarat dan ketentuan kami
          </p>
        </div>
      </div>
    </div>
  );
}
