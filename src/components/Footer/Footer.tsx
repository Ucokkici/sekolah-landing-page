import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-scroll";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Beranda", target: "beranda" },
    { name: "Tentang", target: "tentang" },
    { name: "Program", target: "program" },
    { name: "Fasilitas", target: "fasilitas" },
    { name: "Testimoni", target: "testimoni" },
    { name: "Kontak", target: "kontak" },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__column">
            <motion.div
              className="footer__logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="beranda" spy={true} smooth={true} duration={500}>
                SMK<span>Cool</span>
              </Link>
            </motion.div>
            <p>
              Membentuk generasi muda yang berkualitas, kreatif, dan siap
              menghadapi tantangan industri 4.0
            </p>
            <div className="footer__social">
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </div>

          <div className="footer__column">
            <h3>Link Cepat</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={link.target}
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h3>Kontak Kami</h3>
            <div className="footer__contact">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <p>
                  Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345
                </p>
              </div>
              <div className="contact-item">
                <FaPhone />
                <p>(021) 1234-5678</p>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <p>info@smkcool.sch.id</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} SMK Cool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
