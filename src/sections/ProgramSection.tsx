import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, Calculator, Users, ShoppingBag, ArrowRight } from "lucide-react";
import "./ProgramSection.scss";

// Interface definitions
interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: string[];
  icon: React.ElementType;
}

const ProgramSection = () => {
  const navigate = useNavigate(); // Hook untuk navigasi programmatic

  const programs: Program[] = [
    {
      id: 1,
      title: "Rekayasa Perangkat Lunak (RPL)",
      description:
        "Program sertifikasi keahlian yang memvalidasi kemampuan siswa dalam pengembangan perangkat lunak, pengujian aplikasi, dan implementasi teknologi digital.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      skills: [
        "Pemrograman Berorientasi Objek",
        "Pembuatan Aplikasi Web",
        "Database MySQL & SQL Query",
        "Software Testing & Debugging",
      ],
      icon: Code,
    },
    {
      id: 2,
      title: "Akuntansi & Keuangan Lembaga (AKL)",
      description:
        "Sertifikasi kompetensi akuntansi berbasis industri yang memastikan kemampuan dalam pencatatan transaksi, penyusunan laporan keuangan, dan pengelolaan perpajakan.",
      image:
        "https://osccdn.medcom.id/images/content/2023/12/29/49a1fcc2357e5a8a61d57de3c39f3f14.jpg",
      skills: [
        "Akuntansi Komputer (Accurate / Excel)",
        "Perhitungan Pajak (PPH & PPN)",
        "Jurnal Umum & Buku Besar",
        "Analisis Laporan Keuangan",
      ],
      icon: Calculator,
    },
    {
      id: 3,
      title: "Manajemen Perkantoran / OTKP",
      description:
        "Program sertifikasi administrasi perkantoran untuk menyiapkan tenaga kerja profesional yang kompeten dalam pengelolaan dokumen, pelayanan publik, dan operasional kantor modern.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
      skills: [
        "Administrasi Arsip & Dokumen",
        "Layanan Pelanggan (Customer Service)",
        "Pengolahan Surat Menyurat",
        "Pengoperasian Microsoft Office",
      ],
      icon: Users,
    },
    {
      id: 4,
      title: "Bisnis Retail (BDP)",
      description:
        "Sertifikasi kompetensi bisnis retail untuk membangun kemampuan operasional toko, promosi produk, pelayanan pelanggan, dan pengelolaan transaksi.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      skills: [
        "Kasir & Point of Sales (POS)",
        "Display & Visual Merchandising",
        "Komunikasi Penjualan",
        "Manajemen Stok & Inventory",
      ],
      icon: ShoppingBag,
    },
  ];

  // Handler untuk navigasi ke halaman kompetensi
  const handleNavigateToKompetensi = (programId: number) => {
    console.log(`Navigating to kompetensi/${programId}`); // Debugging
    navigate(`/kompetensi/${programId}`);
  };

  return (
    <section id="program" className="programs-simple">
      <div className="container">
        <h2>
          Program <span className="highlight">Keahlian</span>
        </h2>

        {/* Grid untuk menampilkan kartu tanpa Swiper */}
        <div className="programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card-simple">
              <div className="card-image">
                <img src={program.image} alt={program.title} />
              </div>
              <div className="card-content">
                <program.icon className="card-icon" />
                <h3>{program.title}</h3>
                <p>{program.description}</p>

                {/* TOMBOL NAVIGASI */}
                <div className="button-container">
                  <button
                    className="card-button"
                    onClick={() => handleNavigateToKompetensi(program.id)}
                    type="button"
                  >
                    Lihat Unit Kompetensi
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
