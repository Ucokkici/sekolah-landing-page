import api from "./api";
import {
  type ApiResponse,
  type PengajuanSertifikasi,
  type BuktiKelengkapan,
} from "../types";

interface CreatePengajuanData {
  skema_id: number;
  catatan_asesi?: string;
}

interface UnitKompetensiInput {
  unit_kompetensi_id: number;
  is_kompeten: boolean;
  bukti_relevan?: string;
}

interface UpdateUnitKompetensiData {
  unit_kompetensi: UnitKompetensiInput[];
}

type JenisDokumen =
  | "kartu_pelajar"
  | "raport_semester_1_5"
  | "sertifikat_pkl"
  | "kartu_keluarga_ktp"
  | "pas_foto_3x4";

const asesiService = {
  getMyPengajuan: async (
    status?: string
  ): Promise<ApiResponse<PengajuanSertifikasi[]>> => {
    const params = status ? { status } : {};
    const response = await api.get<ApiResponse<PengajuanSertifikasi[]>>(
      "/asesi/pengajuan",
      { params }
    );
    return response.data;
  },

  getPengajuanDetail: async (
    pengajuanId: number
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.get<ApiResponse<PengajuanSertifikasi>>(
      `/asesi/pengajuan/${pengajuanId}`
    );
    return response.data;
  },

  createPengajuan: async (
    data: CreatePengajuanData
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.post<ApiResponse<PengajuanSertifikasi>>(
      "/asesi/pengajuan",
      data
    );
    return response.data;
  },

  updateUnitKompetensi: async (
    pengajuanId: number,
    unitData: UpdateUnitKompetensiData
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.post<ApiResponse<PengajuanSertifikasi>>(
      `/asesi/pengajuan/${pengajuanId}/unit-kompetensi`,
      unitData
    );
    return response.data;
  },

  uploadBukti: async (
    pengajuanId: number,
    jenisDokumen: JenisDokumen,
    file: File
  ): Promise<ApiResponse<BuktiKelengkapan>> => {
    const formData = new FormData();
    formData.append("jenis_dokumen", jenisDokumen);
    formData.append("file", file);

    const response = await api.post<ApiResponse<BuktiKelengkapan>>(
      `/asesi/pengajuan/${pengajuanId}/upload-bukti`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteBukti: async (
    pengajuanId: number,
    buktiId: number
  ): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
      `/asesi/pengajuan/${pengajuanId}/bukti/${buktiId}`
    );
    return response.data;
  },

  updateCatatan: async (
    pengajuanId: number,
    catatan: string
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.put<ApiResponse<PengajuanSertifikasi>>(
      `/asesi/pengajuan/${pengajuanId}/catatan`,
      { catatan_asesi: catatan }
    );
    return response.data;
  },

  submitPengajuan: async (
    pengajuanId: number
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.post<ApiResponse<PengajuanSertifikasi>>(
      `/asesi/pengajuan/${pengajuanId}/submit`
    );
    return response.data;
  },

  deletePengajuan: async (pengajuanId: number): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
      `/asesi/pengajuan/${pengajuanId}`
    );
    return response.data;
  },
};

export default asesiService;
