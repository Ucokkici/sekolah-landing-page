import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimeCharacter from "../components/AnimeCharacter/AnimeCharacter";
import "./HeroSection.scss";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Wujudkan Kompetensi, Raih Sertifikasi Profesional";

  // Animasi mengetik
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 80;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!subtitle || !cta) return;

    gsap.from(subtitle, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 2,
      ease: "power3.out",
    });

    gsap.from(cta, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 2.3,
      ease: "power3.out",
    });

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <section id="beranda" className="hero" ref={heroRef}>
      <div className="container">
        <div className={`hero__content ${isMobile ? "mobile" : ""}`}>
          <div className="hero__text-wrapper">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayedText}
              {showCursor && <span className="typing-cursor"></span>}
            </motion.h1>

            <motion.p
              ref={subtitleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              LSP SMKN 17 Jakarta, lembaga sertifikasi resmi berlisensi BNSP,
              siap membantu Anda membuktikan keahlian dan mendapatkan pengakuan
              dari industri.
            </motion.p>

            <motion.div
              ref={ctaRef}
              className="hero__cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
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
          <AnimeCharacter />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
