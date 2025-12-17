import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // Dipakai untuk logo
import { Link as RouterLink } from "react-router-dom"; // Dipakai untuk navigasi utama
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaChevronDown,
} from "react-icons/fa";
import "./Header.scss";

import logo from "../../assets/lsp logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  return (
    <div className="header-wrapper">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar__content">
            <div className="top-bar__left">
              <p>
                <FaPhone /> (021) 5484134
              </p>
              <p>
                <FaEnvelope /> lspsmkn17jakarta@gmail.com
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

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="header__content">
            {/* Logo tetap menggunakan ScrollLink untuk scroll ke hero section */}
            <motion.div
              className="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScrollLink to="hero" spy={true} smooth={true} duration={500}>
                <img
                  src={logo}
                  alt="SMKN 17 Jakarta Logo"
                  className="logo__img"
                />
                <div className="logo__text">
                  <h1>SMKN 17</h1>
                  <p>JAKARTA</p>
                </div>
              </ScrollLink>
            </motion.div>

            {/* Navigasi Utama */}
            <nav className={`nav ${isOpen ? "open" : ""}`}>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* --- PERUBAHAN: Gunakan RouterLink untuk navigasi halaman --- */}
                  <RouterLink to="/#" onClick={closeMenu}>
                    Beranda
                  </RouterLink>
                </motion.li>

                <motion.li
                  className="nav-item-dropdown"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="dropdown-toggle"
                    onClick={toggleAboutDropdown}
                  >
                    <span>Tentang</span>
                    <FaChevronDown
                      className={`dropdown-icon ${
                        aboutDropdownOpen ? "open" : ""
                      }`}
                    />
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      aboutDropdownOpen ? "open" : ""
                    }`}
                  >
                    <li>
                      <RouterLink
                        to="/tentang/profil"
                        onClick={() => {
                          closeMenu();
                          setAboutDropdownOpen(false);
                        }}
                      >
                        Profil
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/tentang/sejarah"
                        onClick={() => {
                          closeMenu();
                          setAboutDropdownOpen(false);
                        }}
                      >
                        Sejarah
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/tentang/visi-misi"
                        onClick={() => {
                          closeMenu();
                          setAboutDropdownOpen(false);
                        }}
                      >
                        Visi & Misi
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/tentang/struktur"
                        onClick={() => {
                          closeMenu();
                          setAboutDropdownOpen(false);
                        }}
                      >
                        Struktur Organisasi
                      </RouterLink>
                    </li>
                  </ul>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* --- PERUBAHAN: Gunakan RouterLink dengan hash --- */}
                  <RouterLink to="/#program" onClick={closeMenu}>
                    Program
                  </RouterLink>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* --- PERUBAHAN: Gunakan RouterLink dengan hash --- */}
                  <RouterLink to="/#fasilitas" onClick={closeMenu}>
                    Fasilitas
                  </RouterLink>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* --- PERUBAHAN: Gunakan RouterLink dengan hash --- */}
                  <RouterLink to="/#kontak" onClick={closeMenu}>
                    Kontak
                  </RouterLink>
                </motion.li>
              </motion.ul>
            </nav>

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
