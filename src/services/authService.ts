import api from "./api";
import {
  type ApiResponse,
  type LoginCredentials,
  type LoginResponse,
  type RegisterData,
  type User,
} from "../types";

const authService = {
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.post<ApiResponse<{ user: User }>>(
      "/auth/register",
      userData
    );
    return response.data;
  },

  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      credentials
    );

    if (response.data.success) {
      // --- PERBAIKAN: GANTI "auth_token" MENJADI "token" ---
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // --- PERBAIKAN: Juga lupa untuk menghapus kunci yang benar ---
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>("/auth/me");

    if (response.data.success) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }

    return response.data;
  },

  isAuthenticated: (): boolean => {
    // --- PERBAIKAN: Juga cek kunci yang benar ---
    return !!localStorage.getItem("token");
  },

  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getUserRole: (): "admin" | "asesi" | "asesor" | null => {
    const user = authService.getUser();
    return user?.role || null;
  },
};

export default authService;
