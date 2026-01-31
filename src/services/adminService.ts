import api from "./api";
import {
  type ApiResponse,
  type User,
  type PengajuanSertifikasi,
  type DashboardStats,
} from "../types";

interface UsersParams {
  role?: "admin" | "asesi" | "asesor";
  status?: "pending" | "approved" | "rejected";
  search?: string;
  per_page?: number;
  page?: number;
}

interface PengajuanParams {
  status?: "draft" | "submitted" | "in_review" | "approved" | "rejected";
  jurusan_id?: number;
  search?: string;
  per_page?: number;
  page?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const adminService = {
  getDashboard: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get<ApiResponse<DashboardStats>>(
      "/admin/dashboard"
    );
    return response.data;
  },

  getAllUsers: async (
    params?: UsersParams
  ): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<User>>>(
      "/admin/users",
      { params }
    );
    return response.data;
  },

  getPendingUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>("/admin/users/pending");
    return response.data;
  },

  getUserDetail: async (userId: number): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(`/admin/users/${userId}`);
    return response.data;
  },

  approveUser: async (userId: number): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>(
      `/admin/users/${userId}/approve`
    );
    return response.data;
  },

  rejectUser: async (
    userId: number,
    reason: string
  ): Promise<ApiResponse<{ user: User; reason: string }>> => {
    const response = await api.post<
      ApiResponse<{ user: User; reason: string }>
    >(`/admin/users/${userId}/reject`, { reason });
    return response.data;
  },

  deleteUser: async (userId: number): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
      `/admin/users/${userId}`
    );
    return response.data;
  },

  getAllPengajuan: async (
    params?: PengajuanParams
  ): Promise<ApiResponse<PaginatedResponse<PengajuanSertifikasi>>> => {
    const response = await api.get<
      ApiResponse<PaginatedResponse<PengajuanSertifikasi>>
    >("/admin/pengajuan", { params });
    return response.data;
  },

  getPengajuanDetail: async (
    pengajuanId: number
  ): Promise<ApiResponse<PengajuanSertifikasi>> => {
    const response = await api.get<ApiResponse<PengajuanSertifikasi>>(
      `/admin/pengajuan/${pengajuanId}`
    );
    return response.data;
  },
};

export default adminService;
