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
        nama: "Pemrograman Junior (Junior Coder)",
        icon: "Code",
        items: [
          { id: "J.620100.004.02", nama: "Menggunakan Struktur Data" },
          { id: "J.620100.009.01", nama: "Menggunakan Spesifikasi Program" },
          { id: "J.620100.010.01", nama: "Menerapkan Perintah Eksekusi Bahasa Pemograman Berbasis Teks, Grafik, dan Multimedia" },
          { id: "J.620100.016.01", nama: "Menulis Kode dengan Prinsip sesuai Guidelines dan Best Practices" },
          { id: "J.620100.017.02", nama: "Mengimplementasikan Pemograman Terstruktur" },
          { id: "J.620100.023.02", nama: "Membuat Dokumen Kode Program" },
          { id: "J.620100.025.02", nama: "Melakukan Debugging" },
          { id: "J.620100.033.02", nama: "Melaksanakan Pengujian Unit Program" },
        ],
      },
      {
        nama: "Asisten Pemrograman Junior (Junior Assistant Programmer)",
        icon: "Code",
        items: [
          { id: "J.620100.004.02", nama: "Menggunakan Struktur Data" },
          { id: "J.620100.009.01", nama: "Menggunakan Spesifikasi Program" },
          { id: "J.620100.010.01", nama: "Menerapkan Perintah Eksekusi Bahasa Pemograman Berbasis Teks, Grafik, dan Multimedia" },
          { id: "J.620100.011.01", nama: "Melakukan Instalasi Software Tools Pemograman" },
          { id: "J.620100.012.01", nama: "Melakukan Pengaturan Software Tools Pemograman" },
          { id: "J.620100.016.01", nama: "Menulis Kode dengan Prinsip sesuai Guidelines dan Best Practices" },
          { id: "J.620100.017.02", nama: "Mengimplementasikan Pemograman Terstruktur" },
          { id: "J.620100.025.02", nama: "Melakukan Debugging" },
        ],
      },
    ],
  },
  "2": {
    title: "Akuntansi & Keuangan Lembaga (AKL)",
    kategori: [
      {
        nama: "Akuntansi & Keuangan Lembaga",
        icon: "Calculator",
        items: [
          { id: "M.692000.001.02", nama: "Menerapkan Prinsip Praktik Profesional dalam Bekerja" },
          { id: "M.692000.002.02", nama: "Menerapkan Praktik - Praktik Kesehatan dan Keselamatan di Tempat Kerja" },
          { id: "M.692000.007.02", nama: "Memproses Entry Jurnal" },
          { id: "M.692000.008.02", nama: "Memproses Buku Besar" },
          { id: "M.692000.013.02", nama: "Menyusun Laporan Keuangan" },
          { id: "M.692000.022.02", nama: "Mengoperasikan Paket Program Pengolah Angka/ Spreadsheet" },
          { id: "M.692000.023.02", nama: "Mengoperasikan Aplikasi Komputer Akuntansi" },
        ],
      },
    ],
  },
  "3": {
    title: "Manajemen Perkantoran / OTKP",
    kategori: [
      {
        nama: "Otomatisasi dan Tata Kelola Perkantoran",
        icon: "Users",
        items: [
          { id: "N.821100.001.02", nama: "Menangani Penerimaan/ Pengiriman Surat/ Dokumen" },
          { id: "N.821100.004.02", nama: "Memproduksi Dokumen" },
          { id: "N.821100.028.02", nama: "Mengaplikasikan Keterampilan Dasar Komunikasi" },
          { id: "N.821100.029.02", nama: "Melakukan Komunikasi Melalui Telepon" },
          { id: "N.821100.030.02", nama: "Melakukan Komunikasi Lisan dengan Kolega/Pelanggan" },
          { id: "N.821100.032.02", nama: "Melakukan Komunikasi Lisan dalam Bahasa Inggris pada Tingkat Operasional Dasar" },
          { id: "N.821100.033.02", nama: "Membaca dalam Bahasa Inggris pada Tingkat Operasional Dasar" },
          { id: "N.821100.053.02", nama: "Memproduksi Dokumen di Komputer" },
          { id: "N.821100.054.01", nama: "Menggunakan Peralatan Komunikasi" },
          { id: "N.821100.057.02", nama: "Mengoperasikan Aplikasi Perangkat Lunak" },
          { id: "N.821100.059.02", nama: "Menggunakan Peralatan dan Sumberdaya Kerja" },
          { id: "N.821100.067.01", nama: "Melakukan Transaksi Perbankan Sederhana" },
          { id: "N.821100.073.02", nama: "Mengelola Arsip" },
          { id: "N.821100.075.02", nama: "Menerapkan Prosedur K3 Perkantoran" },
          { id: "N.821100.076.02", nama: "Meminimalisir Pencurian" },
          { id: "N.821100.002.02", nama: "Mengatur Penggandaan/Pengumpulan Surat/Dokumen" },
          { id: "N.821100.003.02", nama: "Menciptakan Dokumen/Lembar Kerja Sederhana" },
          { id: "N.821100.007.02", nama: "Mencatat Dikte" },
          { id: "N.821100.012.01", nama: "Mengelola Jadwal Kegiatan Pimpinan" },
          { id: "N.821100.013.02", nama: "Mengatur Rapat/Pertemuan" },
          { id: "N.821100.034.02", nama: "Menulis dalam Bahasa Inggris pada Tingkat Operasional Dasar" },
          { id: "N.821100.041.01", nama: "Menulis Pesan Singkat dalam Bahasa Inggris" },
          { id: "N.821100.045.02", nama: "Memberikan Layanan kepada Pelanggan" },
          { id: "N.821100.049.02", nama: "Memenuhi Kebutuhan Pelanggan" },
          { id: "N.821100.056.02", nama: "Memelihara Data/File di Komputer" },
          { id: "N.821100.058.02", nama: "Mengakses Data di Komputer" },
          { id: "N.821100.060.01", nama: "Membuat Surat/Dokumen Elektronik" },
          { id: "N.821100.061.01", nama: "Mengakses Informasi melalui Homepage" },
        ],
      },
    ],
  },
  "4": {
    title: "Bisnis Retail (BDP)",
    kategori: [
      {
        nama: "Pramuniaga",
        icon: "ShoppingBag",
        items: [
          { id: "G.46RIT00.001.1", nama: "Merapikan Area Kerja" },
          { id: "G.46RIT00.002.1", nama: "Menjalankan Tugas dan Tanggung Jawab Pribadi" },
          { id: "G.46RIT00.003.1", nama: "Mengoperasikan Peralatan Dasar Ritel" },
          { id: "G.46RIT00.004.1", nama: "Membangun Perilaku Kerja Ritel yang Efektif" },
          { id: "G.46RIT00.008.1", nama: "Berkomunikasi Aktif dalam Lingkungan Kerja Ritel" },
          { id: "G.46RIT00.018.1", nama: "Menerapkan Perilaku Kerja Aman di Gerai Ritel" },
          { id: "G.46RIT00.005.1", nama: "Melakukan Pengemasan Barang Dagang" },
          { id: "G.46RIT00.026.1", nama: "Membantu Pelaksanaan Perhitungan Stok Barang Dagang" },
          { id: "G.46RIT00.031.1", nama: "Melakukan Kegiatan Pemajangan Barang Dagang (Display)" },
        ],
      },
      {
        nama: "Trainee Kasir",
        icon: "Calculator",
        items: [
          { id: "G.46RIT00.001.1", nama: "Merapikan Area Kerja" },
          { id: "G.46RIT00.002.1", nama: "Menjalankan Tugas dan Tanggung Jawab Pribadi" },
          { id: "G.46RIT00.003.1", nama: "Mengoperasikan Peralatan Dasar Ritel" },
          { id: "G.46RIT00.004.1", nama: "Membangun Perilaku Kerja Ritel yang Efektif" },
          { id: "G.46RIT00.008.1", nama: "Berkomunikasi Aktif dalam Lingkungan Kerja Ritel" },
          { id: "G.46RIT00.018.1", nama: "Menerapkan Perilaku Kerja Aman di Gerai Ritel" },
        ],
      },
    ],
  },
};