import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimeCharacter from "../components/AnimeCharacter/AnimeCharacter";
import "./HeroSection.scss";

// Mendaftarkan plugin ScrollTrigger dari GSAP
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  // Refs untuk elemen-elemen yang akan dianimasikan
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const particles = particlesRef.current;

    if (!hero || !title || !subtitle || !cta || !particles) return;

    // --- ANIMASI GSAP ---

    // 1. Efek Parallax untuk background saat scroll
    gsap.to(hero.querySelector(".hero__background"), {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 2. Animasi teks masuk dari bawah dengan efek fade-in
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(subtitle, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      ease: "power3.out",
    });

    gsap.from(cta, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 1.1,
      ease: "power3.out",
    });

    // 3. Membuat dan menganimasikan partikel
    const particleCount = 50;
    const particlesArray: HTMLElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      particles.appendChild(particle);
      particlesArray.push(particle);
    }

    particlesArray.forEach((particle) => {
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;

      gsap.to(particle, {
        y: -100,
        x: Math.random() * 100 - 50,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // 4. Efek hover pada tombol CTA
    const buttons = cta.querySelectorAll("a");
    buttons.forEach((button) => {
      const buttonEl = button as HTMLElement;
      buttonEl.addEventListener("mouseenter", () => {
        gsap.to(buttonEl, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      buttonEl.addEventListener("mouseleave", () => {
        gsap.to(buttonEl, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // --- CLEANUP FUNCTION ---
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      particlesArray.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <section id="beranda" className="hero" ref={heroRef}>
      <div className="hero__rings"></div>
      <div className="hero__background"></div>
      <div className="hero__particles" ref={particlesRef}></div>

      {/* --- TAMBAHKAN KOMPONEN GELEMBUNG UNGU --- */}
      <div className="hero__bubbles"></div>

      <div className="container">
        {/* Container utama dengan layout flexbox */}
        <div className="hero__content">
          {/* Wrapper untuk teks di sebelah kiri */}
          <div className="hero__text-wrapper">
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Wujudkan Kompetensi, Raih Sertifikasi Profesional
            </motion.h1>
            <motion.p
              ref={subtitleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              LSP SMKN 17 Jakarta, lembaga sertifikasi resmi berlisensi BNSP, siap membantu Anda membuktikan keahlian dan mendapatkan pengakuan dari industri.
            </motion.p>
            <motion.div
              ref={ctaRef}
              className="hero__cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* DIKEMBALIKAN: Teks dan link tombol CTA ke versi asli */}
              <Link
                to="kontak"
                spy={true}
                smooth={true}
                duration={500}
                className="btn btn-primary"
              >
                Kontak
              </Link>
              <Link
                to="tentang"
                spy={true}
                smooth={true}
                duration={500}
                className="btn btn-outline"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </div>

          {/* Komponen gambar di sebelah kanan */}
          <AnimeCharacter />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;