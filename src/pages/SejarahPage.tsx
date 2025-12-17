import { motion } from "framer-motion";
import { History } from "lucide-react";
import "../sections/AboutSection.scss";
import "../App.scss";

const SejarahPage = () => {
  return (
    <section className="about-section">
      <motion.div
        className="about-section__ken-burns"
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

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
              <History />
            </div>
          </motion.div>

          <h1 className="about-section__hero-title">
            Sejarah{" "}
            <span className="highlight" style={{ color: "#2563eb" }}>
              Kami
            </span>
          </h1>
          <p className="about-section__hero-description">
            Perjalanan LSP SMK Negeri 17 Jakarta sejak pendirian hingga menjadi
            lembaga sertifikasi yang terpercaya.
          </p>
        </motion.div>

        <div className="about-section__history">
          <h2>
            <History />
            Sejarah LSP SMK Negeri 17 Jakarta
          </h2>

          <div className="about-section__timeline">
            <div className="about-section__timeline-item">
              <div className="timeline-header">
                <div className="year-badge">2018</div>
                <h3>Pendirian LSP</h3>
              </div>
              <p>
                LSP SMKN 17 Jakarta didirikan pada Oktober 2018 oleh Kepala
                Sekolah periode 2016–2020, Bapak Drs. Bimo Suciono, M.M., yang
                juga menjadi Dewan Pengarah pertama. LSP memperoleh Surat
                Keputusan Lisensi Nomor Kep. 1275/BNSP/XII/2018 dengan Nomor
                Lisensi BNSP-LSP-1412-ID. Pada masa awal berdiri, Ketua LSP
                dijabat oleh Ibu Santi Yuliana, M.Pd.
              </p>
            </div>

            <div className="about-section__timeline-item">
              <div className="timeline-header">
                <div className="year-badge">Mulai</div>
                <h3>Pelaksanaan Sertifikasi</h3>
              </div>
              <p>
                Sejak 2019 hingga 2025, LSP SMKN 17 Jakarta telah melaksanakan
                uji sertifikasi kompetensi bagi 4.228 asesi. Sebanyak 2.961
                asesi dinyatakan kompeten dan 1.267 belum kompeten.
              </p>
            </div>

            <div className="about-section__timeline-item">
              <div className="timeline-header">
                <div className="year-badge">Skema</div>
                <h3>Skema Sertifikasi</h3>
              </div>
              <p>
                Terdapat 6 skema sertifikasi yang diselenggarakan:
                <br />
                1. KKNI Level II Akuntansi dan Keuangan Lembaga
                <br />
                2. KKNI Level II Otomatisasi dan Tata Kelola Perkantoran
                <br />
                3. Okupasi Pramuniaga
                <br />
                4. Okupasi Kasir
                <br />
                5. Okupasi Asisten Pemrogram Junior
                <br />
                6. Okupasi Pemrogram Junior
              </p>
            </div>

            <div className="about-section__timeline-item">
              <div className="timeline-header">
                <div className="year-badge">Mitra</div>
                <h3>Jejaring Kerja Sama</h3>
              </div>
              <p>
                LSP SMKN 17 Jakarta bekerja sama dengan 13 satuan pendidikan di
                wilayah Jakarta Barat, yaitu:
              </p>
              <ol className="styled-numbered-list">
                <li>1. SMKN 17 Jakarta</li>
                <li>2. SMK Islam Perti</li>
                <li>3. SMK Islam Fatahilah</li>
                <li>4. SMK Kristen Rahmani</li>
                <li>5. SMK Strada</li>
                <li>6. SMK Santo Leo</li>
                <li>7. SMK Putra Mandiri</li>
                <li>8. SMK Tanjung</li>
                <li>9. SMK Tri Ratna</li>
                <li>10. SMK Tomang Raya</li>
                <li>11. SMK Yadika 2</li>
                <li>12. SKB Negeri 05</li>
                <li>13. SKB Negeri 24</li>
              </ol>
            </div>

            <div className="about-section__timeline-item">
              <div className="timeline-header">
                <div className="year-badge">2024</div>
                <h3>Relisensi</h3>
              </div>
              <p>
                Pada 23 Februari 2024, LSP SMKN 17 Jakarta memperoleh SK Lisensi
                terbaru dengan Nomor Kep. 0475/BNSP/II/2024 serta Nomor Lisensi
                BNSP-LSP-1412-ID. Relisensi dilakukan di bawah pembinaan Dewan
                Pengarah Bapak Sahri, M.Pd., serta dipimpin oleh Ketua LSP,
                Bapak Syaiful Bachri, S.T.
              </p>
            </div>

            <div className="about-section__timeline-item">
              <div className="timeline-header">
                <div className="year-badge">Kini</div>
                <h3>Komitmen Berkelanjutan</h3>
              </div>
              <p>
                LSP SMKN 17 Jakarta terus berkomitmen menyelenggarakan
                sertifikasi kompetensi secara profesional, akuntabel, dan
                berkelanjutan bagi peserta didik SMK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SejarahPage;
