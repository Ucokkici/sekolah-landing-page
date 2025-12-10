import { motion } from "framer-motion";
// --- PERUBAHAN 1: Hapus semua import ikon dari lucide-react ---

// --- OBJEK GAYA (CSS-in-JS) ---
const styles = {
  // Gaya untuk section utama
  profilPage: {
    backgroundColor: '#f8f9fa',
    padding: '100px 0',
    minHeight: '100vh',
  },
  profilPage__content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  
  // Gaya untuk Hero Section
  profilPage__hero: {
    textAlign: 'center' as const,
    marginBottom: '60px',
  },
  profilPage__hero_title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    marginTop: '80px',
  },
  profilPage__hero_description: {
    fontSize: '1.1rem',
    maxWidth: '700px',
    margin: '0 auto',
    color: '#555',
  },

  // Gaya untuk Grid Kartu
  profilPage__grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
  },
  profilPage__card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  // --- PERUBAHAN 2: Hapus gaya untuk ikon yang tidak lagi digunakan ---
  // profilPage__card_icon: { ... }
  // svgIcon: { ... }
  
  profilPage__card_title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#333',
  },
  profilPage__card_content: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
  },
  
  // Gaya untuk highlight
  highlight: {
    color: '#4f46e5',
  }
};

// --- KOMPONEN REAKT ---
const ProfilPage = () => {
  // --- PERUBAHAN 3: Hapus properti 'icon' dari data ---
  const profileData = [
    {
      title: "Jenis & Fungsi",
      content:
        "LSP ini berperan sebagai penyelenggara sertifikasi kompetensi untuk siswa SMK agar lulusan memiliki sertifikat kompetensi yang diakui secara nasional. LSP sekolah bertujuan memastikan lulusan siap kerja sesuai standar industri/BNSP.",
    },
    {
      title: "Alamat & Kontak",
      content:
        "Alamat: Jl. G. Slipi, Palmerah — SMKN 17 Jakarta. Email: lspsmkn17jakarta@gmail.com. Website Profil: lspsmkn17jakarta.blogspot.com",
    },
    {
      title: "Status Lisensi",
      content:
        "Terdaftar secara resmi di BNSP dengan masa berlaku sertifikat sampai dengan 23 Februari 2029.",
    },
    {
      title: "Kompetensi / Skema Sertifikasi",
      content:
        "Menyediakan skema sertifikasi yang sesuai dengan kompetensi keahlian di SMKN 17 Jakarta (misalnya, Akuntansi, Administrasi Perkantoran, Pemasaran) yang relevan dengan standar KKNI.",
    },
    {
      title: "Kegiatan Utama",
      content:
        "Menyelenggarakan asesmen kompetensi, menunjuk asesor kompetensi bersertifikat, menjalankan skema sertifikasi, serta menjalin kerja sama dengan dunia industri untuk memastikan relevansi kompetensi.",
    },
    {
      title: "Manfaat untuk Siswa & Industri",
      content:
        "Lulusan mendapatkan sertifikat kompetensi yang meningkatkan peluang kerja dan memudahkan perpindahan pengakuan kompetensi secara nasional, serta menjalin hubungan sekolah–industri yang kuat.",
    },
  ];

  return (
    <section style={styles.profilPage}>
      <div style={styles.profilPage__content}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={styles.profilPage__hero}
        >
          {/* --- PERUBAHAN 4: Hapus ikon dari hero section --- */}
          <h1 style={styles.profilPage__hero_title}>
            Profil <span style={styles.highlight}>LSP</span>
          </h1>
          <p style={styles.profilPage__hero_description}>
            Mengenal lebih dekat LSP SMK Negeri 17 Jakarta, lembaga sertifikasi
            profesi yang terpercaya dan berlisensi BNSP.
          </p>
        </motion.div>

        {/* Grid Kartu */}
        <div style={styles.profilPage__grid}>
          {profileData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              style={styles.profilPage__card}
            >
              {/* --- PERUBAHAN 5: Hapus container dan render ikon dari setiap kartu --- */}
              <h3 style={styles.profilPage__card_title}>{item.title}</h3>
              <p style={styles.profilPage__card_content}>{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilPage;