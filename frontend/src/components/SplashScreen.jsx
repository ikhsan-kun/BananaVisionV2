import React, { useState, useEffect } from "react";
import { Leaf } from "lucide-react";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 300);
      }, 200);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 3);
        if (next === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }, 500);
        }
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getMessage = () => {
    if (progress < 30) return "Menghubungkan...";
    if (progress < 60) return "Menganalisis Model...";
    if (progress < 90) return "Optimasi Sistem...";
    return "Selamat Datang!";
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(at_center_top,_var(--tw-gradient-stops))] from-emerald-500 via-green-600 to-emerald-700 transition-opacity duration-1000 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading"
    >
      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(onComplete, 250);
        }}
        className="absolute top-8 right-8 text-white/50 hover:text-white/80 text-sm font-light tracking-wide transition-all duration-300"
      >
        Lewati
      </button>

      <div className="flex flex-col items-center space-y-12 max-w-md px-8">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md"></div>
          <div className="relative w-28 h-28 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
            <Leaf className="w-14 h-14 text-green-300 animate-[pulse_2s_infinite]" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tighter drop-shadow-md">
            BananaVision
          </h1>
          <p className="text-md text-white/70 font-medium tracking-wide">
            Pendamping Pintar untuk Tanaman Pisang Anda
          </p>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 transition-all duration-500 ease-out transform origin-left"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-white/60 font-light">{getMessage()}</p>
            <p className="text-sm text-white font-medium">{progress}%</p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-8 text-xs text-white/40 font-light tracking-wider">
        Versi 1.0 • © {new Date().getFullYear()} BananaAI Team
      </p>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
