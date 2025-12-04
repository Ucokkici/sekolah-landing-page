import type { LucideIcon } from "lucide-react";

// Interface untuk setiap unit kompetensi
export interface UnitKompetensi {
  id: string;
  nama: string;
}

// Interface untuk kategori dalam satu program kompetensi
export interface KompetensiKategori {
  nama: string;
  icon: string; // Menggunakan string sebagai kunci untuk icon map
  items: UnitKompetensi[];
}

// Interface untuk detail seluruh kompetensi satu program
export interface KompetensiDetail {
  title: string;
  kategori: KompetensiKategori[];
}

// Interface untuk data program utama
export interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: string[];
  icon: string; // Menggunakan string sebagai kunci untuk icon map
}

// Type untuk icon map
export type IconMap = {
  [key: string]: LucideIcon;
};