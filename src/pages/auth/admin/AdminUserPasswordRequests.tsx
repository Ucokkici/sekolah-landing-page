import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { User } from "../../../types";
import "./AdminUserPasswordRequests.scss";

interface RequestData {
  id: number;
  verification_value: string;
  reason: string;
  status: "pending" | "completed";
  proof_ktp: string;
  completed_at: string | null;
  user: User;
  processor?: User;
}

const AdminUserPasswordRequests: React.FC = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed"
  >("all");
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
    const baseURL = api.defaults.baseURL?.replace(/\/api\/v1\/?$/, "") || "http://127.0.0.1:8000";
    
    // Pastikan path TIDAK dimulai dengan /
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    
    // Return: http://127.0.0.1:8000/storage/password_reset_proofs/xxx.jpg
    return `${baseURL}/storage/${cleanPath}`;
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filterStatus !== "all") params.status = filterStatus;

      const res = await api.get("/admin/password-requests", { params });
      if (res.data.success) {
        setRequests(res.data.data.data);
      }
    } catch (err) {
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  const handleApprove = async (id: number) => {
    if (!window.confirm("Setujui permohonan ganti password ini?")) return;

    try {
      const res = await api.post(`/admin/password-requests/${id}/process`);
      if (res.data.success) {
        alert("✅ Password user berhasil di-update oleh sistem.");
        fetchRequests();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memproses.");
    }
  };

  const handleViewKTP = (ktpPath: string) => {
    const fullUrl = getFileUrl(ktpPath);
    setImageModal({ open: true, url: fullUrl });
  };

  return (
    <div className="admin-password-requests-page">
      <div className="page-header">
        <h1>🔐 Permintaan Reset Password (Self-Initiated)</h1>
        <p>User mengajukan ganti password sendiri dan melampirkan bukti KTP.</p>
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
          ⏳ Menunggu
        </button>
        <button
          className={`tab ${filterStatus === "completed" ? "active" : ""}`}
          onClick={() => setFilterStatus("completed")}
        >
          ✅ Selesai
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading">Memuat data...</div>
        ) : requests.length > 0 ? (
          <table className="requests-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Username</th>
                <th>Bukti KTP</th>
                <th>Alasan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.user.nama_lengkap}</strong>
                    <br />
                    <small>{item.user.email}</small>
                  </td>
                  <td>{item.verification_value}</td>
                  <td>
                    <button
                      className="btn-link"
                      onClick={() => handleViewKTP(item.proof_ktp)}
                    >
                      👁️ Lihat KTP
                    </button>
                  </td>
                  <td>{item.reason || "-"}</td>
                  <td>
                    <span className={`badge badge-${item.status}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === "pending" ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleApprove(item.id)}
                      >
                        ✅ Setujui
                      </button>
                    ) : (
                      <span className="text-muted">
                        Diproses oleh:{" "}
                        <strong>{item.processor?.nama_lengkap}</strong>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            Tidak ada permohonan reset password.
          </div>
        )}
      </div>

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
            <img src={imageModal.url} alt="KTP" />
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

export default AdminUserPasswordRequests;