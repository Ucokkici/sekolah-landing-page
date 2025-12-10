import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  School,
  History,
  Eye,
  Target,
  Building2,
  Users,
  GraduationCap,
  Award,
  Wrench,
  MapPin,
  Shield,
  Target as TargetIcon,
  TrendingUp,
  X,
  ChevronDown,
} from "lucide-react";
import "./AboutSection.scss";
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

// --- 1. DEFINISIKAN TIPE DATA UNTUK ANGGOTA ---
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

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // --- 2. GUNAKAN TIPE DATA UNTUK STATE SELECTED MEMBER ---
  const [selectedMember, setSelectedMember] = useState<MemberDetail | null>(
    null
  );

  // --- STATE FOR ACCORDION ---
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // --- DATA PROFIL BARU (TANPA "NAMA") ---
  const profileData = [
    {
      title: "Jenis & Fungsi",
      icon: Wrench,
      content:
        "LSP ini berperan sebagai penyelenggara sertifikasi kompetensi untuk siswa SMK agar lulusan memiliki sertifikat kompetensi yang diakui secara nasional. LSP sekolah bertujuan memastikan lulusan siap kerja sesuai standar industri/BNSP.",
    },
    {
      title: "Alamat & Kontak",
      icon: MapPin,
      content:
        "Alamat: Jl. G. Slipi, Palmerah — SMKN 17 Jakarta. Email: lspsmkn17jakarta@gmail.com. Website Profil: lspsmkn17jakarta.blogspot.com",
    },
    {
      title: "Status Lisensi",
      icon: Shield,
      content:
        "Terdaftar secara resmi di BNSP dengan masa berlaku sertifikat sampai dengan 23 Februari 2029.",
    },
    {
      title: "Kompetensi / Skema Sertifikasi",
      icon: Award,
      content:
        "Menyediakan skema sertifikasi yang sesuai dengan kompetensi keahlian di SMKN 17 Jakarta (misalnya, Akuntansi, Administrasi Perkantoran, Pemasaran) yang relevan dengan standar KKNI.",
    },
    {
      title: "Kegiatan Utama",
      icon: TargetIcon,
      content:
        "Menyelenggarakan asesmen kompetensi, menunjuk asesor kompetensi bersertifikat, menjalankan skema sertifikasi, serta menjalin kerja sama dengan dunia industri untuk memastikan relevansi kompetensi.",
    },
    {
      title: "Manfaat untuk Siswa & Industri",
      icon: TrendingUp,
      content:
        "Lulusan mendapatkan sertifikat kompetensi yang meningkatkan peluang kerja dan memudahkan perpindahan pengakuan kompetensi secara nasional, serta menjalin hubungan sekolah–industri yang kuat.",
    },
  ];

  const stats = [
    { icon: Users, value: "1000+", label: "Siswa Aktif" },
    { icon: GraduationCap, value: "80+", label: "Tenaga Pendidik" },
    { icon: Award, value: "50+", label: "Prestasi" },
    { icon: Building2, value: "4", label: "Kompetensi Keahlian" },
  ];

  const lspMissions = [
    "LSP SMK Negeri 17 Jakarta menjamin menerapkan pedoman BNSP tahun 2014 dan ISO 17024.",
    "LSP SMK Negeri 17 Jakarta siap melaksanakan sertifikasi kompetensi secara profesional dan berkelanjutan.",
    "Memberikan Pelayanan uji sertifikasi kompetensi yang mengutamakan kualitas dan kepuasan pelanggan.",
    "LSP SMK Negeri 17 Jakarta menjamin kemandirian, kejujuran, kedisiplinan dan berlandaskan iman dan taqwa, ilmu pengetahuan dan teknologi.",
    "Menghasilkan tenaga kerja bersertifikat kompetensi yang profesional dan berbudi pekerti luhur.",
  ];

  const tabs = [
    { id: "profile", label: "Profil", icon: School },
    { id: "history", label: "Sejarah", icon: History },
    { id: "vision", label: "Visi & Misi", icon: Eye },
    { id: "structure", label: "Struktur Organisasi", icon: Building2 },
  ];

  // --- 3. DATA DETAIL ANGGOTA DENGAN TIPE YANG JELAS ---
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

  // --- 4. TAMBAHKAN TIPE PADA PARAMETER FUNGSI ---
  const handleMemberClick = (memberName: string) => {
    if (memberDetails[memberName]) {
      setSelectedMember(memberDetails[memberName]);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // --- FUNGSI UNTUK MENANGANI ACCORDION ---
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section id="tentang" className="about-section">
      {/* ... (bagian rings, ken-burns, bubbles, particles tetap sama) ... */}
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
        {/* ... (bagian hero, stats, tabs tetap sama) ... */}
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
          >
            <div className="icon-container">
              <School />
            </div>
          </motion.div>

          <h1 className="about-section__hero-title">
            Tentang <span className="highlight">Kami</span>
          </h1>
          <p className="about-section__hero-description">
            Mengenal lebih dekat LSP SMK Negeri 17 Jakarta, lembaga sertifikasi
            profesi yang terpercaya dan berlisensi BNSP.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="about-section__stats"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="about-section__stat-card"
            >
              <stat.icon />
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="about-section__tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`about-section__tab-button ${
                activeTab === tab.id
                  ? "about-section__tab-button--active"
                  : "about-section__tab-button--inactive"
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="about-section__tab-content"
        >
          {/* PROFILE TAB DENGAN ACCORDION */}
          {activeTab === "profile" && (
            <div className="about-section__profile">
              <h2>
                <School />
                Lembaga Sertifikasi Profesi SMK Negeri 17 Jakarta
              </h2>

              <div className="profile-accordion">
                {profileData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`accordion-item ${
                      activeAccordion === index ? "accordion-item--active" : ""
                    }`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className="accordion-icon">
                        <item.icon />
                      </div>
                      <h3 className="accordion-title">{item.title}</h3>
                      <div
                        className={`accordion-chevron ${
                          activeAccordion === index
                            ? "accordion-chevron--open"
                            : ""
                        }`}
                      >
                        <ChevronDown />
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div
                          className="accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="accordion-text">
                            <p>{item.content}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="about-section__history">
              <h2>Sejarah LSP SMKN 17 Jakarta</h2>

              <div className="about-section__timeline">
                {/* SECTION 1 */}
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">2018</div>
                    <h3>Pendirian LSP</h3>
                  </div>
                  <p>
                    Lembaga Sertifikasi Profesi (LSP) SMKN 17 Jakarta didirikan
                    pada bulan Oktober 2018 oleh Kepala SMKN 17 Jakarta periode
                    2016–2020, Bapak Drs. Bimo Suciono, M.M., yang sekaligus
                    menjadi Dewan Pengarah pertama. LSP memperoleh SK Lisensi
                    Nomor Kep. 1275/BNSP/XII/2018 dengan Nomor Lisensi
                    BNSP-LSP-1412-ID. Pada periode 2018–2020, LSP dipimpin oleh
                    Ibu Santi Yuliana, M.Pd. sebagai Ketua. Kantor LSP sejak
                    awal berada di SMKN 17 Jakarta, Jl. G1 Slipi Palmerah
                    Jakarta Barat.
                  </p>
                </div>

                {/* SECTION 2 */}
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">2019–2025</div>
                    <h3>Pelaksanaan Sertifikasi</h3>
                  </div>
                  <p>
                    Sejak tahun 2019 hingga 2025, LSP SMKN 17 Jakarta telah
                    melaksanakan Uji Sertifikasi Kompetensi bagi peserta didik
                    SMK dengan total 4.228 asesi, terdiri atas 2.961 asesi
                    dinyatakan kompeten dan 1.267 asesi belum kompeten.
                  </p>
                </div>

                {/* SECTION 3 */}
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">Skema</div>
                    <h3>Skema Sertifikasi</h3>
                  </div>
                  <p>
                    LSP SMKN 17 Jakarta memiliki 6 skema sertifikasi kompetensi,
                    meliputi:
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

                {/* SECTION 4 */}
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">Kemitraan</div>
                    <h3>Jejaring Kerja Sama</h3>
                  </div>
                  <p>
                    LSP SMKN 17 Jakarta bekerja sama dengan 13 satuan pendidikan
                    di wilayah Jakarta Barat, yaitu: SMKN 17 Jakarta, SMK Islam
                    Perti, SMK Islam Fatahilah, SMK Kristen Rahmani, SMK Strada,
                    SMK Santo Leo, SMK Putra Mandiri, SMK Tanjung, SMK Tri
                    Ratna, SMK Tomang Raya, SMK Yadika 2, SKB Negeri 05, dan SKB
                    Negeri 24.
                  </p>
                </div>

                {/* SECTION 5 */}
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">2024</div>
                    <h3>Relisensi</h3>
                  </div>
                  <p>
                    Pada tanggal 23 Februari 2024, LSP SMKN 17 Jakarta
                    melaksanakan proses relisensi dan memperoleh SK Lisensi
                    terbaru di bawah pembinaan Dewan Pengarah Bapak Sahri,
                    M.Pd., dan dipimpin oleh Ketua LSP, Bapak Syaiful Bachri,
                    S.T. SK tersebut bernomor Kep. 0475/BNSP/II/2024 dan Nomor
                    Lisensi BNSP-LSP-1412-ID.
                  </p>
                </div>

                {/* SECTION 6 */}
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">Kini</div>
                    <h3>Komitmen</h3>
                  </div>
                  <p>
                    Hingga saat ini, LSP SMKN 17 Jakarta tetap berkomitmen untuk
                    menyelenggarakan layanan Uji Sertifikasi Kompetensi secara
                    profesional, akuntabel, dan berkelanjutan bagi peserta didik
                    Sekolah Menengah Kejuruan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vision" && (
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
                    Terwujudnya Lembaga Sertifikasi Profesi yang menjamin
                    kompetensi tenaga kerja profesional, mampu bersaing di dunia
                    usaha/dunia industri yang berlandaskan iman dan taqwa, ilmu
                    pengetahuan dan teknologi.
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
          )}

          {activeTab === "structure" && (
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
          )}
        </motion.div>
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

export default AboutSection;
