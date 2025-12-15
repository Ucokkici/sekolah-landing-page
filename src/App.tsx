import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    // Initial state - Deep Ocean Blue
    gsap.set(background, {
      background:
        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
    });

    // Main color timeline
    const colorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
      },
    });

    // Section 1: Sky Blue - Fresh & Bright
    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    // Section 2: Turquoise Blue - Modern & Clean
    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #67e8f9 0%, #22d3ee 50%, #06b6d4 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    // Section 3: Teal Blue - Sophisticated & Calm
    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #14b8a6 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    // Section 4: Navy Blue - Professional & Deep
    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    // Section 5: Slate Blue - Elegant Finish
    colorTimeline.to(background, {
      background:
        "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1e40af 100%)",
      ease: "power1.inOut",
      duration: 1,
    });

    // Floating animation untuk background (subtle wave effect)
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

    // Parallax effect untuk sections (jika ada element section)
    const sections = gsap.utils.toArray(".section");
    sections.forEach((section: any) => {
      // Fade in animation
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

      // Subtle scale effect on scroll
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

    // Smooth blur effect saat scroll (optional - untuk content)
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
      {/* Background dengan transisi warna smooth */}
      <div ref={backgroundRef} className="elegant-background">
        <div className="background-overlay"></div>
      </div>

      {/* Pattern halus untuk menambah depth */}
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
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/program" element={<HomePage />} />
            <Route path="/kompetensi/:id" element={<KompetensiDetail />} />

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
