import React, { useState } from "react";
import { Leaf } from "lucide-react";
import { loginWithGoogle } from "../hooks/data";

export default function LoginPage({ handleLogin, setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      setLoading(true);

      console.log("🔵 Starting Google login...");
      
      const data = await loginWithGoogle();
      
      console.log("✅ Login response received:", data);

      // Handle different response structures
      const userData = data.data?.user || data.user;
      const token = data.data?.token || data.token;

      if (!userData || !token) {
        throw new Error("Invalid response from server");
      }

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("✅ Login successful, token stored");

      // Call parent handler
      if (handleLogin) {
        handleLogin({ user: userData, token });
      }

      // Optional: Show success message
      alert("Login berhasil! Selamat datang, " + userData.name);
      
    } catch (err) {
      console.error("❌ Google login error:", err);
      
      // More specific error messages
      let errorMessage = "Login gagal. Silakan coba lagi.";
      
      if (err.message.includes("popup")) {
        errorMessage = "Popup diblokir oleh browser. Mohon izinkan popup untuk login.";
      } else if (err.message.includes("network")) {
        errorMessage = "Koneksi gagal. Periksa internet Anda.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    // Validasi email dan password
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    // Implement your email login logic here
    console.log("Email login not implemented yet");
    setError("Login dengan email belum tersedia");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang
            </h2>
            <p className="text-gray-600">
              Login untuk mulai menggunakan sistem deteksi
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-md hover:shadow-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Login dengan Google"
            disabled={loading}
          >
            {!loading && (
              <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Memproses...
              </span>
            ) : (
              "Login dengan Google"
            )}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                atau masuk dengan email
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
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
                className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 outline-none"
                placeholder="••••••••"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="form-checkbox" /> Ingat saya
              </label>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage ? setCurrentPage("register") : null
                }
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Belum punya akun?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:from-green-600 hover:to-emerald-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Masuk
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Dengan masuk, Anda menyetujui syarat dan ketentuan kami
          </p>
        </div>
      </div>
    </div>
  );
}