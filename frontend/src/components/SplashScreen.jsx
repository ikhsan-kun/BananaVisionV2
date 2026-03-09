import { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(100);
      setTimeout(() => { setFadeOut(true); setTimeout(onComplete, 200); }, 150);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 2);
        if (next === 100) {
          clearInterval(interval);
          setTimeout(() => { setFadeOut(true); setTimeout(onComplete, 500); }, 400);
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  const skip = () => { setFadeOut(true); setTimeout(onComplete, 200); };

  const label =
    progress < 35 ? "Menghubungkan..." :
    progress < 70 ? "Menganalisis..." :
    progress < 95 ? "Menyiapkan..." : "Siap!";

  return (
    <div
      style={{
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
        background: "#16a34a",
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      aria-label="Loading"
    >
      {/* Skip */}
      <button
        onClick={skip}
        className="absolute top-6 right-6 text-xs text-white/50 hover:text-white/80 tracking-widest uppercase transition-colors duration-200"
      >
        Lewati
      </button>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8 px-8 w-full max-w-xs">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1
            className="text-4xl font-bold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            BananaVision
          </h1>
          <p className="text-sm text-white/60 font-light tracking-wide">
            Pendamping Pintar Tanaman Pisang
          </p>
        </div>

        {/* Progress */}
        <div className="w-full space-y-2">
          <div
            className="h-px w-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "rgba(255,255,255,0.9)",
                transition: "width 0.3s ease-out",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/60 font-light">{label}</span>
            <span className="text-xs text-white/70 tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-[10px] text-white/40 tracking-widest uppercase">
        v1.0 · © {new Date().getFullYear()} BananaVision Team
      </p>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;