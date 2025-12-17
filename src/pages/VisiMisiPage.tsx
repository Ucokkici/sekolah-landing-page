import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import "../sections/AboutSection.scss";
import "../App.scss";

const VisiMisiPage = () => {
  const lspMissions = [
    "LSP SMK Negeri 17 Jakarta menjamin menerapkan pedoman BNSP tahun 2014 dan ISO 17024.",
    "LSP SMK Negeri 17 Jakarta siap melaksanakan sertifikasi kompetensi secara profesional dan berkelanjutan.",
    "Memberikan Pelayanan uji sertifikasi kompetensi yang mengutamakan kualitas dan kepuasan pelanggan.",
    "LSP SMK Negeri 17 Jakarta menjamin kemandirian, kejujuran, kedisiplinan dan berlandaskan iman dan taqwa, ilmu pengetahuan dan teknologi.",
    "Menghasilkan tenaga kerja bersertifikat kompetensi yang profesional dan berbudi pekerti luhur.",
  ];

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
            style={{ marginTop: "100px" }}
            className="about-section__hero-icon"
          >
            <div className="icon-container">
              <Eye />
            </div>
          </motion.div>

          <h1 className="about-section__hero-title">
            Visi &{" "}
            <span className="highlight" style={{ color: "#2563eb" }}>
              Misi
            </span>
          </h1>
          <p className="about-section__hero-description">
            Tujuan dan arah pengembangan LSP SMK Negeri 17 Jakarta untuk masa
            depan.
          </p>
        </motion.div>

        <div className="about-section__vision-mission">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="about-section__vision"
          >
            <h2>
              <Eye />
              Visi
            </h2>
            <div className="about-section__vision-content">
              <p>
                Terwujudnya Lembaga Sertifikasi Profesi yang menjamin kompetensi
                tenaga kerja profesional, mampu bersaing di dunia usaha/dunia
                industri yang berlandaskan iman dan taqwa, ilmu pengetahuan dan
                teknologi.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="about-section__mission"
          >
            <h2>
              <Target />
              Misi
            </h2>
            <div className="about-section__mission-list">
              {lspMissions.map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="about-section__mission-item"
                >
                  <div className="number-badge">{index + 1}</div>
                  <p>{mission}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiPage;
