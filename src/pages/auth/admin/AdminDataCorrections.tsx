import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { User } from "../../../types";
import "./AdminDataCorrections.scss";

// Interface untuk data Data Correction dari API
interface DataCorrection {
  id: number;
  user_id: number;
  field_name: string;
  old_value: string;
  new_value: string;
  document_proof: string;
  admin_notes: string | null;
  status: "pending" | "approved" | "rejected";
  processed_at: string | null;
  created_at: string;
  user: User;
  processor?: User;
}

const AdminDataCorrections: React.FC = () => {
  const [corrections, setCorrections] = useState<DataCorrection[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [rejectModal, setRejectModal] = useState<{
    open: boolean;
    id: number | null;
    reason: string;
  }>({ open: false, id: null, reason: "" });
  const [imageModal, setImageModal] = useState<{
    open: boolean;
    url: string;
  }>({ open: false, url: "" });

  // Helper untuk convert path relatif ke full URL
  const getFileUrl = (path: string): string => {
    if (!path) return "";

    // Jika sudah full URL (http/https), return as is
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    // Ambil base URL dari axios instance (tanpa /api/v1)
    const baseURL =
      api.defaults.baseURL?.replace(/\/api\/v1\/?$/, "") ||
      "http://127.0.0.1:8000";

    // Pastikan path TIDAK dimulai dengan /
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;

    // Return: http://127.0.0.1:8000/storage/corrections/2/xxx.jpg
    return `${baseURL}/storage/${cleanPath}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "approved":
        return "badge-success";
      case "rejected":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  const fetchCorrections = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filterStatus !== "all") {
        params.status = filterStatus;
      }

      const res = await api.get("/admin/corrections", { params });

      if (res.data.success) {
        setCorrections(res.data.data.data);
      }
    } catch (err) {
      console.error("Gagal load corrections:", err);
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorrections();
  }, [filterStatus]);

  const handleApprove = async (id: number) => {
    if (
      !window.confirm(
        "Apakah Anda yakin ingin menyetujui perubahan data ini?\nData user akan langsung diperbarui.",
      )
    ) {
      return;
    }

    try {
      const res = await api.post(`/admin/corrections/${id}/process`, {
        action: "approve",
        notes: "Disetujui oleh admin",
      });

      if (res.data.success) {
        alert("✅ Data berhasil dikoreksi.");
        fetchCorrections();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memproses.");
    }
  };

  const openRejectModal = (id: number) => {
    setRejectModal({ open: true, id, reason: "" });
  };

  const submitReject = async () => {
    if (!rejectModal.reason || rejectModal.reason.length < 5) {
      alert("Alasan penolakan harus diisi (minimal 5 karakter).");
      return;
    }

    try {
      const res = await api.post(
        `/admin/corrections/${rejectModal.id}/process`,
        {
          action: "reject",
          notes: rejectModal.reason,
        },
      );

      if (res.data.success) {
        alert("✅ Permohonan ditolak.");
        setRejectModal({ open: false, id: null, reason: "" });
        fetchCorrections();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memproses.");
    }
  };

  const handleViewDocument = (documentPath: string) => {
    const fullUrl = getFileUrl(documentPath);
    setImageModal({ open: true, url: fullUrl });
  };

  return (
    <div className="admin-corrections-page">
      <div className="page-header">
        <h1>🔧 Perbaikan Data</h1>
        <br />
      </div>

      <div className="filter-tabs">
        <button
          className={`tab ${filterStatus === "all" ? "active" : ""}`}
          onClick={() => setFilterStatus("all")}
        >
          Semua
        </button>
        <button
          className={`tab ${filterStatus === "pending" ? "active" : ""}`}
          onClick={() => setFilterStatus("pending")}
        >
          ⏳ Menunggu (
          {corrections.filter((c) => c.status === "pending").length})
        </button>
        <button
          className={`tab ${filterStatus === "approved" ? "active" : ""}`}
          onClick={() => setFilterStatus("approved")}
        >
          ✅ Disetujui
        </button>
        <button
          className={`tab ${filterStatus === "rejected" ? "active" : ""}`}
          onClick={() => setFilterStatus("rejected")}
        >
          ❌ Ditolak
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading">Memuat data...</div>
        ) : corrections.length > 0 ? (
          <table className="corrections-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Field Data</th>
                <th>Data Lama</th>
                <th>Data Baru</th>
                <th>Bukti</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {corrections.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.user.nama_lengkap}</strong>
                    <br />
                    <small>{item.user.email}</small>
                  </td>
                  <td>
                    <span className="field-badge">
                      {item.field_name.toUpperCase().replace("_", " ")}
                    </span>
                  </td>
                  <td className="old-value">{item.old_value}</td>
                  <td className="new-value">{item.new_value}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => handleViewDocument(item.document_proof)}
                      title="Lihat Bukti Dokumen"
                    >
                      👁️ Lihat
                    </button>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                    {item.admin_notes && (
                      <div className="admin-notes">
                        Catatan: {item.admin_notes}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      {item.status === "pending" && (
                        <>
                          <button
                            className="btn-approve"
                            onClick={() => handleApprove(item.id)}
                            title="Setujui Perubahan"
                          >
                            ✔
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => openRejectModal(item.id)}
                            title="Tolak Perubahan"
                          >
                            ✖
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">Tidak ada permohonan koreksi data.</div>
        )}
      </div>

      {rejectModal.open && (
        <div
          className="modal-overlay"
          onClick={() => setRejectModal({ ...rejectModal, open: false })}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Alasan Penolakan</h3>
            <textarea
              rows={5}
              placeholder="Jelaskan kenapa permohonan ini ditolak..."
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal({ ...rejectModal, reason: e.target.value })
              }
              autoFocus
            />
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setRejectModal({ ...rejectModal, open: false })}
              >
                Batal
              </button>
              <button className="btn btn-danger" onClick={submitReject}>
                Kirim Penolakan
              </button>
            </div>
          </div>
        </div>
      )}

      {imageModal.open && (
        <div
          className="modal-overlay"
          onClick={() => setImageModal({ open: false, url: "" })}
        >
          <div className="modal-image" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setImageModal({ open: false, url: "" })}
            >
              ✕
            </button>
            <img src={imageModal.url} alt="Bukti Dokumen" />
            <div className="modal-actions">
              <a
                href={imageModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Buka di Tab Baru
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataCorrections;
