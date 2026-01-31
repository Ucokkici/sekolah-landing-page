import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Auth Context
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Existing Components
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

// New Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import WaitingApprovalPage from "./pages/auth/WaitingApprovalPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import Profile from "./pages/Profile/Profile";
import UserPasswordRequest from "./pages/auth/UserPasswordRequest";

// Admin Pages
import AdminDashboard from "./pages/auth/admin/Dashboard";
import AdminUsers from "./pages/auth/admin/User";
import AdminPengajuan from "./pages/auth/admin/Pengajuan";
import AdminPengajuanDetail from "./pages/auth/admin/Detail";
import AdminAssignment from "./pages/auth/admin/AdminAssignment";
import AdminDataCorrections from "./pages/auth/admin/AdminDataCorrections";
import AdminUserPasswordRequests from "./pages/auth/admin/AdminUserPasswordRequests";

// Asesi Pages
import AsesiDashboard from "./pages/auth/asesi/AsesiDashboard";
import CreatePengajuan from "./pages/auth/asesi/CreatePengajuan";
// Asesor Pages
import AsesorDashboard from "./pages/auth/asesor/AsesorDashboard.tsx";
import AsesorReview from "./pages/auth/asesor/AsesorReview.tsx";

import "./App.scss";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    gsap.set(background, {
      background:
        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
    });

    const colorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
      },
    });

    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #67e8f9 0%, #22d3ee 50%, #06b6d4 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #14b8a6 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1e40af 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    gsap.to(background, {
      backgroundPosition: "200% center",
      ease: "none",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
      },
    });

    const sections = gsap.utils.toArray(".section");
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        scale: 0.95,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      gsap.to(section, {
        scale: 0.98,
        opacity: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    });

    const content = document.querySelectorAll(".content-item");
    content.forEach((item: any) => {
      gsap.to(item, {
        y: -50,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 2,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);

      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const header = document.querySelector("header");
          const headerHeight = header ? header.offsetHeight : 80;

          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <div ref={backgroundRef} className="elegant-background">
        <div className="background-overlay"></div>
      </div>

      <div className="subtle-pattern"></div>

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
      <AuthProvider>
        <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

        <div className="app">
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/program" element={<HomePage />} />
              <Route path="/kompetensi/:id" element={<KompetensiDetail />} />

              {/* Tentang Routes */}
              <Route path="/tentang/profil" element={<ProfilPage />} />
              <Route path="/tentang/sejarah" element={<SejarahPage />} />
              <Route path="/tentang/visi-misi" element={<VisiMisiPage />} />
              <Route path="/tentang/struktur" element={<StructurePage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/waiting-approval"
                element={<WaitingApprovalPage />}
              />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              <Route path="/profile" element={<Profile />} />
              <Route
                path="/password-reset-request"
                element={<UserPasswordRequest />}
              />

              {/* ADMIN ROUTES */}
              <Route
                path="/admin/*"
                element={<ProtectedRoute allowedRoles={["admin"]} />}
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="pengajuan" element={<AdminPengajuan />} />
                <Route
                  path="pengajuan/:id"
                  element={<AdminPengajuanDetail />}
                />
                <Route path="assignment" element={<AdminAssignment />} />✅{" "}
                <Route path="corrections" element={<AdminDataCorrections />} />
                <Route
                  index
                  element={<Navigate to="/admin/dashboard" replace />}
                />
                <Route
                  path="password_reset"
                  element={<AdminUserPasswordRequests />}
                />
              </Route>

              {/* ASESI ROUTES */}
              <Route
                path="/asesi/*"
                element={<ProtectedRoute allowedRoles={["asesi"]} />}
              >
                <Route path="dashboard" element={<AsesiDashboard />} />
                <Route path="pengajuan/create" element={<CreatePengajuan />} />

                {/* --- INI RUTE YANG KURANG --- */}
                <Route path="pengajuan/:id" element={<CreatePengajuan />} />
              </Route>

              {/* ASESOR ROUTES - UPDATED */}
              <Route
                path="/asesor/*"
                element={<ProtectedRoute allowedRoles={["asesor"]} />}
              >
                <Route path="dashboard" element={<AsesorDashboard />} />
                <Route path="review/:id" element={<AsesorReview />} />
                <Route
                  index
                  element={<Navigate to="/asesor/dashboard" replace />}
                />
              </Route>

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
