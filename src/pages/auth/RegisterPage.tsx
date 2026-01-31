import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Jurusan } from "../../types";
import "./RegisterPage.scss";

// Definisikan tipe untuk data form
interface FormData {
  // Data Pribadi
  nama_lengkap: string;
  no_ktp_nik_paspor: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "laki-laki" | "perempuan" | "";
  kebangsaan: string;
  alamat_rumah: string;
  no_telepon: string;

  // Data Akun
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string; // <--- TAMBAHKAN INI (Asesi / Asesor)

  // Data Profesional
  kualifikasi_pendidikan: string;
  jurusan_id: number;
  nama_institusi_perusahaan: string;
  jabatan: string;
  alamat_kantor: string;
  no_telp_fax_email_kantor: string;
}

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    // Data Pribadi
    nama_lengkap: "",
    no_ktp_nik_paspor: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    kebangsaan: "Indonesia",
    alamat_rumah: "",
    no_telepon: "",
    // Data Akun
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "asesi", // <--- DEFAULT VALUE
    // Data Profesional
    kualifikasi_pendidikan: "",
    jurusan_id: 0,
    nama_institusi_perusahaan: "",
    jabatan: "",
    alamat_kantor: "",
    no_telp_fax_email_kantor: "",
  });

  useEffect(() => {
    const fetchJurusan = async () => {
      try {
        const res = await api.get("/jurusan");
        if (res.data.success) {
          setJurusanList(res.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data jurusan", error);
      }
    };
    fetchJurusan();
  }, []);

  const validatePassword = (password: string): string[] => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password minimal harus 8 karakter.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password harus mengandung setidaknya satu huruf besar.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password harus mengandung setidaknya satu simbol.");
    }
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Parsing value ke number jika itu adalah jurusan_id
    const finalValue = name === "jurusan_id" ? Number(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: finalValue,
    }));

    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Password
    if (passwordErrors.length > 0) {
      alert("Harap perbaiki error pada password sebelum mendaftar.");
      return;
    }

    // Validasi Jurusan
    if (!formData.jurusan_id || formData.jurusan_id === 0) {
      alert("Harap pilih Jurusan.");
      return;
    }

    // Validasi Role
    if (!formData.role) {
      alert("Harap pilih Role.");
      return;
    }

    // Kirim formData langsung (role sudah termasuk di dalamnya)
    const payload = {
      ...formData,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.data && typeof errorData.data === "object") {
          const errorMessages = Object.values(errorData.data).flat();
          if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(" "));
          }
        }
        throw new Error(
          errorData.message ||
            "Registrasi gagal. Silakan periksa kembali data Anda.",
        );
      }

      const successData = await response.json();
      console.log("Registrasi berhasil:", successData);
      alert(
        successData.message ||
          "Registrasi berhasil! Menunggu approval dari admin.",
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "Gagal menghubungi server. Silakan coba lagi.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <fieldset className="register-page__fieldset">
            <legend>Data Pribadi</legend>
            <div className="register-page__form-group">
              <label htmlFor="nama_lengkap">Nama Lengkap</label>
              <input
                type="text"
                id="nama_lengkap"
                name="nama_lengkap"
                value={formData.nama_lengkap}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="no_ktp_nik_paspor">No. KTP/NIK/Paspor</label>
              <input
                type="text"
                id="no_ktp_nik_paspor"
                name="no_ktp_nik_paspor"
                value={formData.no_ktp_nik_paspor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="tempat_lahir">Tempat Lahir</label>
              <input
                type="text"
                id="tempat_lahir"
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
              <input
                type="date"
                id="tanggal_lahir"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label>Jenis Kelamin</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value="laki-laki"
                    checked={formData.jenis_kelamin === "laki-laki"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Laki-laki
                </label>
                <label>
                  <input
                    type="radio"
                    name="jenis_kelamin"
                    value="perempuan"
                    checked={formData.jenis_kelamin === "perempuan"}
                    onChange={handleChange}
                    required
                  />{" "}
                  Perempuan
                </label>
              </div>
            </div>
            <div className="register-page__form-group">
              <label htmlFor="kebangsaan">Kebangsaan</label>
              <input
                type="text"
                id="kebangsaan"
                name="kebangsaan"
                value={formData.kebangsaan}
                onChange={handleChange}
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="alamat_rumah">Alamat Rumah</label>
              <textarea
                id="alamat_rumah"
                name="alamat_rumah"
                rows={3}
                value={formData.alamat_rumah}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="no_telepon">No. Telepon</label>
              <input
                type="tel"
                id="no_telepon"
                name="no_telepon"
                value={formData.no_telepon}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>
        );
      case 2:
        return (
          <fieldset className="register-page__fieldset">
            <legend>Data Akun</legend>

            {/* --- DROPDOWN ROLE (BARU) --- */}
            <div className="register-page__form-group">
              <label htmlFor="role">Daftar Sebagai</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">-- Pilih Role --</option>
                <option value="asesi">Asesi (Peserta Uji Kompetensi)</option>
                <option value="asesor">Asesor (Penilai Kompetensi)</option>
              </select>
              <small style={{ color: "#666" }}>
                Pilih peran Anda dalam sistem sertifikasi.
              </small>
            </div>
            {/* -------------------------- */}

            <div className="register-page__form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {passwordErrors.length > 0 && (
                <div className="password-errors">
                  {passwordErrors.map((error, index) => (
                    <p key={index} className="error-text">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="register-page__form-group">
              <label htmlFor="password_confirmation">Konfirmasi Password</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>
        );
      case 3:
        return (
          <fieldset className="register-page__fieldset">
            <legend>Data Profesional (Opsional)</legend>
            <div className="register-page__form-group">
              <label htmlFor="jurusan_id">Jurusan *</label>
              <select
                id="jurusan_id"
                name="jurusan_id"
                value={formData.jurusan_id}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="">-- Pilih Jurusan --</option>
                {jurusanList.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.nama_jurusan}
                  </option>
                ))}
              </select>
              <small style={{ color: "#666" }}>
                Pilih jurusan yang sesuai dengan keahlian Anda.
              </small>
            </div>

            <div className="register-page__form-group">
              <label htmlFor="kualifikasi_pendidikan">
                Kualifikasi Pendidikan
              </label>
              <select
                id="kualifikasi_pendidikan"
                name="kualifikasi_pendidikan"
                value={formData.kualifikasi_pendidikan}
                onChange={handleChange}
              >
                <option value="">-- Pilih Kualifikasi --</option>
                <option value="SMK">SMK</option>
                <option value="SMA">SMA</option>
                <option value="SKB">SKB</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
              </select>
            </div>
            <div className="register-page__form-group">
              <label htmlFor="nama_institusi_perusahaan">
                Nama Institusi/Perusahaan
              </label>
              <input
                type="text"
                id="nama_institusi_perusahaan"
                name="nama_institusi_perusahaan"
                value={formData.nama_institusi_perusahaan}
                onChange={handleChange}
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="jabatan">Jabatan</label>
              <input
                type="text"
                id="jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="alamat_kantor">Alamat Kantor</label>
              <textarea
                id="alamat_kantor"
                name="alamat_kantor"
                rows={3}
                value={formData.alamat_kantor}
                onChange={handleChange}
              />
            </div>
            <div className="register-page__form-group">
              <label htmlFor="no_telp_fax_email_kantor">
                No. Telp/Fax/Email Kantor
              </label>
              <input
                type="text"
                id="no_telp_fax_email_kantor"
                name="no_telp_fax_email_kantor"
                value={formData.no_telp_fax_email_kantor}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        );
      case 4:
        return (
          <div>
            <h3>Konfirmasi Data</h3>
            <p>Silakan periksa kembali data Anda sebelum mendaftar.</p>
            <div className="register-page__confirmation-data">
              <h4>Data Pribadi</h4>
              <p>
                <strong>Nama Lengkap:</strong> {formData.nama_lengkap}
              </p>
              <p>
                <strong>No. KTP/NIK/Paspor:</strong>{" "}
                {formData.no_ktp_nik_paspor}
              </p>
              <p>
                <strong>Tempat, Tanggal Lahir:</strong> {formData.tempat_lahir},{" "}
                {formData.tanggal_lahir}
              </p>
              <p>
                <strong>Jenis Kelamin:</strong> {formData.jenis_kelamin}
              </p>
              <p>
                <strong>Alamat:</strong> {formData.alamat_rumah}
              </p>
              <p>
                <strong>No. Telepon:</strong> {formData.no_telepon}
              </p>
            </div>
            <div className="register-page__confirmation-data">
              <h4>Data Akun</h4>
              {/* --- TAMPILKAN ROLE DI KONFIRMASI --- */}
              <p>
                <strong>Role:</strong>{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    backgroundColor:
                      formData.role === "asesor" ? "#e0e7ff" : "#d1fae5",
                    color: formData.role === "asesor" ? "#3730a3" : "#065f46",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {formData.role === "asesor"
                    ? "Asesor (Penilai)"
                    : "Asesi (Peserta)"}
                </span>
              </p>
              {/* ----------------------------------- */}
              <p>
                <strong>Username:</strong> {formData.username}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
            </div>
            <div className="register-page__confirmation-data">
              <h4>Data Profesional</h4>
              <p>
                <strong>Jurusan:</strong>{" "}
                {jurusanList.find((j) => j.id === formData.jurusan_id)
                  ?.nama_jurusan || "-"}
              </p>
              <p>
                <strong>Pendidikan:</strong>{" "}
                {formData.kualifikasi_pendidikan || "-"}
              </p>
              <p>
                <strong>Institusi/Perusahaan:</strong>{" "}
                {formData.nama_institusi_perusahaan || "-"}
              </p>
              <p>
                <strong>Jabatan:</strong> {formData.jabatan || "-"}
              </p>
              <p>
                <strong>Alamat Kantor:</strong> {formData.alamat_kantor || "-"}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__form-container">
        <h2 className="register-page__title">Registrasi - LSP Sertifikasi</h2>

        {/* Progress Bar */}
        <div className="register-page__progress-bar">
          <div
            className={`register-page__progress-step ${
              currentStep >= 1 ? "register-page__progress-step--complete" : ""
            } ${
              currentStep === 1 ? "register-page__progress-step--active" : ""
            }`}
          >
            <div className="register-page__progress-step__indicator">1</div>
            <div className="register-page__progress-step__title">
              Data Pribadi
            </div>
          </div>
          <div
            className={`register-page__progress-step ${
              currentStep >= 2 ? "register-page__progress-step--complete" : ""
            } ${
              currentStep === 2 ? "register-page__progress-step--active" : ""
            }`}
          >
            <div className="register-page__progress-step__indicator">2</div>
            <div className="register-page__progress-step__title">Data Akun</div>
          </div>
          <div
            className={`register-page__progress-step ${
              currentStep >= 3 ? "register-page__progress-step--complete" : ""
            } ${
              currentStep === 3 ? "register-page__progress-step--active" : ""
            }`}
          >
            <div className="register-page__progress-step__indicator">3</div>
            <div className="register-page__progress-step__title">
              Data Profesional
            </div>
          </div>
          <div
            className={`register-page__progress-step ${
              currentStep >= 4 ? "register-page__progress-step--complete" : ""
            } ${
              currentStep === 4 ? "register-page__progress-step--active" : ""
            }`}
          >
            <div className="register-page__progress-step__indicator">4</div>
            <div className="register-page__progress-step__title">
              Konfirmasi
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-page__form">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="register-page__nav-buttons">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="register-page__button register-page__button--secondary"
              >
                Sebelumnya
              </button>
            )}
            {currentStep < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="register-page__button register-page__button--primary"
              >
                Selanjutnya
              </button>
            )}
            {currentStep === 4 && (
              <button
                type="submit"
                className="register-page__button register-page__button--primary"
              >
                Daftar Sekarang
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
