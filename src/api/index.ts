// src/api/index.ts

import axios from "axios";
// Ganti dengan URL base API backend Anda
const baseURL = "https://api-anda.com/api";

// Buat instance axios dengan konfigurasi dasar
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Menambahkan token ke header SEBELUM permintaan dikirim
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage.
    // Pastikan di AuthContext Anda menyimpan token dengan key 'authToken'
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log('Request sent with config:', config); // Untuk debugging
    return config;
  },
  (error) => {
    // Jika ada error pada konfigurasi request, langsung tolak
    return Promise.reject(error);
  }
);

// Response Interceptor: Menangani error response SECARA GLOBAL
api.interceptors.response.use(
  (response) => {
    // Jika response sukses (status 2xx), langsung kembalikan
    return response;
  },
  (error) => {
    // Jika response error
    if (error.response) {
      // Server merespons dengan status code di luar range 2xx
      const { status } = error.response;

      // Jika status 401 (Unauthorized), berarti token tidak valid atau kadaluarsa
      if (status === 401) {
        console.error(
          "Token tidak valid atau kadaluarsa. Mengarahkan ke halaman login."
        );
        localStorage.removeItem("authToken"); // Hapus token yang tidak valid
        // Arahkan pengguna ke halaman login
        window.location.href = "/login";
      }
    } else if (error.request) {
      // Request dibuat tapi tidak ada respons dari server (masalah jaringan)
      console.error("Tidak ada respons dari server:", error.request);
    } else {
      // Terjadi error lain dalam setup request
      console.error("Error:", error.message);
    }

    // Lanjutkan error ke komponen yang memanggil API agar bisa ditangani di sana
    return Promise.reject(error);
  }
);

export default api;
