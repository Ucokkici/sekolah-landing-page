import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { User } from "../../types";
import "./Profile.scss";

// Interface untuk Form Perbaikan Data (Request NIK correction)
interface CorrectionForm {
  field_name: string;
  new_value: string;
  proof_file: File | null;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // State Data User
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State Tab Aktif
  const [activeTab, setActiveTab] = useState<
    "info" | "security" | "correction"
  >("info");

  // State Form Data (Untuk Edit Profil)
  const [formData, setFormData] = useState<Partial<User>>({});

  // State Form Password
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // State Form Correction (Untuk Request Perbaikan NIK/Data)
  const [correctionData, setCorrectionData] = useState<CorrectionForm>({
    field_name: "nik",
    new_value: "",
    proof_file: null,
  });

  // 1. Fetch Data User Saat Mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/me");
      if (res.data.success) {
        const userData = res.data.data;
        setUser(userData);
        setFormData(userData); // Isi form dengan data user saat ini
      }
    } catch (err) {
      console.error("Gagal load profil:", err);
      navigate("/login"); // Redirect jika session habis (gunakan navigate biasa, karena mau tetap di web app)
    } finally {
      setLoading(false);
    }
  };

  // HELPER: Redirect ke Dashboard dengan REFRESH HALAMAN
  const navigateToDashboard = () => {
    if (!user?.role) return;

    let dashboardUrl = "/";

    if (user.role === "asesi") dashboardUrl = "/asesi/dashboard";
    else if (user.role === "asesor") dashboardUrl = "/asesor/dashboard";
    else if (user.role === "admin") dashboardUrl = "/admin/dashboard";

    // Menggunakan window.location.href agar halaman di-refresh total dari server
    window.location.href = dashboardUrl;
  };

  // 2. Handle Update Profil Umum (Nama, Telepon, Alamat, dll)
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.post("/auth/profile/update", formData);
      if (res.data.success) {
        alert("✅ Profil berhasil diperbarui! Halaman akan dimuat ulang.");
        setUser(res.data.data); // Update state user lokal (opsional, karena akan direfresh)
        navigateToDashboard();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui profil.");
    } finally {
      setSaving(false);
    }
  };

  // 3. Handle Ganti Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      alert("Password baru tidak cocok!");
      return;
    }
    setSaving(true);
    try {
      const res = await api.post("/auth/password/change", passwordData);
      if (res.data.success) {
        alert("✅ Password berhasil diubah. Halaman akan dimuat ulang.");
        // Reset form
        setPasswordData({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        navigateToDashboard();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengubah password.");
    } finally {
      setSaving(false);
    }
  };

  // 4. Handle Request Perbaikan Data (Khusus Asesor/Asesi)
  const handleRequestCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionData.new_value) {
      alert("Data baru harus diisi");
      return;
    }
    if (!correctionData.proof_file) {
      alert("Bukti dokumen (KTP) wajib diupload");
      return;
    }

    const dataPayload = new FormData();
    dataPayload.append("field_name", correctionData.field_name);
    dataPayload.append("new_value", correctionData.new_value);
    dataPayload.append("proof_file", correctionData.proof_file);

    setSaving(true);
    try {
      const res = await api.post("/data-correction", dataPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert(
          "✅ Permohonan koreksi data berhasil dikirim. Halaman akan dimuat ulang.",
        );
        setCorrectionData({
          field_name: "nik",
          new_value: "",
          proof_file: null,
        });
        navigateToDashboard();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengirim permohonan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-page">Memuat profil...</div>;

  if (!user) return null;

  // --- HELPER UNTUK TAMPILAN SPESIFIK ROLE ---
  const isAsesi = user.role === "asesi";
  const isAsesor = user.role === "asesor";
  const isAdmin = user.role === "admin";

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* 1. PROFILE HEADER */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-placeholder">
              {user.nama_lengkap.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h2>{user.nama_lengkap}</h2>
              <p className="user-email">{user.email}</p>
              <span className={`badge badge-${user.role}`}>
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Tombol Navigasi Tab */}
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              Informasi Pribadi
            </button>
            <button
              className={`tab ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              Keamanan & Password
            </button>

            {/* Tab Perbaikan Data hanya untuk Asesor & Asesi */}
            {(isAsesor || isAsesi) && (
              <button
                className={`tab ${activeTab === "correction" ? "active" : ""}`}
                onClick={() => setActiveTab("correction")}
              >
                Perbaikan Data
              </button>
            )}
          </div>
        </div>

        {/* 2. CONTENT AREA */}
        <div className="profile-content">
          {/* TAB 1: INFORMASI PRIBADI */}
          {activeTab === "info" && (
            <div className="content-section">
              <h3>Ubah Profil</h3>
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      value={formData.nama_lengkap || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nama_lengkap: e.target.value,
                        })
                      }
                      disabled={false}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email (Login)</label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      disabled
                      className="disabled-input"
                      title="Email tidak bisa diubah"
                    />
                  </div>

                  <div className="form-group">
                    <label>No. Telepon</label>
                    <input
                      type="text"
                      value={formData.no_telepon || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, no_telepon: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Jenis Kelamin</label>
                    <select disabled value={formData.jenis_kelamin}>
                      <option value="laki-laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>

                  {/* FIELD KHUSUS ASESI */}
                  {isAsesi && (
                    <>
                      <div className="form-group">
                        <label>Jurusan</label>
                        <select disabled value={formData.jurusan_id}>
                          {/* Asumsi props jurusan di load dari user relation atau dropdown */}
                          <option>Pilih Jurusan</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Sekolah / Asal Institusi</label>
                        <input
                          type="text"
                          value={formData.nama_institusi_perusahaan || ""}
                          disabled
                        />
                      </div>
                    </>
                  )}

                  {/* FIELD KHUSUS ASESOR */}
                  {isAsesor && (
                    <>
                      <div className="form-group">
                        <label>Jurusan Kompetensi</label>
                        <select disabled value={formData.jurusan_id}>
                          <option>Pilih Jurusan</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Jabatan</label>
                        <input
                          type="text"
                          value={formData.jabatan || ""}
                          disabled
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Alamat Full Width */}
                <div className="form-group full-width">
                  <label>Alamat Rumah</label>
                  <textarea
                    rows={3}
                    value={formData.alamat_rumah || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, alamat_rumah: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: KEAMANAN */}
          {activeTab === "security" && (
            <div className="content-section">
              <h3>Ganti Password</h3>
              <div className="alert-box">
                ⚠️ Password minimal 8 karakter. Gunakan kombinasi huruf dan
                angka.
              </div>
              <form onSubmit={handleChangePassword} className="profile-form">
                <div className="form-group">
                  <label>Password Saat Ini</label>
                  <input
                    type="password"
                    required
                    value={passwordData.current_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current_password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Password Baru</label>
                  <input
                    type="password"
                    required
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    required
                    value={passwordData.new_password_confirmation}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password_confirmation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Mengubah..." : "Ganti Password"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PERBAIKAN DATA (NIK / KTP) */}
          {activeTab === "correction" && (
            <div className="content-section">
              <h3>Ajukan Perbaikan Data</h3>
              <div className="alert-box alert-warning">
                📝 Gunakan fitur ini jika ada kesalahan pada data NIK atau Nama
                di database yang tidak sesuai dengan KTP Anda.
                <br />
                Admin akan memverifikasi bukti yang Anda upload.
              </div>

              <form onSubmit={handleRequestCorrection} className="profile-form">
                <div className="form-group">
                  <label>Pilih Data yang Salah</label>
                  <select
                    value={correctionData.field_name}
                    onChange={(e) =>
                      setCorrectionData({
                        ...correctionData,
                        field_name: e.target.value,
                      })
                    }
                  >
                    <option value="nik">NIK (Nomor Induk Kependudukan)</option>
                    <option value="nama_lengkap">Nama Lengkap</option>
                    <option value="no_telepon">Nomor Telepon</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nilai Data Saat Ini (Sistem)</label>
                  <input
                    type="text"
                    value={user[correctionData.field_name as keyof User] || ""}
                    disabled
                    className="disabled-input"
                  />
                </div>

                <div className="form-group">
                  <label>Data Yang Benar (Baru)</label>
                  <input
                    type="text"
                    placeholder="Masukkan data yang sesuai KTP..."
                    value={correctionData.new_value}
                    onChange={(e) =>
                      setCorrectionData({
                        ...correctionData,
                        new_value: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Upload Bukti (KTP / Kartu Identitas)</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCorrectionData({
                          ...correctionData,
                          proof_file: e.target.files[0],
                        });
                      }
                    }}
                    required
                  />
                  <small>Format: JPG, PNG, PDF (Max 2MB)</small>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={saving}
                  >
                    {saving ? "Mengirim..." : "Kirim Permohonan"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
