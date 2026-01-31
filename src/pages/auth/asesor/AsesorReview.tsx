import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import {
  PengajuanSertifikasi,
  UnitKompetensiDetail,
  BuktiKelengkapan,
  PenilaianAsesor,
  DetailUnitKompetensi,
} from "../../../types";
import SignaturePad from "../../../components/SignaturePade/SignaturePade";
import { getFileUrl, getFileIcon, openFile } from "../../../utils/fileHelper";
import "./AsesorReview.scss";

interface UnitPenilaian {
  unit_id: number;
  is_kompeten: boolean;
}

const AsesorReview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State Data
  const [pengajuan, setPengajuan] = useState<PengajuanSertifikasi | null>(null);
  const [units, setUnits] = useState<UnitKompetensiDetail[]>([]);
  const [files, setFiles] = useState<BuktiKelengkapan[]>([]);
  const [penilaian, setPenilaian] = useState<PenilaianAsesor | null>(null);

  // State Form Penilaian
  const [unitPenilaians, setUnitPenilaians] = useState<UnitPenilaian[]>([]);
  const [signature, setSignature] = useState<string>("");
  const [hasilPenilaianGlobal, setHasilPenilaianGlobal] = useState<
    "kompeten" | "belum_kompeten"
  >("kompeten");
  const [buktiPenilaian, setBuktiPenilaian] = useState("");
  const [rekomendasi, setRekomendasi] = useState("");
  const [tanggalPenilaian, setTanggalPenilaian] = useState(
    new Date().toISOString().split("T")[0],
  );

  // State Loading
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // PERBAIKAN: State untuk menandai apakah sudah dinilai atau bisa dinilai
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [canAssess, setCanAssess] = useState(false);

  // State untuk Step Navigation
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  useEffect(() => {
    if (id) {
      fetchReviewData(Number(id));
    }
  }, [id]);

  const fetchReviewData = async (pengajuanId: number) => {
    setLoading(true);
    try {
      const res = await api.get(`/asesor/pengajuan/${pengajuanId}`);
      if (res.data.success && res.data.data) {
        const p = res.data.data;
        setPengajuan(p);
        setFiles(p.bukti_kelengkapan || []);

        // PERBAIKAN: Tentukan mode berdasarkan status
        // - assigned atau in_review: bisa dinilai (canAssess = true)
        // - approved atau rejected: read-only
        if (p.status === "approved" || p.status === "rejected") {
          setIsReadOnly(true);
          setCanAssess(false);
        } else if (p.status === "assigned" || p.status === "in_review") {
          setIsReadOnly(false);
          setCanAssess(true);
        } else {
          // Status lain (submitted, draft, dll) tidak bisa dinilai
          setIsReadOnly(true);
          setCanAssess(false);
        }

        if (p.skema_id) {
          const resUnits = await api.get(
            `/skema/${p.skema_id}/unit-kompetensi`,
          );
          if (resUnits.data.success) {
            const rawData = resUnits.data.data;
            let unitsData: UnitKompetensiDetail[] = [];
            if (Array.isArray(rawData)) {
              unitsData = rawData;
            } else if (rawData?.unit_kompetensi) {
              unitsData = rawData.unit_kompetensi;
            }
            setUnits(unitsData);

            // PERBAIKAN: Inisialisasi penilaian jika bisa dinilai
            if (
              p.detail_unit_kompetensi &&
              (p.status === "assigned" || p.status === "in_review")
            ) {
              const initialPenilaians = p.detail_unit_kompetensi.map(
                (du: DetailUnitKompetensi) => ({
                  unit_id: du.unit_kompetensi_id,
                  is_kompeten: du.is_kompeten,
                }),
              );
              setUnitPenilaians(initialPenilaians);
            }
          }
        }

        if (p.penilaian_asesor) {
          setPenilaian(p.penilaian_asesor);
          setSignature(p.penilaian_asesor.tanda_tangan || "");
          setHasilPenilaianGlobal(p.penilaian_asesor.hasil_penilaian);
          setBuktiPenilaian(p.penilaian_asesor.bukti_penilaian || "");
          setRekomendasi(p.penilaian_asesor.rekomendasi || "");

          if (p.penilaian_asesor.tanggal_penilaian) {
            const date = new Date(p.penilaian_asesor.tanggal_penilaian);
            setTanggalPenilaian(date.toISOString().split("T")[0]);
          }
        }
      }
    } catch (err) {
      console.error("Gagal load review:", err);
      alert("Gagal memuat data pengajuan.");
      navigate("/asesor/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUnit = (unitId: number, isKompeten: boolean) => {
    setUnitPenilaians((prev) => {
      const exists = prev.find((up) => up.unit_id === unitId);
      if (exists) {
        return prev.map((up) =>
          up.unit_id === unitId ? { ...up, is_kompeten: isKompeten } : up,
        );
      } else {
        return [...prev, { unit_id: unitId, is_kompeten: isKompeten }];
      }
    });
  };

  const handleCheckAllKompeten = () => {
    if (pengajuan?.detail_unit_kompetensi) {
      const allKompeten = pengajuan.detail_unit_kompetensi.map((du) => ({
        unit_id: du.unit_kompetensi_id,
        is_kompeten: true,
      }));
      setUnitPenilaians(allKompeten);
      setHasilPenilaianGlobal("kompeten");
    }
  };

  const handleCheckAllBelumKompeten = () => {
    if (pengajuan?.detail_unit_kompetensi) {
      const allBelumKompeten = pengajuan.detail_unit_kompetensi.map((du) => ({
        unit_id: du.unit_kompetensi_id,
        is_kompeten: false,
      }));
      setUnitPenilaians(allBelumKompeten);
      setHasilPenilaianGlobal("belum_kompeten");
    }
  };

  useEffect(() => {
    if (unitPenilaians.length > 0) {
      const allKompeten = unitPenilaians.every((up) => up.is_kompeten);
      const allBelumKompeten = unitPenilaians.every((up) => !up.is_kompeten);

      if (allKompeten) {
        setHasilPenilaianGlobal("kompeten");
      } else if (allBelumKompeten) {
        setHasilPenilaianGlobal("belum_kompeten");
      } else {
        setHasilPenilaianGlobal("belum_kompeten");
      }
    }
  }, [unitPenilaians]);

  // PERBAIKAN: Handler untuk start review (jika status assigned)
  const handleStartReview = async () => {
    if (!pengajuan) return;

    try {
      const response = await api.post(
        `/asesor/pengajuan/${pengajuan.id}/start-review`,
      );

      if (response.data.success) {
        // Update pengajuan dengan data terbaru
        setPengajuan(response.data.data);
        setCanAssess(true);
        alert("✅ Review dimulai! Anda sekarang dapat menilai pengajuan ini.");
      }
    } catch (err: any) {
      console.error("Gagal start review:", err);
      alert(
        err.response?.data?.message ||
          "Gagal memulai review. Silakan coba lagi.",
      );
    }
  };

  const handleSubmit = async (action: "approve" | "reject") => {
    // PERBAIKAN: Jika status masih assigned, otomatis start review dulu
    if (pengajuan?.status === "assigned") {
      try {
        await api.post(`/asesor/pengajuan/${id}/start-review`);
      } catch (err: any) {
        alert(
          err.response?.data?.message ||
            "Gagal memulai review. Silakan coba lagi.",
        );
        return;
      }
    }

    // Validasi untuk APPROVE: Tanda tangan WAJIB
    if (action === "approve") {
      if (!signature || signature.trim() === "") {
        alert("Tanda tangan wajib diisi untuk MENYETUJUI pengajuan!");
        return;
      }
      const allKompeten = unitPenilaians.every((up) => up.is_kompeten);
      if (!allKompeten) {
        alert(
          "Tidak bisa APPROVE jika masih ada unit yang BELUM KOMPETEN!\nSilakan ubah penilaian atau pilih REJECT.",
        );
        return;
      }
    }

    // Validasi untuk REJECT: Rekomendasi WAJIB
    if (action === "reject") {
      if (!rekomendasi || rekomendasi.trim() === "") {
        alert("Catatan/Rekomendasi wajib diisi untuk MENOLAK pengajuan!");
        return;
      }
    }

    if (!tanggalPenilaian) {
      alert("Tanggal penilaian wajib diisi!");
      return;
    }

    const confirmText =
      action === "approve"
        ? "Apakah Anda yakin MENYETUJUI pengajuan ini?\n\nAsesi akan dinyatakan KOMPETEN."
        : "Apakah Anda yakin MENOLAK pengajuan ini?\n\nAsesi akan dinyatakan BELUM KOMPETEN.";

    if (!window.confirm(confirmText)) {
      return;
    }

    setSubmitting(true);
    try {
      const finalHasil = action === "approve" ? "kompeten" : "belum_kompeten";

      const payload: any = {
        hasil_penilaian: finalHasil,
        bukti_penilaian: buktiPenilaian,
        rekomendasi: rekomendasi,
        tanggal_penilaian: tanggalPenilaian,
        catatan_asesor: rekomendasi,
      };

      // Tambahkan tanda_tangan hanya jika ada isinya
      if (signature && signature.trim() !== "") {
        payload.tanda_tangan = signature;
      }

      console.log("Submitting payload:", payload);

      const response = await api.post(
        `/asesor/pengajuan/${id}/penilaian`,
        payload,
      );

      if (response.data.success) {
        alert(
          action === "approve"
            ? "✅ Pengajuan DISETUJUI!\n\nAsesi telah dinyatakan KOMPETEN."
            : "❌ Pengajuan DITOLAK!\n\nAsesi dinyatakan BELUM KOMPETEN.",
        );
        navigate("/asesor/dashboard");
      }
    } catch (err: any) {
      console.error("Gagal submit penilaian:", err);

      const errorMessage =
        err.response?.data?.message || "Gagal menyimpan penilaian.";
      const errorDetails = err.response?.data?.data || {};

      let alertMessage = errorMessage;
      if (Object.keys(errorDetails).length > 0) {
        alertMessage +=
          "\n\nDetail Error:\n" +
          Object.entries(errorDetails)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
      }

      alert(alertMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelReview = async () => {
    if (
      !window.confirm(
        "Apakah Anda yakin ingin membatalkan review ini?\n\nPengajuan akan dikembalikan ke status SUBMITTED.",
      )
    ) {
      return;
    }

    try {
      const response = await api.post(`/asesor/pengajuan/${id}/cancel-review`);
      if (response.data.success) {
        alert(
          "Review dibatalkan. Pengajuan dikembalikan ke status 'submitted'.",
        );
        navigate("/asesor/dashboard");
      }
    } catch (err: any) {
      console.error("Gagal cancel review:", err);
      alert(err.response?.data?.message || "Gagal membatalkan review.");
    }
  };

  const handleFileClick = (file: BuktiKelengkapan) => {
    const fullUrl = getFileUrl(file.file_url);
    console.log("Opening file:", fullUrl);
    openFile(file.file_url);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading)
    return <div className="loading-overlay">Memuat Data Review...</div>;

  if (!pengajuan) return null;

  return (
    <div className="asesor-review-page">
      <div className="page-header">
        <button
          onClick={() => navigate("/asesor/dashboard")}
          className="btn btn-back"
        >
          ← Kembali
        </button>
        <div className="header-info">
          <h1>Penilaian Pengajuan Sertifikasi</h1>
          <span className={`status-badge status-${pengajuan.status}`}>
            {pengajuan.status === "assigned" && "DITUGASKAN"}
            {pengajuan.status === "in_review" && "SEDANG DIREVIEW"}
            {pengajuan.status === "approved" && "DISETUJUI"}
            {pengajuan.status === "rejected" && "DITOLAK"}
            {!["assigned", "in_review", "approved", "rejected"].includes(
              pengajuan.status,
            ) && pengajuan.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* PERBAIKAN: Tampilkan tombol Start Review jika status assigned */}
      {pengajuan.status === "assigned" && (
        <div className="alert alert-info">
          <p>
            📋 Pengajuan ini telah ditugaskan kepada Anda. Klik tombol di bawah
            untuk memulai proses review.
          </p>
          <button
            onClick={handleStartReview}
            className="btn btn-primary btn-lg"
          >
            🚀 Mulai Review Sekarang
          </button>
        </div>
      )}

      {/* Step Indicator */}
      <div className="step-indicator">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`step-item ${currentStep === step ? "active" : ""} ${
              currentStep > step ? "completed" : ""
            }`}
            onClick={() => goToStep(step)}
          >
            <div className="step-number">{step}</div>
            <div className="step-label">
              {step === 1 && "Data Asesi"}
              {step === 2 && "Program"}
              {step === 3 && "Penilaian"}
              {step === 4 && "Dokumen"}
              {step === 5 && (isReadOnly ? "Hasil" : "Keputusan")}
            </div>
          </div>
        ))}
      </div>

      <div className="review-content">
        {/* Step 1: Data Asesi */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="section-card">
              <h2>📋 1. Data Pribadi Asesi</h2>
              <div className="asesi-detail">
                <div className="avatar-placeholder">
                  {pengajuan.asesi?.nama_lengkap.charAt(0)}
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Nama Lengkap</span>
                    <span className="value">
                      {pengajuan.asesi?.nama_lengkap}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email</span>
                    <span className="value">{pengajuan.asesi?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">NIK</span>
                    <span className="value">
                      {pengajuan.asesi?.no_ktp_nik_paspor}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Telepon</span>
                    <span className="value">{pengajuan.asesi?.no_telepon}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="label">Alamat</span>
                    <span className="value">
                      {pengajuan.asesi?.alamat_rumah || "Tidak tersedia"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Institusi</span>
                    <span className="value">
                      {pengajuan.asesi?.nama_institusi_perusahaan || "-"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Kualifikasi</span>
                    <span className="value">
                      {pengajuan.asesi?.kualifikasi_pendidikan || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Program Sertifikasi */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="section-card">
              <h2>🎯 2. Program Sertifikasi</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Jurusan</span>
                  <span className="value">
                    {pengajuan.jurusan?.nama_jurusan}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Skema</span>
                  <span className="value">
                    {pengajuan.skema_okupasi?.nama_skema}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Kode Skema</span>
                  <span className="value">
                    {pengajuan.skema_okupasi?.kode_skema}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Tanggal Pengajuan</span>
                  <span className="value">
                    {pengajuan.submitted_at
                      ? new Date(pengajuan.submitted_at).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Penilaian Unit Kompetensi */}
        {currentStep === 3 && (
          <div className="step-content">
            {/* PERBAIKAN: Gunakan canAssess untuk menentukan mode */}
            {canAssess ? (
              <div className="section-card">
                <div className="section-header-with-actions">
                  <h2>✅ Penilaian Unit Kompetensi</h2>
                  <div className="bulk-actions">
                    <button
                      onClick={handleCheckAllKompeten}
                      className="btn btn-sm btn-success"
                    >
                      ✓ Semua KOMPETEN
                    </button>
                    <button
                      onClick={handleCheckAllBelumKompeten}
                      className="btn btn-sm btn-danger"
                    >
                      ✗ Semua BELUM KOMPETEN
                    </button>
                  </div>
                </div>

                <div className="units-assessment">
                  {pengajuan.detail_unit_kompetensi &&
                  pengajuan.detail_unit_kompetensi.length > 0 ? (
                    pengajuan.detail_unit_kompetensi.map((du) => {
                      const masterUnit = units.find(
                        (u) => u.id === du.unit_kompetensi_id,
                      );
                      const currentPenilaian = unitPenilaians.find(
                        (up) => up.unit_id === du.unit_kompetensi_id,
                      );

                      return (
                        <div key={du.id} className="unit-assessment-item">
                          <div className="unit-header">
                            <strong>
                              {masterUnit?.nama_unit || "Unknown Unit"}
                            </strong>
                            <span className="unit-code">
                              {masterUnit?.kode_unit}
                            </span>
                          </div>

                          <div className="unit-body">
                            <div className="self-assessment">
                              <strong>Self-Assessment Asesi:</strong>
                              <span
                                className={`badge ${
                                  du.is_kompeten
                                    ? "badge-info"
                                    : "badge-warning"
                                }`}
                              >
                                {du.is_kompeten
                                  ? "✓ Kompeten"
                                  : "✗ Belum Kompeten"}
                              </span>
                              <p className="bukti-text">
                                <em>Bukti:</em> {du.bukti_relevan || "-"}
                              </p>
                            </div>

                            <div className="asesor-decision">
                              <strong>Keputusan Asesor:</strong>
                              <div className="decision-buttons">
                                <label className="decision-radio">
                                  <input
                                    type="radio"
                                    name={`unit-${du.unit_kompetensi_id}`}
                                    checked={
                                      currentPenilaian?.is_kompeten === true
                                    }
                                    onChange={() =>
                                      handleToggleUnit(
                                        du.unit_kompetensi_id,
                                        true,
                                      )
                                    }
                                  />
                                  <span className="radio-box kompeten">
                                    ✓ KOMPETEN
                                  </span>
                                </label>
                                <label className="decision-radio">
                                  <input
                                    type="radio"
                                    name={`unit-${du.unit_kompetensi_id}`}
                                    checked={
                                      currentPenilaian?.is_kompeten === false
                                    }
                                    onChange={() =>
                                      handleToggleUnit(
                                        du.unit_kompetensi_id,
                                        false,
                                      )
                                    }
                                  />
                                  <span className="radio-box belum-kompeten">
                                    ✗ BELUM KOMPETEN
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted">
                      Belum ada unit kompetensi yang diisi oleh asesi.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="section-card">
                <h2>✅ Unit Kompetensi</h2>
                <div className="units-review">
                  {pengajuan.detail_unit_kompetensi &&
                  pengajuan.detail_unit_kompetensi.length > 0 ? (
                    pengajuan.detail_unit_kompetensi.map((du) => {
                      const masterUnit = units.find(
                        (u) => u.id === du.unit_kompetensi_id,
                      );
                      return (
                        <div key={du.id} className="unit-review-item">
                          <div className="unit-header">
                            <strong>
                              {masterUnit?.nama_unit || "Unknown Unit"}
                            </strong>
                            <span>{masterUnit?.kode_unit}</span>
                          </div>
                          <div className="unit-body">
                            <span
                              className={`badge ${
                                du.is_kompeten
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {du.is_kompeten
                                ? "✓ Kompeten"
                                : "✗ Belum Kompeten"}
                            </span>
                            <p className="bukti-text">
                              <strong>Bukti:</strong> {du.bukti_relevan || "-"}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted">
                      Belum ada unit kompetensi yang diisi.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Bukti Kelengkapan */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="section-card">
              <h2>📁 4. Bukti Kelengkapan Dokumen</h2>
              {files.length > 0 ? (
                <div className="docs-grid">
                  {files.map((file) => (
                    <div key={file.id} className="doc-item">
                      <div className="doc-icon">
                        {getFileIcon(file.file_url)}
                      </div>
                      <span className="doc-label">
                        {file.jenis_dokumen.replace(/_/g, " ").toUpperCase()}
                      </span>
                      <small className="doc-filename">{file.nama_file}</small>
                      <button
                        onClick={() => handleFileClick(file)}
                        className="btn btn-sm btn-primary"
                      >
                        📥 Lihat File
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">
                  Belum ada bukti kelengkapan yang diupload.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Keputusan Final / Hasil */}
        {currentStep === 5 && (
          <div className="step-content">
            {/* PERBAIKAN: Gunakan canAssess untuk menentukan mode */}
            {canAssess ? (
              <div className="section-card active-assessment">
                <h2>🖊️ Keputusan Final & Tanda Tangan</h2>

                <div className="global-result">
                  <label>Hasil Penilaian Keseluruhan:</label>
                  <span
                    className={`badge-large ${
                      hasilPenilaianGlobal === "kompeten"
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {hasilPenilaianGlobal === "kompeten"
                      ? "✓ KOMPETEN"
                      : "✗ BELUM KOMPETEN"}
                  </span>
                </div>

                <div className="decision-form">
                  <div className="form-group">
                    <label>Tanggal Penilaian *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={tanggalPenilaian}
                      onChange={(e) => setTanggalPenilaian(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Bukti Penilaian (Opsional)</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={buktiPenilaian}
                      onChange={(e) => setBuktiPenilaian(e.target.value)}
                      placeholder="Catatan detail tentang penilaian..."
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Rekomendasi / Catatan Asesor *
                      <small className="text-danger">
                        {" "}
                        (Wajib diisi jika REJECT)
                      </small>
                    </label>
                    <textarea
                      rows={4}
                      className="form-control"
                      value={rekomendasi}
                      onChange={(e) => setRekomendasi(e.target.value)}
                      placeholder="Berikan feedback kepada asesi..."
                      required
                    />
                  </div>

                  <div className="signature-section">
                    <label>
                      Tanda Tangan Digital
                      {hasilPenilaianGlobal === "kompeten" && " *"}
                      <small
                        className={
                          hasilPenilaianGlobal === "kompeten"
                            ? "text-danger"
                            : "text-muted"
                        }
                      >
                        {" "}
                        {hasilPenilaianGlobal === "kompeten"
                          ? "(Wajib untuk APPROVE)"
                          : "(Opsional untuk REJECT)"}
                      </small>
                    </label>
                    <SignaturePad
                      onChange={setSignature}
                      initialValue={signature}
                    />
                  </div>
                </div>

                <div className="action-buttons-wrapper">
                  <button
                    onClick={handleCancelReview}
                    className="btn btn-secondary"
                    disabled={submitting}
                  >
                    🔙 Batalkan Review
                  </button>
                  <button
                    onClick={() => handleSubmit("reject")}
                    className="btn btn-danger"
                    disabled={submitting}
                  >
                    {submitting ? "Memproses..." : "❌ TOLAK"}
                  </button>
                  <button
                    onClick={() => handleSubmit("approve")}
                    className="btn btn-success"
                    disabled={submitting}
                  >
                    {submitting ? "Memproses..." : "✅ SETUJUI"}
                  </button>
                </div>
              </div>
            ) : (
              isReadOnly &&
              penilaian && (
                <div className="section-card result-card">
                  <h2>🏆 Hasil Penilaian Asesor</h2>
                  <div className="result-badge">
                    <span
                      className={
                        penilaian.hasil_penilaian === "kompeten"
                          ? "badge-success"
                          : "badge-danger"
                      }
                    >
                      {penilaian.hasil_penilaian === "kompeten"
                        ? "✓ KOMPETEN"
                        : "✗ BELUM KOMPETEN"}
                    </span>
                  </div>
                  <div className="result-detail">
                    <div className="info-item">
                      <span className="label">Nama Asesor</span>
                      <span className="value">{penilaian.nama_asesor}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Tanggal Penilaian</span>
                      <span className="value">
                        {new Date(
                          penilaian.tanggal_penilaian,
                        ).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    {penilaian.bukti_penilaian && (
                      <div className="info-item full-width">
                        <span className="label">Bukti Penilaian</span>
                        <span className="value">
                          {penilaian.bukti_penilaian}
                        </span>
                      </div>
                    )}
                    {penilaian.rekomendasi && (
                      <div className="info-item full-width">
                        <span className="label">Rekomendasi</span>
                        <span className="value">{penilaian.rekomendasi}</span>
                      </div>
                    )}
                    {penilaian.tanda_tangan && (
                      <div className="signature-display">
                        <span className="label">Tanda Tangan</span>
                        <img src={penilaian.tanda_tangan} alt="Signature" />
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="step-navigation">
          <button
            onClick={prevStep}
            className="btn btn-outline"
            disabled={currentStep === 1}
          >
            ← Sebelumnya
          </button>
          <div className="step-counter">
            Step {currentStep} dari {totalSteps}
          </div>
          <button
            onClick={nextStep}
            className="btn btn-primary"
            disabled={currentStep === totalSteps}
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsesorReview;
