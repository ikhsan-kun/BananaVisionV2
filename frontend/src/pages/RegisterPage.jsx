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
              <label className="text-sm font-medium text-gray-700">Nama</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="input-modern mt-1.5"
                placeholder="Nama lengkap"
                aria-label="Nama"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="input-modern mt-1.5"
                placeholder="you@example.com"
                aria-label="Email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="input-modern mt-1.5"
                placeholder="••••••••"
                aria-label="Password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
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
            className="btn-ghost w-full"
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
