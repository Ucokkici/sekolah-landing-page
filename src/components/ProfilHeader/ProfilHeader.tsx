import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import "./ProfilHeader.scss";

const ProfilHeader = () => {
  return (
    <div className="profil-header">
      <div className="contact-info">
        <div className="contact-item">
          <FaPhone /> (021) 5484134
        </div>
        <div className="contact-item">
          <FaEnvelope /> info@smkcool.sch.id
        </div>
      </div>
      <div className="social-links">
        <a href="#">
          <FaFacebookF />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default ProfilHeader;
