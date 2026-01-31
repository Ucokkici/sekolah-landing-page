import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from "./UserPasswordRequest.module.scss";

const UserPasswordRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    new_password: "",
    new_password_confirmation: "",
    reason: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi Frontend Sederhana
    if (formData.new_password !== formData.new_password_confirmation) {
      alert("Konfirmasi password baru tidak cocok!");
      setLoading(false);
      return;
    }
    if (formData.new_password.length < 8) {
      alert("Password minimal 8 karakter.");
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("username", formData.username);
    payload.append("new_password", formData.new_password);
    payload.append(
      "new_password_confirmation",
      formData.new_password_confirmation,
    );
    if (file) payload.append("proof_ktp", file);
    if (formData.reason) payload.append("reason", formData.reason);

    try {
      const res = await api.post("/auth/password-reset-request", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengirim permohonan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.resetRequestPage}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>🔐 Reset Password Mandiri</h2>
            <p>Lupakan password lama Anda dan buat yang baru secara mandiri.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Username Anda</label>
              <input
                type="text"
                required
                placeholder="Masukkan username login Anda..."
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password Baru</label>
              <input
                type="password"
                required
                placeholder="Minimal 8 karakter..."
                value={formData.new_password}
                onChange={(e) =>
                  setFormData({ ...formData, new_password: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Konfirmasi Password Baru</label>
              <input
                type="password"
                required
                placeholder="Ulangi password baru..."
                value={formData.new_password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    new_password_confirmation: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.fileUpload}>
              <label>Upload Bukti KTP (Wajib)</label>
              <input
                type="file"
                required
                accept="image/*,application/pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <small>Format: JPG, PNG, atau PDF (Max 2MB)</small>
            </div>

            <div className={styles.formGroup}>
              <label>Alasan (Opsional)</label>
              <textarea
                rows={3}
                placeholder="Contoh: Lupa karena lama tidak login..."
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              ></textarea>
            </div>

            <div className={styles.formActions}>
              <Link
                to="/login"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Batal
              </Link>

              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Permohonan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.successIcon}>✅</div>
              <h1>Permohonan Terkirim</h1>
              <p>Permohonan reset password Anda telah kami terima.</p>

              <div className={styles.instructionBox}>
                <h3>Langkah Selanjutnya:</h3>
                <ol>
                  <li>Admin akan memverifikasi bukti KTP yang Anda upload.</li>
                  <li>Setelah disetujui, Admin akan menyetujui password Anda.</li>
                  <li>Silakan login kembali setelah beberapa saat.</li>
                  <li>Gunakan password baru yang Anda buat tadi.</li>
                </ol>
              </div>

              <Link 
                to="/login" 
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPasswordRequest;