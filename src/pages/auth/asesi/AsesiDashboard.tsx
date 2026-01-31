import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { PengajuanSertifikasi } from "../../../types";
import "./AsesiDashboard.scss";

const AsesiDashboard: React.FC = () => {
  const [pengajuans, setPengajuans] = useState<PengajuanSertifikasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyPengajuans();
  }, []);

  const fetchMyPengajuans = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<{
        success: boolean;
        message: string;
        data: PengajuanSertifikasi[];
      }>("/asesi/pengajuan");

      if (response.data.success) {
        setPengajuans(response.data.data);
      } else {
        setError("Gagal memuat data pengajuan");
      }
    } catch (err: any) {
      console.error("Gagal memuat pengajuan:", err);
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat memuat data",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      draft: "#64748b",
      submitted: "#3b82f6",
      in_review: "#f59e0b",
      approved: "#10b981",
      rejected: "#ef4444",
    };
    return colors[status] || "#64748b";
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      draft: "Draft",
      submitted: "Diajukan",
      in_review: "Dinilai",
      approved: "Lulus",
      rejected: "Tidak Lulus",
    };
    return labels[status] || status;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Truncate text untuk mobile
  const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (error) {
    return (
      <div className="asesi-dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard Sertifikasi</h1>
            <p>Kelola pengajuan sertifikasi Anda</p>
          </div>
        </div>
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={fetchMyPengajuans} className="btn btn-secondary">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="asesi-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Sertifikasi</h1>
          <p>Selamat datang! Kelola pengajuan sertifikasi Anda di sini.</p>
        </div>
        <Link to="/profile" className="btn btn-secondary">
          👤 Profil Saya
        </Link>
        <Link to="/asesi/pengajuan/create" className="btn btn-primary">
          ✨ Buat Pengajuan Baru
        </Link>
      </div>

      {/* LOADING STATE */}
      {loading && <div className="loading-text">Memuat data pengajuan...</div>}

      {/* CONTENT */}
      {!loading && (
        <div className="pengajuan-list">
          {pengajuans.length === 0 ? (
            // EMPTY STATE
            <div className="empty-state">
              <h3>📋 Belum Ada Pengajuan</h3>
              <p>
                Mulai perjalanan karir Anda dengan mengajukan sertifikasi
                kompetensi sekarang!
              </p>
              <Link to="/asesi/pengajuan/create" className="btn btn-primary">
                ✨ Buat Pengajuan Pertama
              </Link>
            </div>
          ) : (
            // CARD GRID
            <div className="card-grid">
              {pengajuans.map((pengajuan) => (
                <Link
                  key={pengajuan.id}
                  to={`/asesi/pengajuan/${pengajuan.id}`}
                  className="card"
                >
                  {/* CARD HEADER */}
                  <div className="card-header">
                    <div className="skema-info">
                      <h3>
                        {pengajuan.skema_okupasi?.nama_skema ||
                          "Skema Tidak Tersedia"}
                      </h3>
                    </div>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          getStatusColor(pengajuan.status) + "20",
                        color: getStatusColor(pengajuan.status),
                      }}
                    >
                      {getStatusLabel(pengajuan.status)}
                    </span>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="card-footer">
                    <span title={pengajuan.jurusan?.nama_jurusan || ""}>
                      {truncateText(
                        pengajuan.jurusan?.nama_jurusan || "Jurusan N/A",
                        window.innerWidth < 640 ? 30 : 50,
                      )}
                    </span>
                    <span className="date">
                      {formatDate(
                        pengajuan.submitted_at || pengajuan.created_at,
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AsesiDashboard;
