// src/components/Header.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import "./Header.scss";

// 1. Impor file logo Anda
import logo from "../../assets/lsp logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 100px untuk memberi ruang bagi top-bar
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    // 2. Pembungkus untuk seluruh header
    <div className="header-wrapper">
      {/* 3. Bar Atas untuk Informasi Kontak */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar__content">
            <div className="top-bar__left">
              <p>
                <FaPhone /> (021) 5484134
              </p>
              <p>
                <FaEnvelope /> info@smkn17jkt.sch.id
              </p>
            </div>
            <div className="top-bar__right">
              <span>Follow Us :</span>
              <div className="social-icons">
                <FaPhone />
                <FaEnvelope />
                <FaInstagram />
                <FaFacebook />
                <FaTiktok />
                <FaYoutube />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Utama (Navigasi) */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header__content">
            {/* Logo */}
            <motion.div
              className="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="hero" spy={true} smooth={true} duration={500}>
                {/* 4. Gunakan logo yang diimpor */}
                <img
                  src={logo}
                  alt="SMKN 17 Jakarta Logo"
                  className="logo__img"
                />
                <div className="logo__text">
                  <h1>SMKN 17</h1>
                  <p>JAKARTA</p>
                </div>
              </Link>
            </motion.div>

            {/* Navigasi Utama */}
            <nav className={`nav ${isOpen ? "open" : ""}`}>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {["Beranda", "Tentang", "Program", "Fasilitas", "Kontak"].map(
                  (item) => (
                    <motion.li
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.toLowerCase()}
                        spy={true}
                        smooth={true}
                        duration={500}
                        onClick={closeMenu}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </nav>

            {/* Tombol Menu Mobile */}
            <div className="menu-toggle" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
