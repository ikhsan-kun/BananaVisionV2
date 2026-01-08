import React, { useState, useRef, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AnalyzePage from "./pages/AnalyzePage";
import HistoryPage from "./pages/HistoryPage";
import DiseasesPage from "./pages/DiseasesPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SplashScreen from "./components/SplashScreen";
import InstallPrompt from "./components/InstallPrompt";
import OfflineIndicator from "./components/OfflineIndicator";
import { getToken, removeToken } from "./utils/token";

const mockUser = {
  id: "1",
  name: "User Demo",
  email: "demo@example.com",
  avatar:
    "https://ui-avatars.com/api/?name=User+Demo&background=10b981&color=fff",
};

const InnerApp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [token, setToken] = useState(getToken());
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      disease: "Panama Disease",
      confidence: 95,
      date: "2024-12-20",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
      status: "critical",
    },
    {
      id: 2,
      disease: "Healthy",
      confidence: 98,
      date: "2024-12-19",
      image:
        "https://images.unsplash.com/photo-1603833797131-3c0a6e8dc2e3?w=400",
      status: "healthy",
    },
    {
      id: 3,
      disease: "Black Sigatoka",
      confidence: 87,
      date: "2024-12-18",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
      status: "warning",
    },
  ]);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const diseases = [
    {
      id: 1,
      name: "Panama Disease (Fusarium Wilt)",
      description:
        "Penyakit layu fusarium adalah penyakit serius yang disebabkan oleh jamur Fusarium oxysporum. Menyebabkan daun menguning dan layu.",
      symptoms: [
        "Daun menguning dari tepi",
        "Layu mendadak",
        "Pembuluh berubah warna coklat",
        "Tanaman mati",
      ],
      prevention: [
        "Gunakan bibit tahan penyakit",
        "Sanitasi alat",
        "Rotasi tanaman",
        "Drainase baik",
      ],
      severity: "critical",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    },
    {
      id: 2,
      name: "Black Sigatoka",
      description:
        "Penyakit bercak daun yang disebabkan jamur Mycosphaerella fijiensis. Mengurangi area fotosintesis dan produksi buah.",
      symptoms: [
        "Bercak coklat kehitaman",
        "Daun mengering",
        "Produktivitas menurun",
        "Buah matang prematur",
      ],
      prevention: [
        "Pemangkasan daun sakit",
        "Fungisida",
        "Sanitasi kebun",
        "Varietas tahan",
      ],
      severity: "warning",
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400",
    },
    {
      id: 3,
      name: "Banana Bunchy Top Virus",
      description:
        "Virus yang ditularkan kutu daun, menyebabkan daun mengkerut dan tanaman kerdil.",
      symptoms: [
        "Daun sempit dan tegak",
        "Tanaman kerdil",
        "Garis gelap di tangkai",
        "Tidak berbuah",
      ],
      prevention: [
        "Kontrol kutu daun",
        "Cabut tanaman sakit",
        "Bibit sehat",
        "Karantina area",
      ],
      severity: "critical",
      image:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400",
    },
  ];

  const pathMap = {
    home: "/",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    analyze: "/analyze",
    history: "/history",
    diseases: "/diseases",
    profile: "/profile",
  };

  useEffect(() => {
    if (!location || !location.pathname) return;
    const path = location.pathname;
    const found = Object.entries(pathMap).find(
      ([, p]) => p === path || path.startsWith(p + "/")
    );
    if (found) setCurrentPage(found[0]);
    else if (path === "/") setCurrentPage("home");
  }, [location]);

  const goTo = (page) => {
    setCurrentPage(page);
    const path = pathMap[page] || "/";
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogin = () => {
    setUser(mockUser);
    goTo("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    goTo("home");
    setSidebarOpen(false);
    removeToken();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const mockResults = [
        { disease: "Panama Disease", confidence: 95, severity: "critical" },
        { disease: "Black Sigatoka", confidence: 87, severity: "warning" },
        { disease: "Healthy", confidence: 98, severity: "healthy" },
      ];
      const randomResult =
        mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setAnalyzing(false);

      const newHistory = {
        id: historyData.length + 1,
        disease: randomResult.disease,
        confidence: randomResult.confidence,
        date: new Date().toISOString().split("T")[0],
        image: selectedImage,
        status: randomResult.severity,
      };
      setHistoryData([newHistory, ...historyData]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {token !== null ? (
        <Navigation
          user={user}
          currentPage={currentPage}
          setCurrentPage={goTo}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />
      ) : (
        ""
      )}
      <Routes>
        <Route
          path="/"
          element={<HomePage setCurrentPage={goTo} diseases={diseases} />}
        />
        <Route
          path="/login"
          element={
            <LoginPage handleLogin={handleLogin} setCurrentPage={goTo} />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage handleLogin={handleLogin} setCurrentPage={goTo} />
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardPage
                user={user}
                historyData={historyData}
                setCurrentPage={goTo}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/analyze"
          element={
            user ? (
              <AnalyzePage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                analyzing={analyzing}
                result={result}
                handleImageSelect={handleImageSelect}
                handleAnalyze={handleAnalyze}
                setCurrentPage={goTo}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/history"
          element={
            user ? (
              <HistoryPage historyData={historyData} setCurrentPage={goTo} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/diseases"
          element={<DiseasesPage diseases={diseases} />}
        />

        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage
                user={user}
                historyData={historyData}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <InstallPrompt />
      <OfflineIndicator />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <InnerApp />
  </BrowserRouter>
);

const AppWithSplash = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1800); // backup timeout
    return () => clearTimeout(t);
  }, []);

  return showSplash ? (
    <SplashScreen onComplete={() => setShowSplash(false)} />
  ) : (
    <App />
  );
};

export default AppWithSplash;
