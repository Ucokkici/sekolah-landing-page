// File: src/components/Header/Header.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.scss";

import logo from "../../assets/lsp logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    setAboutDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/");
  };

  const handleDashboardClick = () => {
    if (user) {
      closeMenu();
      navigate(`/${user.role}/dashboard`);
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "asesi":
        return "Asesi";
      case "asesor":
        return "Asesor";
      default:
        return role;
    }
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
                <a href="tel:+622154841134" aria-label="Phone">
                  <FaPhone />
                </a>
                <a href="mailto:lspsmkn17jakarta@gmail.com" aria-label="Email">
                  <FaEnvelope />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <RouterLink to="/" onClick={closeMenu}>
                <img
                  src={logo}
                  alt="SMKN 17 Jakarta Logo"
                  className="logo__img"
                />
                <div className="logo__text">
                  <h1>SMKN 17</h1>
                  <p>JAKARTA</p>
                </div>
              </RouterLink>
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
                  <RouterLink to="/" onClick={closeMenu}>
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
                      <RouterLink to="/tentang/profil" onClick={closeMenu}>
                        Profil
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/tentang/sejarah" onClick={closeMenu}>
                        Sejarah
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/tentang/visi-misi" onClick={closeMenu}>
                        Visi & Misi
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/tentang/struktur" onClick={closeMenu}>
                        Struktur Organisasi
                      </RouterLink>
                    </li>
                  </ul>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RouterLink to="/#program" onClick={closeMenu}>
                    Program
                  </RouterLink>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RouterLink to="/#fasilitas" onClick={closeMenu}>
                    Fasilitas
                  </RouterLink>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RouterLink to="/#kontak" onClick={closeMenu}>
                    Kontak
                  </RouterLink>
                </motion.li>

                {/* Auth Menu - Desktop & Mobile */}
                {!isAuthenticated ? (
                  <>
                    <motion.li
                      className="auth-item"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RouterLink
                        to="/login"
                        onClick={closeMenu}
                        className="btn-login"
                      >
                        Login
                      </RouterLink>
                    </motion.li>
                    <motion.li
                      className="auth-item"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RouterLink
                        to="/register"
                        onClick={closeMenu}
                        className="btn-register"
                      >
                        Register
                      </RouterLink>
                    </motion.li>
                  </>
                ) : (
                  <motion.li
                    className="nav-item-dropdown user-dropdown"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="dropdown-toggle user-toggle"
                      onClick={toggleUserDropdown}
                    >
                      <FaUser className="user-icon" />
                      <div className="user-info">
                        <span className="user-name">{user?.nama_lengkap}</span>
                      </div>
                      <FaChevronDown
                        className={`dropdown-icon ${
                          userDropdownOpen ? "open" : ""
                        }`}
                      />
                    </div>
                    <ul
                      className={`dropdown-menu user-menu ${
                        userDropdownOpen ? "open" : ""
                      }`}
                    >
                      <li>
                        <button onClick={handleDashboardClick}>
                          <FaTachometerAlt /> Dashboard
                        </button>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <button onClick={handleLogout} className="logout-btn">
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </ul>
                  </motion.li>
                )}
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
