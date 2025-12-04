import type { Program, KompetensiDetail } from "../types";

export const programs: Program[] = [
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
    icon: "Code",
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
    icon: "Calculator",
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
    icon: "Users",
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
    icon: "ShoppingBag",
  },
];

// Data unit kompetensi untuk setiap program
export const kompetensiData: Record<string, KompetensiDetail> = {
  "1": {
    title: "Rekayasa Perangkat Lunak (RPL)",
    kategori: [
      {
        nama: "Pemrograman & Software Development",
        icon: "Code",
        items: [
          { id: "J.620100.009.02", nama: "Menggunakan Spesifikasi Program" },
          {
            id: "J.620100.016.01",
            nama: "Menulis Kode Sesuai Guidelines & Best Practices",
          },
          {
            id: "J.620100.017.02",
            nama: "Mengimplementasikan Pemrograman Terstruktur",
          },
          {
            id: "J.620100.018.02",
            nama: "Mengimplementasikan Pemrograman Berorientasi Objek",
          },
          {
            id: "J.620100.019.02",
            nama: "Menggunakan Library / Komponen Pre-Existing",
          },
        ],
      },
      {
        nama: "Database & Backend",
        icon: "Target",
        items: [
          { id: "J.620100.021.02", nama: "Menerapkan Akses Basis Data" },
        ],
      },
      {
        nama: "Dokumentasi & Maintenance",
        icon: "BookOpen",
        items: [
          { id: "J.620100.023.02", nama: "Membuat Dokumen Kode Program" },
          { id: "J.620100.025.02", nama: "Melakukan Debugging" },
          {
            id: "J.620100.033.02",
            nama: "Melaksanakan Pengujian Unit Program",
          },
        ],
      },
    ],
  },
  "2": {
    title: "Akuntansi & Keuangan Lembaga (AKL)",
    kategori: [
      {
        nama: "Akuntansi & Pembukuan",
        icon: "Calculator",
        items: [
          { id: "P.851100.001.02", nama: "Mengelola Buku Jurnal" },
          { id: "P.851100.002.02", nama: "Menyusun Laporan Keuangan" },
          { id: "P.851100.004.02", nama: "Melakukan Rekonsiliasi Keuangan" },
          { id: "P.851100.005.02", nama: "Mengelola Buku Besar" },
        ],
      },
      {
        nama: "Perpajakan",
        icon: "Award",
        items: [
          {
            id: "P.853400.001.02",
            nama: "Menghitung Pajak Penghasilan (PPH)",
          },
          {
            id: "P.853400.002.02",
            nama: "Menghitung Pajak Pertambahan Nilai (PPN)",
          },
        ],
      },
      {
        nama: "Aplikasi Akuntansi",
        icon: "Target",
        items: [
          {
            id: "P.851100.015.01",
            nama: "Mengoperasikan Aplikasi Akuntansi (Accurate/Excel)",
          },
        ],
      },
    ],
  },
  "3": {
    title: "Manajemen Perkantoran / OTKP",
    kategori: [
      {
        nama: "Administrasi & Dokumen",
        icon: "BookOpen",
        items: [
          { id: "N.411100.001.02", nama: "Mengelola Dokumen Perkantoran" },
          { id: "N.411100.002.02", nama: "Menyusun Surat Menyurat" },
          { id: "N.411100.003.02", nama: "Mengarsip Dokumen" },
        ],
      },
      {
        nama: "Layanan Publik & Komunikasi",
        icon: "Users",
        items: [
          { id: "N.411100.005.02", nama: "Melakukan Pelayanan Pelanggan" },
          {
            id: "N.411100.007.02",
            nama: "Melakukan Komunikasi Melalui Media Digital",
          },
        ],
      },
      {
        nama: "Aplikasi Perkantoran",
        icon: "Target",
        items: [
          {
            id: "N.411100.010.01",
            nama: "Mengoperasikan Perangkat Lunak Perkantoran (Microsoft Office)",
          },
        ],
      },
    ],
  },
  "4": {
    title: "Bisnis Retail (BDP)",
    kategori: [
      {
        nama: "Operasional Toko & Kasir",
        icon: "Calculator",
        items: [
          {
            id: "G.532020.001.02",
            nama: "Mengoperasikan Sistem Kasir (POS)",
          },
          { id: "G.532020.003.02", nama: "Melakukan Transaksi Penjualan" },
        ],
      },
      {
        nama: "Merchandising & Display",
        icon: "ShoppingBag",
        items: [
          { id: "G.532020.006.02", nama: "Menata Display Produk" },
          { id: "G.532020.007.02", nama: "Melakukan Visual Merchandising" },
        ],
      },
      {
        nama: "Sales & Service",
        icon: "Users",
        items: [
          { id: "G.532020.009.02", nama: "Memberikan Layanan Konsumen" },
          { id: "G.532020.011.02", nama: "Melakukan Komunikasi Penjualan" },
        ],
      },
      {
        nama: "Inventory & Stok",
        icon: "Target",
        items: [
          {
            id: "G.532020.013.02",
            nama: "Mengelola Persediaan dan Stok Barang",
          },
        ],
      },
    ],
  },
};