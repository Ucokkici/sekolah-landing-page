import api from "./api";
import {
  type ApiResponse,
  type PengajuanSertifikasi,
  type PenilaianAsesor,
  type DashboardStats,
} from "../types";

interface AvailablePengajuanParams {
  jurusan_id?: number;
  skema_id?: number;
}

interface SubmitPenilaianData {
  hasil_penilaian: "kompeten" | "belum_kompeten";
  bukti_penilaian?: string;
  rekomendasi?: string;
  tanda_tangan: string;
  tanggal_penilaian: string;
  catatan_asesor?: string;
}

interface UpdatePenilaianData {
  hasil_penilaian?: "kompeten" | "belum_kompeten";
  bukti_penilaian?: string;
  rekomendasi?: string;
  tanda_tangan?: string;
  tanggal_penilaian?: string;
}

const asesorService = {
  getDashboard: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get<ApiResponse<DashboardStats>>(
      "/asesor/dashboard"
    );
    return response.data;
  },

  getAvailablePengajuan: async (
    params?: AvailablePengajuanParams
  ): Promise<ApiResponse<PengajuanSertifikasi[]>> => {
    const response = await api.get<ApiResponse<PengajuanSertifikasi[]>>(
      "/asesor/pengajuan/available",
      { params }
    );
    return response.data;
  },

  getMyReviews: async (
    status?: string
  ): Promise<ApiResponse<PengajuanSertifikasi[]>> => {
    const params = status ? { status } : {};
    const response = await api.get<ApiResponse<PengajuanSertifikasi[]>>(
      "/asesor/pengajuan/my-reviews",
      { params }
    );
    return response.data;
  },

  getPengajuanDetail: async (
    pengajuanId: number
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.get<ApiResponse<PengajuanSertifikasi>>(
      `/asesor/pengajuan/${pengajuanId}`
    );
    return response.data;
  },

  startReview: async (
    pengajuanId: number
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.post<ApiResponse<PengajuanSertifikasi>>(
      `/asesor/pengajuan/${pengajuanId}/start-review`
    );
    return response.data;
  },

  cancelReview: async (
    pengajuanId: number
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.post<ApiResponse<PengajuanSertifikasi>>(
      `/asesor/pengajuan/${pengajuanId}/cancel-review`
    );
    return response.data;
  },

  submitPenilaian: async (
    pengajuanId: number,
    penilaianData: SubmitPenilaianData
  ): Promise<
    ApiResponse<{ pengajuan: PengajuanSertifikasi; penilaian: PenilaianAsesor }>
  > => {
    const response = await api.post<
      ApiResponse<{
        pengajuan: PengajuanSertifikasi;
        penilaian: PenilaianAsesor;
      }>
    >(`/asesor/pengajuan/${pengajuanId}/penilaian`, penilaianData);
    return response.data;
  },

  updatePenilaian: async (
    penilaianId: number,
    penilaianData: UpdatePenilaianData
  ): Promise<ApiResponse<PenilaianAsesor>> => {
    const response = await api.put<ApiResponse<PenilaianAsesor>>(
      `/asesor/penilaian/${penilaianId}`,
      penilaianData
    );
    return response.data;
  },
};

export default asesorService;
