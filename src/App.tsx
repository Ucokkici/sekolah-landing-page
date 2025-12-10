import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- HAPUS IMPORT REACT-SCROLL ---
// Tidak ada lagi import dari react-scroll

// Import Komponen
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";
import HeroSection from "./sections/HeroSection.tsx";
import AboutSection from "./sections/AboutSection.tsx";
import ProgramsSection from "./sections/ProgramSection.tsx";
import FacilitiesSection from "./sections/FacilitiesSection.tsx";
import ContactSection from "./sections/ContactSection.tsx";
import KompetensiDetail from "./pages/KompetensiDetail.tsx";
import ProfilPage from "./pages/ProfilPage";
import SejarahPage from "./pages/SejarahPage";
import VisiMisiPage from "./pages/VisiMisiPage";
import StructurePage from "./pages/StructurePage";

import "./App.scss";

// Daftarkan plugin GSAP
gsap.registerPlugin(ScrollTrigger);

// Komponen untuk halaman utama dengan semua section
const HomePage = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set warna awal body ke cyan
    gsap.set("body", { backgroundColor: "#00FFFF" });

    // Timeline untuk efek gradiasi
    const colorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current, // Gunakan main sebagai trigger
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Animasi mengikuti scroll
      },
    });

    // Tahap 1: Dari Cyan ke Biru Muda
    colorTimeline.to("body", {
      backgroundColor: "#38bdf8", // Biru Muda
      ease: "none",
      duration: 1,
    });

    // Tahap 2: Dari Biru Muda ke Biru Tua
    colorTimeline.to("body", {
      backgroundColor: "#0f172a", // Biru Tua
      ease: "none",
      duration: 1,
    });

    // --- Cleanup ---
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Dependency array kosong agar hanya dijalankan sekali

  // --- PERUBAHAN: Gunakan JavaScript Native untuk scroll ---
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);

      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          // --- SOLUSI TERBAIK: Hitung posisi offset secara manual ---
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80; // Ambil tinggi header, fallback ke 80px
          
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth" // Animasi smooth
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      {/* --- BACKGROUND ANIMASI BARU --- */}
      <div className="background">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>

      {/* --- LATAR BELAKANG ANIMASI LAMA --- */}
      <div className="app__rings">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "10% 10%", "0% 0%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="app__bubbles">
        <motion.div
          className="app__bubble app__bubble--1"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="app__bubble app__bubble--2"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="app__particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="app__particle"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Konten Utama Homepage tanpa Header/Footer */}
      <main ref={mainRef}>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <FacilitiesSection />
        <ContactSection />
      </main>
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      
      {/* Header dan Footer ada di sini, membungkus Routes */}
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/program" element={<HomePage />} />
            <Route path="/kompetensi/:id" element={<KompetensiDetail />} />
            
            {/* --- RUTE UNTUK SUBMENU "TENTANG" --- */}
            <Route path="/tentang/profil" element={<ProfilPage />} />
            <Route path="/tentang/sejarah" element={<SejarahPage />} />
            <Route path="/tentang/visi-misi" element={<VisiMisiPage />} />
            <Route path="/tentang/struktur" element={<StructurePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;