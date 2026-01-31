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

export interface User {
  id: number;
  role: "admin" | "asesi" | "asesor";
  jurusan_id?: number;
  username: string;
  email: string;
  nama_lengkap: string;
  no_ktp_nik_paspor: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "laki-laki" | "perempuan";
  kebangsaan: string;
  alamat_rumah: string;
  no_telepon: string;
  kualifikasi_pendidikan?: "SMK" | "SMA" | "SKB";
  nama_institusi_perusahaan?: string;
  jabatan?: string;
  alamat_kantor?: string;
  no_telp_fax_email_kantor?: string;
  status_approval: "pending" | "approved" | "rejected";
  approved_by?: number;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Jurusan {
  id: number;
  kode_jurusan: string;
  nama_jurusan: string;
  deskripsi?: string;
  skema_okupasi_count?: number;
  created_at: string;
  updated_at: string;
}

export interface SkemaOkupasi {
  id: number;
  jurusan_id: number;
  kode_skema: string;
  nama_skema: string;
  deskripsi?: string;
  unit_kompetensi_count?: number;
  jurusan?: Jurusan;
  created_at: string;
  updated_at: string;
}

export interface UnitKompetensiDetail {
  id: number;
  skema_id: number;
  kode_unit: string;
  nama_unit: string;
  deskripsi?: string;
  created_at: string;
  updated_at: string;
}

export interface DetailUnitKompetensi {
  id: number;
  pengajuan_id: number;
  unit_kompetensi_id: number;
  is_kompeten: boolean;
  bukti_relevan?: string;
  unit_kompetensi?: UnitKompetensiDetail;
  created_at: string;
  updated_at: string;
}

export interface BuktiKelengkapan {
  id: number;
  pengajuan_id: number;
  jenis_dokumen:
    | "kartu_pelajar"
    | "raport_semester_1_5"
    | "sertifikat_pkl"
    | "kartu_keluarga_ktp"
    | "pas_foto_3x4";
  file_path: string;
  nama_file: string;
  ukuran_file: number;
  mime_type: string;
  file_url?: string;
  uploaded_at: string;
  created_at: string;
  updated_at: string;
}

export interface PenilaianAsesor {
  id: number;
  pengajuan_id: number;
  asesor_id: number;
  nama_asesor: string;
  tanda_tangan: string | null;
  hasil_penilaian: "kompeten" | "belum_kompeten";
  bukti_penilaian?: string;
  rekomendasi?: string;
  tanggal_penilaian: string;
  created_at: string;
  updated_at: string;
}

export interface PengajuanSertifikasi {
  id: number;
  asesi_id: number;
  jurusan_id: number;
  skema_id: number;
  status:
    | "draft"
    | "submitted"
    | "assigned"
    | "in_review"
    | "approved"
    | "rejected";
  submitted_at?: string;
  reviewed_by?: number;
  reviewed_at?: string;
  batch_number?: string | null;
  catatan_asesi?: string;
  catatan_asesor?: string;
  asesi?: User;
  asesor?: User;
  jurusan?: Jurusan;
  skema_okupasi?: SkemaOkupasi;
  detail_unit_kompetensi?: DetailUnitKompetensi[];
  bukti_kelengkapan?: BuktiKelengkapan[];
  penilaian_asesor?: PenilaianAsesor;
  created_at: string;
  updated_at: string;
}

export interface PengajuanFilter {
  status?: "draft" | "submitted" | "in_review" | "approved" | "rejected";
}

export interface PengajuanParams {
  id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterData {
  role: "asesi" | "asesor";
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  nama_lengkap: string;
  no_ktp_nik_paspor: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "laki-laki" | "perempuan";
  kebangsaan: string;
  alamat_rumah: string;
  no_telepon: string;
  kualifikasi_pendidikan?: "SMK" | "SMA" | "SKB";
  nama_institusi_perusahaan?: string;
  jabatan?: string;
  alamat_kantor?: string;
  no_telp_fax_email_kantor?: string;
}

export interface DashboardStats {
  total_approved: number;
  total_rejected: number;
  total_users?: number;
  total_admin?: number;
  total_asesi?: number;
  total_asesor?: number;
  pending_approval?: number;
  total_pengajuan?: number;
  pengajuan_submitted?: number;
  pengajuan_approved?: number;
  pengajuan_rejected?: number;
  total_reviewed?: number;
  in_review?: number;
  available_for_review?: number;
}

export interface AsesiItem {
  pengajuan_id: number;
  asesi: User;
  jurusan_id: number;
  skema_id: number;
}
