import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import {
  Jurusan,
  SkemaOkupasi,
  UnitKompetensiDetail,
  BuktiKelengkapan,
} from "../../../types";
import "./CreatePengajuan.scss";

// Interface untuk form data local
interface UnitForm {
  unit_kompetensi_id: number;
  is_kompeten: boolean;
  bukti_relevan: string;
}

const CreatePengajuan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State untuk membedakan mode
  const [isEditMode, setIsEditMode] = useState(false);

  // State Wizard
  const [currentStep, setCurrentStep] = useState(1);

  // State Data Master
  const [jurusans, setJurusans] = useState<Jurusan[]>([]);
  const [skemas, setSkemas] = useState<SkemaOkupasi[]>([]);
  const [units, setUnits] = useState<UnitKompetensiDetail[]>([]);

  // State Form
  const [selectedJurusan, setSelectedJurusan] = useState<number | null>(null);
  const [selectedSkema, setSelectedSkema] = useState<number | null>(null);
  const [pengajuanId, setPengajuanId] = useState<number | null>(null);
  const [catatanAsesi, setCatatanAsesi] = useState("");

  // State Units
  const [unitForms, setUnitForms] = useState<UnitForm[]>([]);

  // State Files & Upload Status
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, BuktiKelengkapan>
  >({});
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>(
    {}
  );

  // State Global Loading
  const [loading, setLoading] = useState(false);

  // 1. Load Jurusan saat mount
  useEffect(() => {
    fetchJurusans();
    if (id) {
      // EDIT MODE: Ada ID di URL
      setIsEditMode(true);
      loadExistingPengajuan(Number(id));
    }
  }, [id]);

  const fetchJurusans = async () => {
    try {
      const res = await api.get("/jurusan");
      if (res.data.success) setJurusans(res.data.data);
    } catch (err) {
      console.error("Gagal load jurusan:", err);
    }
  };

  // 2. Load Skema saat Jurusan dipilih
  useEffect(() => {
    if (selectedJurusan && !isEditMode) {
      // Hanya auto-load skema saat CREATE mode
      api
        .get(`/jurusan/${selectedJurusan}/skema`)
        .then((res) => {
          if (res.data.success) {
            setSkemas(
              Array.isArray(res.data.data.skema) ? res.data.data.skema : []
            );
          }
        })
        .catch((err) => {
          console.error("Gagal load skema:", err);
        });
    }
  }, [selectedJurusan, isEditMode]);

  // Helper untuk fetch units saat skema dipilih
  const fetchSkemaAndUnits = async (
    sId: number,
    forceInit: boolean = false
  ): Promise<UnitKompetensiDetail[]> => {
    try {
      const resUnits = await api.get(`/skema/${sId}/unit-kompetensi`);

      if (resUnits.data.success) {
        const rawData = resUnits.data.data;
        let unitsData: UnitKompetensiDetail[] = [];

        if (Array.isArray(rawData)) {
          unitsData = rawData;
        } else if (rawData && Array.isArray(rawData.unit_kompetensi)) {
          unitsData = rawData.unit_kompetensi;
        } else if (rawData && Array.isArray(rawData.units)) {
          unitsData = rawData.units;
        }

        setUnits(unitsData);

        // Hanya inisialisasi form jika diminta (Mode Create)
        if (forceInit) {
          setUnitForms(
            unitsData.map((u: UnitKompetensiDetail) => ({
              unit_kompetensi_id: u.id,
              is_kompeten: false,
              bukti_relevan: "",
            }))
          );
        }

        return unitsData;
      }
      return [];
    } catch (err) {
      console.error("Gagal fetch units:", err);
      return [];
    }
  };

  // EDIT MODE: Load data pengajuan yang sudah ada
  const loadExistingPengajuan = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get(`/asesi/pengajuan/${id}`);
      if (res.data.success && res.data.data) {
        const p = res.data.data;

        // --- VALIDASI STATUS EDIT ---
        const editableStatus = ["draft", "submitted", "rejected"];
        if (!editableStatus.includes(p.status)) {
          alert(
            `Status pengajuan saat ini adalah '${p.status}'.\nPengajuan tidak bisa diedit karena sedang dinilai atau sudah selesai.`
          );
          navigate("/asesi/dashboard");
          return;
        }

        setPengajuanId(p.id);
        setSelectedJurusan(p.jurusan_id);
        setSelectedSkema(p.skema_id);
        setCatatanAsesi(p.catatan_asesi || "");

        // Manual Load Skemas agar dropdown tidak kosong saat Edit
        const resSkema = await api.get(`/jurusan/${p.jurusan_id}/skema`);
        if (resSkema.data.success) {
          setSkemas(
            Array.isArray(resSkema.data.data.skema)
              ? resSkema.data.data.skema
              : []
          );
        }

        // Load Master Units dan gunakan return value
        const loadedUnits = await fetchSkemaAndUnits(p.skema_id, false);

        // Set Forms dari data existing
        if (p.detail_unit_kompetensi && p.detail_unit_kompetensi.length > 0) {
          const mappedForms = p.detail_unit_kompetensi.map((du: any) => ({
            unit_kompetensi_id: du.unit_kompetensi_id,
            is_kompeten: du.is_kompeten,
            bukti_relevan: du.bukti_relevan || "",
          }));
          setUnitForms(mappedForms);
        } else {
          // Inisialisasi kosong jika belum ada data
          setUnitForms(
            loadedUnits.map((u: UnitKompetensiDetail) => ({
              unit_kompetensi_id: u.id,
              is_kompeten: false,
              bukti_relevan: "",
            }))
          );
        }

        // Load files yang sudah diupload
        const fileMap: Record<string, BuktiKelengkapan> = {};
        if (p.bukti_kelengkapan) {
          p.bukti_kelengkapan.forEach((b: BuktiKelengkapan) => {
            fileMap[b.jenis_dokumen] = b;
          });
        }
        setUploadedFiles(fileMap);
      }
    } catch (err) {
      console.error("Gagal load pengajuan:", err);
      alert("Gagal memuat data pengajuan");
      navigate("/asesi/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 1: CREATE MODE ONLY - BUAT DRAFT BARU ---
  const handleStep1Next = async () => {
    if (!selectedSkema) {
      alert("Pilih skema sertifikasi!");
      return;
    }

    setLoading(true);
    try {
      // CREATE MODE: Langsung buat draft baru tanpa cek existing
      const response = await api.post("/asesi/pengajuan", {
        skema_id: selectedSkema,
        catatan_asesi: catatanAsesi,
      });

      if (response.data.success && response.data.data) {
        const newId = response.data.data.id;
        setPengajuanId(newId);
        setIsEditMode(true); // Setelah buat, switch ke edit mode

        // Fetch Master Units DAN Inisialisasi Form Kosong
        if (selectedSkema !== null) {
          await fetchSkemaAndUnits(selectedSkema, true);
          setCurrentStep(2);
        }
      } else {
        alert("Gagal membuat draft pengajuan.");
      }
    } catch (err: any) {
      console.error("Error handleStep1Next:", err);

      // Handle error jika sudah ada pengajuan dengan status tertentu
      if (
        err.response?.status === 400 &&
        err.response?.data?.message?.includes("sudah memiliki pengajuan")
      ) {
        const confirmEdit = window.confirm(
          `${err.response.data.message}\n\nApakah Anda ingin mengedit pengajuan yang sudah ada?`
        );

        if (confirmEdit) {
          // Redirect ke halaman edit
          // Anda perlu mendapatkan ID pengajuan dari response error atau fetch ulang
          try {
            const res = await api.get(
              `/asesi/pengajuan?skema_id=${selectedSkema}`
            );
            if (res.data.success && res.data.data.length > 0) {
              const existingPengajuan = res.data.data.find(
                (p: any) =>
                  p.status === "draft" ||
                  p.status === "submitted" ||
                  p.status === "rejected"
              );
              if (existingPengajuan) {
                navigate(`/asesi/pengajuan/${existingPengajuan.id}`);
              }
            }
          } catch (fetchErr) {
            console.error("Gagal fetch pengajuan:", fetchErr);
          }
        }
      } else {
        alert(err.response?.data?.message || "Gagal memproses pengajuan");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: SIMPAN UNITS ---
  const handleStep2Next = async () => {
    if (!pengajuanId) {
      alert("Pengajuan ID tidak ditemukan");
      return;
    }

    if (unitForms.length === 0) {
      alert(
        "Data unit kompetensi kosong. Silakan refresh halaman dan coba lagi."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        `/asesi/pengajuan/${pengajuanId}/unit-kompetensi`,
        {
          unit_kompetensi: unitForms,
        }
      );
      if (response.data.success) {
        setCurrentStep(3);
      }
    } catch (err: any) {
      console.error("Error menyimpan unit:", err);
      if (
        err.response?.data?.message &&
        err.response.data.message.includes("not in draft status")
      ) {
        alert(
          "Sistem saat ini belum mengizinkan edit pengajuan yang statusnya Submitted/Rejected. Hubungi Admin untuk membuka akses."
        );
      } else {
        alert(err.response?.data?.message || "Gagal menyimpan unit kompetensi");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper: Update Unit Form
  const handleUnitChange = (
    index: number,
    field: keyof UnitForm,
    value: any
  ) => {
    setUnitForms((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: value,
      };
      return copy;
    });
  };

  // --- STEP 3: UPLOAD FILES ---
  const handleUploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    if (!pengajuanId) {
      alert("Harap pilih skema terlebih dahulu");
      return;
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jenis_dokumen", type);

    try {
      setUploadingFiles((prev) => ({ ...prev, [type]: true }));

      const response = await api.post(
        `/asesi/pengajuan/${pengajuanId}/upload-bukti`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setUploadedFiles((prev) => ({ ...prev, [type]: response.data.data }));
      }
    } catch (err: any) {
      alert(`Gagal upload ${type}`);
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleStep3Next = () => {
    const requiredTypes = [
      "kartu_pelajar",
      "raport_semester_1_5",
      "sertifikat_pkl",
      "kartu_keluarga_ktp",
      "pas_foto_3x4",
    ];
    const missing = requiredTypes.filter((t) => !uploadedFiles[t]);

    if (missing.length > 0) {
      alert(`Mohon lengkapi dokumen: ${missing.join(", ")}`);
      return;
    }
    setCurrentStep(4);
  };

  // --- STEP 4: FINAL SUBMIT ---
  const handleFinalSubmit = async () => {
    if (!pengajuanId) {
      alert("Pengajuan ID tidak ditemukan");
      return;
    }

    if (
      !window.confirm(
        "Apakah Anda yakin ingin mengirim pengajuan ini ke Asesor untuk dinilai?"
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/asesi/pengajuan/${pengajuanId}/submit`);

      if (response.data.success) {
        alert("Pengajuan berhasil dikirim!");
        navigate("/asesi/dashboard");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengirim pengajuan");
    } finally {
      setLoading(false);
    }
  };

  // --- UI HELPERS ---
  const fileLabels = {
    kartu_pelajar: "Kartu Pelajar",
    raport_semester_1_5: "Raport Semester 1-5",
    sertifikat_pkl: "Sertifikat PKL",
    kartu_keluarga_ktp: "Kartu Keluarga / KTP",
    pas_foto_3x4: "Pas Foto 3x4",
  };

  if (loading && currentStep === 1)
    return <div className="loading-overlay">Memuat data...</div>;

  return (
    <div className="buat-pengajuan-wizard">
      <div className="wizard-header">
        <h1>{isEditMode ? "Edit Pengajuan" : "Buat Pengajuan"} Sertifikasi</h1>
        <div className="step-indicators">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`step-item ${currentStep === step ? "active" : ""} ${
                currentStep > step ? "completed" : ""
              }`}
            >
              <div className="step-circle">{step}</div>
              <div className="step-label">
                {step === 1 && "Pilih Skema"}
                {step === 2 && "Isi Unit"}
                {step === 3 && "Upload File"}
                {step === 4 && "Review"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-content">
        {currentStep === 1 && (
          <div className="step-card active-step">
            <h3>Langkah 1: Pilih Program Sertifikasi</h3>

            {isEditMode && (
              <div
                className="alert alert-info"
                style={{
                  background: "#e0f2fe",
                  border: "1px solid #0ea5e9",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                }}
              >
                <strong>Mode Edit:</strong> Anda sedang mengedit pengajuan yang
                sudah ada. Jurusan dan Skema tidak dapat diubah.
              </div>
            )}

            <div className="form-group">
              <label>Jurusan</label>
              <select
                className="form-control"
                value={selectedJurusan || ""}
                onChange={(e) => {
                  setSelectedJurusan(Number(e.target.value));
                  setSkemas([]);
                  setSelectedSkema(null);
                }}
                disabled={isEditMode}
              >
                <option value="">-- Pilih Jurusan --</option>
                {jurusans.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.nama_jurusan}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Skema Sertifikasi</label>
              <select
                className="form-control"
                value={selectedSkema || ""}
                onChange={(e) => setSelectedSkema(Number(e.target.value))}
                disabled={!selectedJurusan || isEditMode}
              >
                <option value="">-- Pilih Skema --</option>
                {skemas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nama_skema}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Catatan (Opsional)</label>
              <textarea
                rows={3}
                value={catatanAsesi}
                onChange={(e) => setCatatanAsesi(e.target.value)}
              ></textarea>
            </div>

            <button
              onClick={() => {
                if (isEditMode) {
                  setCurrentStep(2);
                } else {
                  handleStep1Next();
                }
              }}
              className="btn btn-primary"
              disabled={loading || (!isEditMode && !selectedSkema)}
            >
              {loading ? "Memproses..." : "Lanjut ke Unit Kompetensi"}
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-card active-step">
            <h3>Langkah 2: Isi Unit Kompetensi</h3>
            {unitForms.length === 0 ? (
              <div className="alert alert-warning">
                <p>
                  Data unit kompetensi belum dimuat. Silakan refresh halaman
                  atau kembali ke langkah 1.
                </p>
              </div>
            ) : (
              <div className="units-list">
                {unitForms.map((item, index) => {
                  const unitDetail = units.find(
                    (u) => u.id === item.unit_kompetensi_id
                  );
                  return (
                    <div key={index} className="unit-item">
                      <div className="unit-header">
                        <strong>{unitDetail?.nama_unit}</strong>
                        <span className="code">{unitDetail?.kode_unit}</span>
                      </div>
                      <div className="unit-body">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={item.is_kompeten}
                            onChange={(e) =>
                              handleUnitChange(
                                index,
                                "is_kompeten",
                                e.target.checked
                              )
                            }
                          />
                          <span>Saya Kompeten</span>
                        </label>
                        <textarea
                          value={item.bukti_relevan}
                          onChange={(e) =>
                            handleUnitChange(
                              index,
                              "bukti_relevan",
                              e.target.value
                            )
                          }
                          placeholder="Jelaskan pengalaman relevan Anda..."
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="wizard-actions">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn btn-secondary"
              >
                Kembali
              </button>
              <button
                onClick={handleStep2Next}
                className="btn btn-primary"
                disabled={loading || unitForms.length === 0}
              >
                {loading ? "Menyimpan..." : "Simpan & Lanjut"}
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-card active-step">
            <h3>Langkah 3: Upload Bukti Kelengkapan Dokumen</h3>
            <div className="upload-grid">
              {(Object.keys(fileLabels) as Array<keyof typeof fileLabels>).map(
                (key) => (
                  <div key={key} className="upload-item">
                    <label>{fileLabels[key]}</label>
                    <input
                      type="file"
                      onChange={(e) => handleUploadFile(e, key)}
                      accept="image/*,.pdf"
                      disabled={uploadingFiles[key]}
                    />
                    {uploadedFiles[key] && (
                      <div className="file-info">
                        <span className="success-text">✓ Terupload</span>
                        <small>{uploadedFiles[key].nama_file}</small>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="wizard-actions">
              <button
                onClick={() => setCurrentStep(2)}
                className="btn btn-secondary"
              >
                Kembali
              </button>
              <button
                onClick={handleStep3Next}
                className="btn btn-primary"
                disabled={loading}
              >
                Lanjut ke Review
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="step-card active-step">
            <h3>Langkah 4: Review & Submit</h3>
            <div className="review-summary">
              <p>
                Program Studi:{" "}
                <strong>
                  {jurusans.find((j) => j.id === selectedJurusan)?.nama_jurusan}
                </strong>
              </p>
              <p>
                Skema Sertifikasi:{" "}
                <strong>
                  {skemas.find((s) => s.id === selectedSkema)?.nama_skema}
                </strong>
              </p>
              <p>Catatan: {catatanAsesi || "-"}</p>
              <hr />
              <p>
                Jumlah Unit Terisi: <strong>{unitForms.length}</strong>
              </p>
              <p>
                Jumlah Dokumen:{" "}
                <strong>{Object.keys(uploadedFiles).length}</strong>
              </p>
            </div>

            <div className="wizard-actions">
              <button
                onClick={() => setCurrentStep(3)}
                className="btn btn-secondary"
              >
                Kembali
              </button>
              <button
                onClick={handleFinalSubmit}
                className="btn btn-success"
                disabled={loading}
              >
                Ajukan Sertifikasi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePengajuan;
