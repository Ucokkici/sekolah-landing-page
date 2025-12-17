import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Calculator,
  Users,
  ShoppingBag,
  ArrowRight,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import "./ProgramSection.scss";

import rpl from "../assets/rpl.avif";
import akl from "../assets/akl.jpg";
import otkp from "../assets/otkp.avif";
import br from "../assets/br.avif";

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
      image: rpl,
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
      image: akl,
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
      image: otkp,
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
      image: br,
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
    navigate(`/kompetensi/${programId}`);
  };

  return (
    <section id="program" className="programs-simple">
      <div className="container">
        {/* ICON AWARD DI ATAS JUDUL */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="programs-simple__hero-icon"
        >
          <div className="icon-container">
            <Award size={42} />
          </div>
        </motion.div>

        <h2>
          Skema <span className="highlight">Sertifikasi</span>
        </h2>

        <div className="description-card">
          <p className="scheme-section__description">
            Skema sertifikasi yang diselenggarakan oleh LSP SMKN 17 Jakarta
            dirancang untuk memastikan peserta memiliki kompetensi yang sesuai
            dengan standar nasional dan kebutuhan dunia industri. Setiap skema
            mengacu pada unit-unit kompetensi yang telah ditetapkan oleh Badan
            Nasional Sertifikasi Profesi (BNSP), sehingga hasil sertifikasi
            dapat menjadi bukti resmi atas keahlian, pengetahuan, dan sikap
            kerja peserta.
          </p>
        </div>

        <div className="programs-grid">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <div key={program.id} className="program-card-simple">
                <div className="card-image">
                  <img src={program.image} alt={program.title} />
                </div>

                <div className="card-content">
                  <Icon className="card-icon" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
