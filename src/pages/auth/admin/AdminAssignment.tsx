import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Jurusan, User, AsesiItem } from "../../../types";
import "./AdminAssignment.scss";

const AdminAssignment: React.FC = () => {
  // State Dropdown Data
  const [schools, setSchools] = useState<string[]>([]);
  const [jurusans, setJurusans] = useState<Jurusan[]>([]);
  const [asesors, setAsesors] = useState<User[]>([]);
  const [asesiList, setAsesiList] = useState<AsesiItem[]>([]);

  // State Selection (Asesor & List Ase)
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [selectedAsesor, setSelectedAsesor] = useState<number | null>(null);
  const [selectedAsesiIds, setSelectedAsesiIds] = useState<number[]>([]);

  // State UI
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. Load Schools saat Mount
  useEffect(() => {
    fetchSchools();
  }, []);

  // 2. Load Jurusan saat School dipilih
  useEffect(() => {
    if (selectedSchool) {
      fetchJurusanBySchool(selectedSchool);
      // Reset pilihan setelahnya
      setSelectedJurusan("");
      setAsesors([]);
      setAsesiList([]);
      setSelectedAsesor(null);
      setSelectedAsesiIds([]);
    }
  }, [selectedSchool]);

  // 3. Load Asesor & Asesi saat Jurusan dipilih
  useEffect(() => {
    if (selectedSchool && selectedJurusan) {
      fetchAsesorsByFilter();
      fetchAsesiByJurusan(Number(selectedJurusan));
    }
  }, [selectedJurusan, selectedSchool]);

  // --- API FUNCTIONS ---
  const fetchSchools = async () => {
    try {
      const res = await api.get("/admin/assignment/schools");
      if (res.data.success) setSchools(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data sekolah");
    }
  };

  const fetchJurusanBySchool = async (schoolName: string) => {
    setLoading(true);
    try {
      const res = await api.get("/admin/assignment/jurusan-by-school", {
        params: { school_name: schoolName },
      });
      if (res.data.success) setJurusans(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data jurusan");
    } finally {
      setLoading(false);
    }
  };

  const fetchAsesorsByFilter = async () => {
    try {
      const res = await api.get("/admin/assignment/asesors-by-filter", {
        params: { school_name: selectedSchool, jurusan_id: selectedJurusan },
      });
      if (res.data.success) setAsesors(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data asesor");
    }
  };

  const fetchAsesiByJurusan = async (jurusanId: number) => {
    try {
      const res = await api.get("/admin/assignment/asesi-by-jurusan", {
        params: { jurusan_id: jurusanId },
      });
      if (res.data.success) setAsesiList(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data asesi");
    }
  };

  // --- HANDLERS ---

  // Toggle Checkbox (Pilih Banyak)
  const handleToggleAsesi = (id: number) => {
    if (selectedAsesiIds.includes(id)) {
      setSelectedAsesiIds((prev) => prev.filter((pid) => pid !== id));
    } else {
      setSelectedAsesiIds((prev) => [...prev, id]);
    }
  };

  // 🔀 Ambil 20 Asesi Secara Acak
  const handleSelectRandom20 = () => {
    if (asesiList.length === 0) {
      alert("Tidak ada asesi untuk dipilih.");
      return;
    }

    const shuffled = [...asesiList].sort(() => 0.5 - Math.random());

    const selected = shuffled
      .slice(0, Math.min(20, asesiList.length))
      .map((item) => item.pengajuan_id);

    setSelectedAsesiIds(selected);
  };

  // Tombol Pilih Semua / Batal Pilih
  const handleSelectAll = () => {
    if (selectedAsesiIds.length === asesiList.length) {
      setSelectedAsesiIds([]); // Batal pilih
    } else {
      setSelectedAsesiIds(asesiList.map((item) => item.pengajuan_id)); // Pilih semua
    }
  };

  const handleAssign = async () => {
    if (!selectedAsesor) {
      alert("Pilih Asesor terlebih dahulu!");
      return;
    }

    if (selectedAsesiIds.length === 0) {
      alert("Pilih minimal 1 Asesi untuk ditugaskan!");
      return;
    }

    // INFORMASI: Backend akan otomatis split per 20 pengajuan
    const totalBatches = Math.ceil(selectedAsesiIds.length / 20);
    const confirmMessage = 
      totalBatches === 1
        ? `Apakah Anda yakin menugaskan Asesor ini ke ${selectedAsesiIds.length} Asesi?\n\nIni akan membuat 1 batch/jadwal.`
        : `Apakah Anda yakin menugaskan Asesor ini ke ${selectedAsesiIds.length} Asesi?\n\nIni akan otomatis dipisah menjadi ${totalBatches} batch/jadwal (maksimal 20 per batch).`;

    if (!window.confirm(confirmMessage)) return;

    setSubmitting(true);
    try {
      const response = await api.post("/admin/assignment/bulk-assign", {
        asesor_id: selectedAsesor,
        pengajuan_ids: selectedAsesiIds,
      });

      if (response.data.success) {
        const data = response.data.data;
        const batchInfo = data.batch_numbers 
          ? `\n\nBatch yang dibuat:\n${data.batch_numbers.join('\n')}`
          : '';
        
        alert(`✅ Berhasil menugaskan ${data.total_assigned} pengajuan dalam ${data.total_batches} batch!${batchInfo}`);

        // Reset Form
        setSelectedAsesiIds([]);
        setSelectedAsesor(null);
        
        // Refresh list asesi
        if (selectedJurusan) {
          fetchAsesiByJurusan(Number(selectedJurusan));
        }
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menugaskan asesor");
    } finally {
      setSubmitting(false);
    }
  };

  // Hitung berapa batch yang akan dibuat
  const calculateBatches = () => {
    if (selectedAsesiIds.length === 0) return 0;
    return Math.ceil(selectedAsesiIds.length / 20);
  };

  return (
    <div className="admin-assignment-container">
      <div className="card">
        <h2>🗓️ Penjadwalan & Penugasan Asesor</h2>
        <p>
          Tentukan asesor untuk mengasesi asesi berdasarkan sekolah dan jurusan.
          <br />
          <strong>Sistem akan otomatis membuat batch baru setiap 20 pengajuan.</strong>
        </p>

        <div className="grid-form">
          {/* STEP 1: PILIH SEKOLAH */}
          <div className="form-group">
            <label>1. Pilih Sekolah</label>
            <select
              className="form-control"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="">-- Pilih Sekolah --</option>
              {schools.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* STEP 2: PILIH JURUSAN */}
          <div className="form-group">
            <label>2. Pilih Jurusan</label>
            <select
              className="form-control"
              value={selectedJurusan}
              onChange={(e) => setSelectedJurusan(e.target.value)}
              disabled={!selectedSchool || loading}
            >
              <option value="">-- Pilih Jurusan --</option>
              {jurusans.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.nama_jurusan}
                </option>
              ))}
            </select>
          </div>

          {/* STEP 3: PILIH ASESOR */}
          <div className="form-group">
            <label>3. Pilih Asesor</label>
            <select
              className="form-control"
              value={selectedAsesor ?? ""}
              onChange={(e) => setSelectedAsesor(Number(e.target.value))}
              disabled={!selectedJurusan}
            >
              <option value="">-- Pilih Asesor --</option>
              {asesors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nama_lengkap}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LIST ASESI (CHECKBOX BULK) */}
        {loading ? (
          <p>Memuat data asesi...</p>
        ) : (
          <div className="asesi-checkbox-container">
            <div className="asesi-header">
              <h3>4. Pilih Asesi (Status Submitted)</h3>
              <div className="header-actions">
                <span className="counter">
                  {selectedAsesiIds.length} dari {asesiList.length} Dipilih
                  {selectedAsesiIds.length > 0 && (
                    <span className="batch-info">
                      {" "}→ {calculateBatches()} Batch
                    </span>
                  )}
                </span>

                {asesiList.length > 0 && (
                  <>
                    <button
                      type="button"
                      className="text-btn"
                      onClick={handleSelectAll}
                    >
                      {selectedAsesiIds.length === asesiList.length
                        ? "Batal Pilih"
                        : "Pilih Semua"}
                    </button>

                    <button
                      type="button"
                      className="text-btn random-btn"
                      onClick={handleSelectRandom20}
                    >
                      Ambil 20 Acak
                    </button>
                  </>
                )}
              </div>
            </div>

            {asesiList.length > 0 ? (
              <ul className="asesi-list">
                {asesiList.map((item) => {
                  const isSelected = selectedAsesiIds.includes(
                    item.pengajuan_id,
                  );
                  return (
                    <li
                      key={item.pengajuan_id}
                      className={`asesi-item ${isSelected ? "selected" : ""}`}
                      onClick={() => handleToggleAsesi(item.pengajuan_id)}
                    >
                      <div className="checkbox">
                        {isSelected && <span>✓</span>}
                      </div>
                      <div className="info">
                        <strong>{item.asesi.nama_lengkap}</strong>
                        <small>{item.asesi.email}</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-muted">
                Tidak ada asesi dengan jurusan tersebut yang statusnya
                submitted.
              </p>
            )}
          </div>
        )}

        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={handleAssign}
            disabled={submitting || selectedAsesiIds.length === 0}
          >
            {submitting ? "Menyimpan..." : "💾 Simpan Penugasan (Bulk)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAssignment;