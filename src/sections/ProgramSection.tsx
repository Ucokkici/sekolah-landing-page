import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, Calculator, Users, ShoppingBag, ArrowRight } from "lucide-react";
import "./ProgramSection.scss";
import rpl from "../assets/rpl.avif"
import akl from "../assets/akl.jpg"
import otkp from "../assets/otkp.avif"
import br from "../assets/br.avif"

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: string[];
  icon: React.ElementType;
}

const ProgramSection = () => {
  const navigate = useNavigate();

  const programs: Program[] = [
    {
      id: 1,
      title: "Rekayasa Perangkat Lunak (RPL)",
      description:
        "Program sertifikasi keahlian yang memvalidasi kemampuan siswa dalam pengembangan perangkat lunak, pengujian aplikasi, dan implementasi teknologi digital.",
      image:
        rpl,
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
        akl,
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
        otkp,
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
        br,
      skills: [
        "Kasir & Point of Sales (POS)",
        "Display & Visual Merchandising",
        "Komunikasi Penjualan",
        "Manajemen Stok & Inventory",
      ],
      icon: ShoppingBag,
    },
  ];

  const handleNavigateToKompetensi = (programId: number) => {
    console.log(`Navigating to kompetensi/${programId}`);
    navigate(`/kompetensi/${programId}`);
  };

  return (
    <section id="program" className="programs-simple">
      <div className="container">
        <h2>
          Skema <span className="highlight">Sertifikasi</span>
        </h2>

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