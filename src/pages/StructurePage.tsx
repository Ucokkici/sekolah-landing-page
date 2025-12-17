import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, X } from "lucide-react";
import "../sections/AboutSection.scss";
import "../App.scss";

import syaiful from "../assets/syaiful.jpeg";
import dian from "../assets/dian.jpeg";
import elmy from "../assets/elmy.jpeg";
import perday from "../assets/perday.jpeg";
import handoko from "../assets/handoko.jpeg";
import herni from "../assets/herni.jpeg";
import ulfah from "../assets/ulfah.jpeg";
import rumiyati from "../assets/rumiyati.jpeg";
import murfidah from "../assets/mufidah.jpeg";

// --- DEFINISIKAN TIPE DATA UNTUK ANGGOTA ---
interface MemberDetail {
  id: string;
  name: string;
  position: string;
  birthDate: string;
  education: string;
  experience: string;
  email: string;
  image: string;
}

const StrukturPage = () => {
  // --- GUNAKAN TIPE DATA UNTUK STATE SELECTED MEMBER ---
  const [selectedMember, setSelectedMember] = useState<MemberDetail | null>(
    null
  );

  // --- DATA DETAIL ANGGOTA DENGAN TIPE YANG JELAS ---
  const memberDetails: Record<string, MemberDetail> = {
    "Sahri, M.Pd.": {
      id: "sahri",
      name: "Sahri, M.Pd.",
      position: "Dewan Pengarah",
      birthDate: "Jepara, 16 Juni 1973",
      education: "S2",
      experience: "5 Tahun",
      email: "sahriyohanes@gmail.com",
      image: "https://i.pravatar.cc/150?u=sahri",
    },

    "Syaiful Bachri, S.T.": {
      id: "syaiful",
      name: "Syaiful Bachri, S.T.",
      position: "Ketua LSP",
      birthDate: "7 Januari 1980",
      education: "S1-Teknik Informatika",
      experience: "7 Tahun",
      email: "syaifulbachri091213@gmail.com",
      image: syaiful,
    },

    "Dian Yunita, S.Pd.": {
      id: "dian",
      name: "Dian Yunita, S.Pd.",
      position: "Bendahara",
      birthDate: "15 Juni 1995",
      education: "S1 - Pendidikan Akuntansi",
      experience: "5 tahun",
      email: "dianyunita56@guru.smk.belajar.id",
      image: dian,
    },

    "Elmy Vianty, S.Pd.": {
      id: "elmy",
      name: "Elmy Vianty, S.Pd.",
      position: "Komite Skema",
      birthDate: "14 Januari 1994",
      education: "S1 - Pendidikan Ekonomi Tata Niaga",
      experience: "7 tahun",
      email: "elmyvianty23@gmail.com",
      image: elmy,
    },

    "Rumiyati, S.Pd.": {
      id: "rumiyati",
      name: "Rumiyati, S.Pd.",
      position: "Manajemen Mutu",
      birthDate: "24 September 1993",
      education: "S1 - Pendidikan Administrasi Perkantoran",
      experience: "5 Tahun",
      email: "rumiyati49@guru.smk.belajar.id",
      image: rumiyati,
    },

    "Handoko, M.Kom.": {
      id: "handoko",
      name: "Handoko, M.Kom.",
      position: "Sertifikasi",
      birthDate: "08 Juni 1989",
      education: "S2 - Teknologi Informasi",
      experience: "5 Tahun",
      email: "aanhandokodoko@gmail.com",
      image: handoko,
    },

    "Feri Supriyadi, S.Pd.": {
      id: "feri",
      name: "Feri Supriyadi, S.Pd.",
      position: "Kabid Administrasi",
      birthDate: "29 Agustus 1990",
      education: "S1",
      experience: "5 Tahun",
      email: "ferisupriyadi29@gmail.com",
      image: perday,
    },

    "Maria Ulfah, S.Sos.": {
      id: "maria",
      name: "Maria Ulfah, S.Sos.",
      position: "Staff Manajemen Mutu",
      birthDate: "Jakarta, 6 September 1986",
      education: "S1 - Sastra Jepang",
      experience: "1 Tahun",
      email: "maria.ulfah1655@guru.smk.belajar.id",
      image: ulfah,
    },

    "Mufidah, S.Pd.": {
      id: "mufidah",
      name: "Mufidah, S.E",
      position: "Staff Sertifikasi",
      birthDate: "Jakarta, 03 Oktober 1982",
      education: "S1",
      experience: "1 Tahun",
      email: "fidafarid1982@gmail.com",
      image: murfidah,
    },

    "Herni Murniasih, S.E.I.": {
      id: "herni",
      name: "Herni Murniasih, S.E.I.",
      position: "Staff Administrasi",
      birthDate: "21 Mei 1979",
      education: "S1",
      experience: "2 tahun",
      email: "hernimurniasih.05@gmail.com",
      image: herni,
    },
  };

  // --- TAMBAHKAN TIPE PADA PARAMETER FUNGSI ---
  const handleMemberClick = (memberName: string) => {
    if (memberDetails[memberName]) {
      setSelectedMember(memberDetails[memberName]);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section className="about-section">
      <div className="about-section__rings">
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

      <motion.div
        className="about-section__ken-burns"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="about-section__bubbles">
        <motion.div
          className="about-section__bubble about-section__bubble--1"
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
          className="about-section__bubble about-section__bubble--2"
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

      <div className="about-section__particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="about-section__particle"
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

      <div className="about-section__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-section__hero"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="about-section__hero-icon"
            style={{ marginTop: "100px" }}
          >
            <div className="icon-container">
              <Building2 />
            </div>
          </motion.div>

          <h1 className="about-section__hero-title">
            Struktur{" "}
            <span className="highlight" style={{ color: "#2563eb" }}>
              Organisasi
            </span>
          </h1>
          <p className="about-section__hero-description">
            Struktur organisasi LSP SMK Negeri 17 Jakarta yang terdiri dari
            berbagai posisi dan peran penting.
          </p>
        </motion.div>

        <div className="about-section__structure">
          <h2>
            <Building2 />
            Struktur Organisasi LSP
          </h2>
          <div className="org-chart">
            <div className="org-level">
              <div
                className="org-node top-level clickable"
                onClick={() => handleMemberClick("Sahri, M.Pd.")}
              >
                <h4>Dewan Pengarah</h4>
                <p>Sahri, M.Pd.</p>
              </div>
            </div>

            <div className="org-level">
              <div
                className="org-node clickable"
                onClick={() => handleMemberClick("Syaiful Bachri, S.T.")}
              >
                <h4>Ketua LSP</h4>
                <p>Syaiful Bachri, S.T.</p>
              </div>
            </div>

            <div className="org-level">
              <div
                className="org-node clickable"
                onClick={() => handleMemberClick("Dian Yunita, S.Pd.")}
              >
                <h4>Bendahara</h4>
                <p>Dian Yunita, S.Pd.</p>
              </div>
              <div
                className="org-node clickable"
                onClick={() => handleMemberClick("Elmy Vianty, S.Pd.")}
              >
                <h4>Komite Skema</h4>
                <p>Elmy Vianty, S.Pd.</p>
              </div>
            </div>

            <div className="org-level">
              <div
                className="org-node department-head clickable"
                onClick={() => handleMemberClick("Rumiyati, S.Pd.")}
              >
                <h4>Manajemen Mutu</h4>
                <p>Rumiyati, S.Pd.</p>
              </div>
              <div
                className="org-node department-head clickable"
                onClick={() => handleMemberClick("Handoko, M.Kom.")}
              >
                <h4>Sertifikasi</h4>
                <p>Handoko, M.Kom.</p>
              </div>
              <div
                className="org-node department-head clickable"
                onClick={() => handleMemberClick("Feri Supriyadi, S.Pd.")}
              >
                <h4>Administrasi</h4>
                <p>Feri Supriyadi, S.Pd.</p>
              </div>
            </div>

            <div className="org-level">
              <div
                className="org-node staff clickable"
                onClick={() => handleMemberClick("Maria Ulfah, S.Sos.")}
              >
                <p>Maria Ulfah, S.Sos.</p>
              </div>
              <div
                className="org-node staff clickable"
                onClick={() => handleMemberClick("Mufidah, S.Pd.")}
              >
                <p>Mufidah, S.Pd.</p>
              </div>
              <div
                className="org-node staff clickable"
                onClick={() => handleMemberClick("Herni Murniasih, S.E.I.")}
              >
                <p>Herni Murniasih, S.E.I.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk detail anggota */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="member-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="member-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-button" onClick={closeModal}>
                <X size={24} />
              </button>

              <div className="modal-header">
                <div className="member-photo">
                  <img src={selectedMember.image} alt={selectedMember.name} />
                </div>
                <div className="member-basic-info">
                  <h2>{selectedMember.name}</h2>
                  <h3>{selectedMember.position}</h3>
                </div>
              </div>

              <div className="modal-body">
                <div className="info-section">
                  <h4>Informasi Pribadi</h4>
                  <div className="info-item">
                    <span className="info-label">Tanggal Lahir:</span>
                    <span className="info-value">
                      {selectedMember.birthDate}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Pendidikan</h4>
                  <p>{selectedMember.education}</p>
                </div>

                <div className="info-section">
                  <h4>Pengalaman</h4>
                  <p>{selectedMember.experience}</p>
                </div>

                <div className="info-section">
                  <h4>Kontak</h4>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{selectedMember.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StrukturPage;
