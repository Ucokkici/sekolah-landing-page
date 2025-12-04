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
  Building as BuildingIcon,
  Wrench,
  MapPin,
  Shield,
  Target as TargetIcon,
  TrendingUp,
  X,
} from "lucide-react";
import "./AboutSection.scss";
import "../App.scss";

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
  const [selectedMember, setSelectedMember] = useState<MemberDetail | null>(null);

  // --- DATA PROFIL BARU ---
  const profileData = [
    {
      title: "Nama",
      icon: BuildingIcon,
      content: "Lembaga Sertifikasi Profesi (LSP) — SMK Negeri 17 Jakarta.",
    },
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
      birthDate: "15 Maret 1970",
      education: "S2 Pendidikan Teknologi Informasi - Universitas Negeri Jakarta",
      experience: "20 tahun pengalaman di bidang pendidikan vokasional",
      email: "sahri@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=sahri", // Gambar dari online
    },
    "Syaiful Bachri, S.T.": {
      id: "syaiful",
      name: "Syaiful Bachri, S.T.",
      position: "Ketua LSP",
      birthDate: "22 Juni 1975",
      education: "S1 Teknik Elektro - Institut Teknologi Bandung",
      experience: "15 tahun pengalaman di bidang sertifikasi profesi",
      email: "syaiful@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=syaiful", // Gambar dari online
    },
    "Dian Yunita, S.Pd.": {
      id: "dian",
      name: "Dian Yunita, S.Pd.",
      position: "Bendahara",
      birthDate: "8 Januari 1980",
      education: "S1 Pendidikan Akuntansi - Universitas Negeri Jakarta",
      experience: "12 tahun pengalaman di bidang keuangan pendidikan",
      email: "dian@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=dian", // Gambar dari online
    },
    "Elmy Vianty, S.Pd.": {
      id: "elmy",
      name: "Elmy Vianty, S.Pd.",
      position: "Komite Skema",
      birthDate: "5 September 1978",
      education: "S1 Pendidikan Administrasi Perkantoran - Universitas Negeri Jakarta",
      experience: "14 tahun pengalaman di bidang administrasi perkantoran",
      email: "elmy@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=elmy", // Gambar dari online
    },
    "Rumiyati, S.Pd.": {
      id: "rumiyati",
      name: "Rumiyati, S.Pd.",
      position: "Manajemen Mutu",
      birthDate: "12 November 1976",
      education: "S1 Pendidikan Manajemen - Universitas Negeri Jakarta",
      experience: "16 tahun pengalaman di bidang manajemen mutu",
      email: "rumiyati@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=rumiyati", // Gambar dari online
    },
    "Handoko, M.Kom.": {
      id: "handoko",
      name: "Handoko, M.Kom.",
      position: "Sertifikasi",
      birthDate: "3 April 1979",
      education: "S2 Teknik Informatika - Universitas Indonesia",
      experience: "13 tahun pengalaman di bidang sertifikasi TI",
      email: "handoko@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=handoko", // Gambar dari online
    },
    "Feri Supriyadi, S.Pd.": {
      id: "feri",
      name: "Feri Supriyadi, S.Pd.",
      position: "Administrasi",
      birthDate: "17 Juli 1982",
      education: "S1 Pendidikan Ekonomi - Universitas Negeri Jakarta",
      experience: "10 tahun pengalaman di bidang administrasi",
      email: "feri@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=feri", // Gambar dari online
    },
    "Maria Ulfah, S.Sos.": {
      id: "maria",
      name: "Maria Ulfah, S.Sos.",
      position: "Staf Administrasi",
      birthDate: "25 Oktober 1985",
      education: "S1 Ilmu Sosial - Universitas Indonesia",
      experience: "8 tahun pengalaman di bidang administrasi",
      email: "maria@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=maria", // Gambar dari online
    },
    "Mufidah, S.Pd.": {
      id: "mufidah",
      name: "Mufidah, S.Pd.",
      position: "Staf Sertifikasi",
      birthDate: "14 Februari 1984",
      education: "S1 Pendidikan Bahasa Inggris - Universitas Negeri Jakarta",
      experience: "9 tahun pengalaman di bidang sertifikasi",
      email: "mufidah@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=mufidah", // Gambar dari online
    },
    "Herni Murniasih, S.E.I.": {
      id: "herni",
      name: "Herni Murniasih, S.E.I.",
      position: "Staf Keuangan",
      birthDate: "30 Mei 1983",
      education: "S1 Ekonomi Islam - Universitas Islam Negeri Syarif Hidayatullah",
      experience: "11 tahun pengalaman di bidang keuangan",
      email: "herni@smkn17jakarta.sch.id",
      image: "https://i.pravatar.cc/150?u=herni", // Gambar dari online
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
          {/* ... (bagian tab profile, history, vision tetap sama) ... */}
          {activeTab === "profile" && (
            <div className="about-section__profile">
              <h2>
                <School />
                Profil LSP SMK Negeri 17 Jakarta
              </h2>

              <div className="profile-feature-list">
                {profileData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`profile-feature-item ${
                      index % 2 === 0
                        ? "profile-feature-item--even"
                        : "profile-feature-item--odd"
                    }`}
                  >
                    <div className="profile-icon">
                      <item.icon />
                    </div>
                    <div className="profile-text">
                      <h3>{item.title}</h3>
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="about-section__history">
              <h2>
                <History />
                Sejarah LSP SMK Negeri 17 Jakarta
              </h2>
              <div className="about-section__timeline">
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">1969</div>
                    <h3>Awal Berdiri</h3>
                  </div>
                  <p>
                    SMK Negeri 17 Jakarta didirikan dengan nama STM Pembangunan
                    Jakarta. Pada awalnya, sekolah ini hanya memiliki beberapa
                    program keahlian dasar.
                  </p>
                </div>
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">1997</div>
                    <h3>Perubahan Nama</h3>
                  </div>
                  <p>
                    STM Pembangunan Jakarta berubah nama menjadi SMK Negeri 17
                    Jakarta. Perubahan ini sejalan dengan perkembangan kebijakan
                    pendidikan di Indonesia.
                  </p>
                </div>
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">2015</div>
                    <h3>Berdirinya LSP</h3>
                  </div>
                  <p>
                    LSP SMK Negeri 17 Jakarta didirikan sebagai lembaga
                    sertifikasi kompetensi yang terlisensi BNSP. Tujuannya untuk
                    meningkatkan kualitas lulusan agar siap kerja dan bersaing
                    di dunia industri.
                  </p>
                </div>
                <div className="about-section__timeline-item">
                  <div className="timeline-header">
                    <div className="year-badge">2020</div>
                    <h3>Ekspansi Program</h3>
                  </div>
                  <p>
                    LSP SMK Negeri 17 Jakarta menambah skema sertifikasi baru
                    untuk memenuhi kebutuhan industri yang terus berkembang.
                    Total skema sertifikasi yang tersedia mencapai 15 skema.
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
                    <span className="info-value">{selectedMember.birthDate}</span>
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