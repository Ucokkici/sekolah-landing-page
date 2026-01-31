import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { PengajuanSertifikasi, DashboardStats } from "../../../types";
import "./AsesorDashboard.scss";

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

const AsesorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [availablePengajuan, setAvailablePengajuan] = useState<
    PengajuanSertifikasi[]
  >([]);
  const [myReviews, setMyReviews] = useState<PengajuanSertifikasi[]>([]);

  // State Pagination untuk My Reviews (Server Side)
  const [myReviewsPagination, setMyReviewsPagination] =
    useState<PaginationMeta>({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
      from: 0,
      to: 0,
    });

  // State untuk Navigasi Antar Batch (Menampilkan 1 Batch per layar)
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  // State Pagination untuk Item Asesi di Dalam Batch (Client Side)
  const [batchItemPages, setBatchItemPages] = useState<Record<string, number>>(
    {},
  );
  const ITEMS_PER_BATCH_PAGE = 5; // Tampilkan 10 asesi per halaman dalam satu batch

  const [availableFilters, setAvailableFilters] = useState({
    search: "",
  });

  const [myReviewsFilters, setMyReviewsFilters] = useState({
    search: "",
    status: "",
    page: 1,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [loadingMyReviews, setLoadingMyReviews] = useState(false);

  const [activeTab, setActiveTab] = useState<"available" | "my-reviews">(
    "available",
  );

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    if (activeTab === "available") {
      fetchAvailablePengajuan();
    }
  }, [availableFilters, activeTab]);

  useEffect(() => {
    if (activeTab === "my-reviews") {
      fetchMyReviews();
    }
  }, [myReviewsFilters, activeTab]);

  const fetchDashboardStats = async () => {
    setLoadingStats(true);
    try {
      const response = await api.get("/asesor/dashboard");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error("Gagal load dashboard stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchAvailablePengajuan = async () => {
    setLoadingAvailable(true);
    try {
      const params = new URLSearchParams();
      params.append("per_page", "200"); // Ambil semua data untuk batch

      if (availableFilters.search) {
        params.append("search", availableFilters.search);
      }

      const response = await api.get(
        `/asesor/pengajuan/available?${params.toString()}`,
      );

      if (response.data.success) {
        const data = response.data.data;

        // Reset batch ke 1 dan reset halaman item saat data baru masuk
        setCurrentBatchIndex(0);
        setBatchItemPages({});

        if (data.data && data.meta) {
          setAvailablePengajuan(data.data);
        } else {
          setAvailablePengajuan(Array.isArray(data) ? data : []);
        }
      }
    } catch (err) {
      console.error("Gagal load available pengajuan:", err);
    } finally {
      setLoadingAvailable(false);
    }
  };

  const fetchMyReviews = async () => {
    setLoadingMyReviews(true);
    try {
      const params = new URLSearchParams();
      params.append("page", myReviewsFilters.page.toString());
      params.append("per_page", "15");

      if (myReviewsFilters.search) {
        params.append("search", myReviewsFilters.search);
      }
      if (myReviewsFilters.status) {
        params.append("status", myReviewsFilters.status);
      }

      const response = await api.get(
        `/asesor/pengajuan/my-reviews?${params.toString()}`,
      );

      if (response.data.success) {
        const data = response.data.data;

        if (data.data && data.meta) {
          setMyReviews(data.data);
          setMyReviewsPagination({
            current_page: data.meta.current_page,
            last_page: data.meta.last_page,
            per_page: data.meta.per_page,
            total: data.meta.total,
            from: data.data.from,
            to: data.data.to,
          });
        } else {
          setMyReviews(Array.isArray(data) ? data : []);
        }
      }
    } catch (err) {
      console.error("Gagal load my reviews:", err);
    } finally {
      setLoadingMyReviews(false);
    }
  };

  const handleStartReview = async (pengajuanId: number) => {
    if (
      !window.confirm("Apakah Anda yakin ingin mulai mereview pengajuan ini?")
    ) {
      return;
    }

    try {
      const response = await api.post(
        `/asesor/pengajuan/${pengajuanId}/start-review`,
      );

      if (response.data.success) {
        alert("✅ Review dimulai!");
        await fetchAvailablePengajuan();
        await fetchMyReviews();
        await fetchDashboardStats();
        navigate(`/asesor/review/${pengajuanId}`);
      }
    } catch (err: any) {
      console.error("Gagal start review:", err);
      alert(
        err.response?.data?.message ||
          "Gagal memulai review. Silakan coba lagi.",
      );
    }
  };

  const handleViewReview = (pengajuanId: number) => {
    navigate(`/asesor/review/${pengajuanId}`);
  };

  const handleAvailableSearchChange = (value: string) => {
    setAvailableFilters((prev) => ({ ...prev, search: value }));
  };

  const handleMyReviewsSearchChange = (value: string) => {
    setMyReviewsFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleMyReviewsStatusChange = (value: string) => {
    setMyReviewsFilters((prev) => ({ ...prev, status: value, page: 1 }));
  };

  const handleMyReviewsPageChange = (page: number) => {
    setMyReviewsFilters((prev) => ({ ...prev, page }));
  };

  // --- LOGIKA BATCH NAVIGATION ---

  const groupedByBatch = availablePengajuan.reduce(
    (acc, p) => {
      const batch = p.batch_number || "UNBATCHED";
      if (!acc[batch]) {
        acc[batch] = [];
      }
      acc[batch].push(p);
      return acc;
    },
    {} as Record<string, PengajuanSertifikasi[]>,
  );

  const batchEntries = Object.entries(groupedByBatch);

  // Data Batch yang sedang aktif ditampilkan
  const currentBatchKey = batchEntries[currentBatchIndex]?.[0];
  const currentBatchData = batchEntries[currentBatchIndex]?.[1] || [];

  // Handler Pindah Batch
  const nextBatch = () => {
    if (currentBatchIndex < batchEntries.length - 1) {
      setCurrentBatchIndex((prev) => prev + 1);
    }
  };

  const prevBatch = () => {
    if (currentBatchIndex > 0) {
      setCurrentBatchIndex((prev) => prev - 1);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "assigned":
        return "badge-primary";
      case "in_review":
        return "badge-info";
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
      case "assigned":
        return "Belum Dimulai";
      case "in_review":
        return "Sedang Direview";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  const Pagination: React.FC<{
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
  }> = ({ meta, onPageChange }) => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      meta.current_page - Math.floor(maxVisiblePages / 2),
    );
    let endPage = Math.min(meta.last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          Menampilkan {meta.from} - {meta.to} dari {meta.total} data
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(1)}
            disabled={meta.current_page === 1}
          >
            «
          </button>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(meta.current_page - 1)}
            disabled={meta.current_page === 1}
          >
            ‹
          </button>

          {startPage > 1 && (
            <>
              <button
                className="pagination-btn"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              {startPage > 2 && (
                <span className="pagination-ellipsis">...</span>
              )}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              className={`pagination-btn ${
                page === meta.current_page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {endPage < meta.last_page && (
            <>
              {endPage < meta.last_page - 1 && (
                <span className="pagination-ellipsis">...</span>
              )}
              <button
                className="pagination-btn"
                onClick={() => onPageChange(meta.last_page)}
              >
                {meta.last_page}
              </button>
            </>
          )}

          <button
            className="pagination-btn"
            onClick={() => onPageChange(meta.current_page + 1)}
            disabled={meta.current_page === meta.last_page}
          >
            ›
          </button>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(meta.last_page)}
            disabled={meta.current_page === meta.last_page}
          >
            »
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="asesor-dashboard">
      <div className="dashboard-header">
        <div style={{ flex: 1 }}>
          <h1>Dashboard Asesor</h1>
          <p className="subtitle">Kelola dan tinjau pengajuan sertifikasi</p>
        </div>

        {/* TOMBOL PROFIL DITAMBAHKAN DISINI */}
        <Link to="/profile" className="btn btn-secondary">
          👤 Profil Saya
        </Link>
      </div>

      {loadingStats ? (
        <div className="loading-stats">Memuat statistik...</div>
      ) : (
        stats && (
          <div className="stats-grid">
            <div className="stat-card stat-available">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <div className="stat-value">{stats.available_for_review}</div>
                <div className="stat-label">Tugas Baru</div>
              </div>
            </div>

            <div className="stat-card stat-in-review">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <div className="stat-value">{stats.in_review}</div>
                <div className="stat-label">Sedang Dikerjakan</div>
              </div>
            </div>

            <div className="stat-card stat-approved">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{stats.total_approved}</div>
                <div className="stat-label">Disetujui</div>
              </div>
            </div>

            <div className="stat-card stat-rejected">
              <div className="stat-icon">❌</div>
              <div className="stat-content">
                <div className="stat-value">{stats.total_rejected}</div>
                <div className="stat-label">Ditolak</div>
              </div>
            </div>

            <div className="stat-card stat-total">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{stats.total_reviewed}</div>
                <div className="stat-label">Total Review</div>
              </div>
            </div>
          </div>
        )
      )}

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          📋 Tugas Baru
        </button>
        <button
          className={`tab-btn ${activeTab === "my-reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("my-reviews")}
        >
          📝 Riwayat Review
        </button>
      </div>

      {activeTab === "available" && (
        <div className="tab-content">
          <div className="filters-section">
            <div className="filter-group">
              <label>🔍 Cari Nama Asesi</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Ketik nama asesi..."
                value={availableFilters.search}
                onChange={(e) => handleAvailableSearchChange(e.target.value)}
              />
            </div>

            {availableFilters.search && (
              <button
                className="btn-reset-filter"
                onClick={() => setAvailableFilters({ search: "" })}
              >
                🔄 Reset
              </button>
            )}
          </div>

          {loadingAvailable ? (
            <div className="loading-table">Memuat data...</div>
          ) : batchEntries.length > 0 ? (
            <>
              {/* BATCH CONTAINER: Menampilkan 1 Batch Aktif Saja */}
              <div className="batches-container">
                <div className="batch-group">
                  {/* HEADER BATCH */}
                  <div className="batch-header">
                    <h3>📦 Batch: {currentBatchKey}</h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="batch-count">
                        {currentBatchData.length} Asesi
                      </span>
                      <span className="badge badge-secondary">
                        {currentBatchIndex + 1} / {batchEntries.length}
                      </span>
                    </div>
                  </div>

                  {/* PAGINATION ITEM DI DALAM BATCH */}
                  {(() => {
                    const currentPage = batchItemPages[currentBatchKey] || 1;
                    const totalItemPages = Math.ceil(
                      currentBatchData.length / ITEMS_PER_BATCH_PAGE,
                    );
                    const indexOfLastItem = currentPage * ITEMS_PER_BATCH_PAGE;
                    const indexOfFirstItem =
                      indexOfLastItem - ITEMS_PER_BATCH_PAGE;
                    const paginatedPengajuans = currentBatchData.slice(
                      indexOfFirstItem,
                      indexOfLastItem,
                    );

                    return (
                      <>
                        <div className="table-container">
                          <table className="pengajuan-table">
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>Nama Asesi</th>
                                <th>Jurusan</th>
                                <th>Skema</th>
                                <th>Tanggal Ditugaskan</th>
                                <th>Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedPengajuans.map((p, index) => (
                                <tr key={p.id}>
                                  <td>{indexOfFirstItem + index + 1}</td>
                                  <td>
                                    <strong>{p.asesi?.nama_lengkap}</strong>
                                    <br />
                                    <small>{p.asesi?.email}</small>
                                  </td>
                                  <td>{p.jurusan?.nama_jurusan}</td>
                                  <td>
                                    {p.skema_okupasi?.nama_skema}
                                    <br />
                                    <small className="text-muted">
                                      {p.skema_okupasi?.kode_skema}
                                    </small>
                                  </td>
                                  <td>
                                    {p.submitted_at
                                      ? new Date(
                                          p.submitted_at,
                                        ).toLocaleDateString("id-ID", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "-"}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() => handleStartReview(p.id)}
                                    >
                                      🚀 Mulai Review
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* INTERNAL PAGINATION BUTTONS */}
                        {totalItemPages > 1 && (
                          <div
                            className="pagination-container"
                            style={{
                              marginTop: "10px",
                              padding: "0 10px 10px 10px",
                            }}
                          >
                            <div className="pagination-info">
                              Halaman {currentPage} dari {totalItemPages}
                            </div>
                            <div className="pagination-controls">
                              <button
                                className="pagination-btn"
                                onClick={() => {
                                  setBatchItemPages((prev) => ({
                                    ...prev,
                                    [currentBatchKey]: Math.max(
                                      1,
                                      currentPage - 1,
                                    ),
                                  }));
                                }}
                                disabled={currentPage === 1}
                              >
                                ‹
                              </button>

                              {Array.from(
                                { length: totalItemPages },
                                (_, i) => i + 1,
                              )
                                .filter(
                                  (page) =>
                                    page === 1 ||
                                    page === totalItemPages ||
                                    (page >= currentPage - 1 &&
                                      page <= currentPage + 1),
                                )
                                .map((page, idx, arr) => (
                                  <React.Fragment key={page}>
                                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                                      <span className="pagination-ellipsis">
                                        ...
                                      </span>
                                    )}
                                    <button
                                      className={`pagination-btn ${
                                        page === currentPage ? "active" : ""
                                      }`}
                                      onClick={() => {
                                        setBatchItemPages((prev) => ({
                                          ...prev,
                                          [currentBatchKey]: page,
                                        }));
                                      }}
                                    >
                                      {page}
                                    </button>
                                  </React.Fragment>
                                ))}

                              <button
                                className="pagination-btn"
                                onClick={() => {
                                  setBatchItemPages((prev) => ({
                                    ...prev,
                                    [currentBatchKey]: Math.min(
                                      totalItemPages,
                                      currentPage + 1,
                                    ),
                                  }));
                                }}
                                disabled={currentPage === totalItemPages}
                              >
                                ›
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* EXTERNAL BATCH NAVIGATION (Pindah Batch) */}
              <div className="batch-navigation-controls">
                <button
                  className="btn btn-outline"
                  onClick={prevBatch}
                  disabled={currentBatchIndex === 0}
                >
                  ⬅️ Jadwal Sebelumnya
                </button>

                <span
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    color: "#666",
                  }}
                >
                  Navigasi Jadwal
                </span>

                <button
                  className="btn btn-outline"
                  onClick={nextBatch}
                  disabled={currentBatchIndex === batchEntries.length - 1}
                >
                  Jadwal Berikutnya ➡️
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>Tidak ada tugas baru</h3>
              <p>Semua pengajuan sudah direview.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "my-reviews" && (
        <div className="tab-content">
          <div className="filters-section">
            <div className="filter-group">
              <label>🔍 Cari Nama Asesi</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Ketik nama asesi..."
                value={myReviewsFilters.search}
                onChange={(e) => handleMyReviewsSearchChange(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>📊 Status</label>
              <select
                className="filter-select"
                value={myReviewsFilters.status}
                onChange={(e) => handleMyReviewsStatusChange(e.target.value)}
              >
                <option value="">Semua Status</option>
                <option value="in_review">Sedang Direview</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>

            {(myReviewsFilters.search || myReviewsFilters.status) && (
              <button
                className="btn-reset-filter"
                onClick={() =>
                  setMyReviewsFilters({
                    search: "",
                    status: "",
                    page: 1,
                  })
                }
              >
                🔄 Reset
              </button>
            )}
          </div>

          {loadingMyReviews ? (
            <div className="loading-table">Memuat data...</div>
          ) : myReviews.length > 0 ? (
            <>
              <div className="table-container">
                <table className="pengajuan-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Asesi</th>
                      <th>Jurusan</th>
                      <th>Skema</th>
                      <th>Tanggal Review</th>
                      <th>Status</th>
                      <th>Hasil</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myReviews.map((p, index) => (
                      <tr key={p.id}>
                        <td>
                          {(myReviewsPagination.current_page - 1) *
                            myReviewsPagination.per_page +
                            index +
                            1}
                        </td>
                        <td>
                          <strong>{p.asesi?.nama_lengkap}</strong>
                          <br />
                          <small>{p.asesi?.email}</small>
                        </td>
                        <td>{p.jurusan?.nama_jurusan}</td>
                        <td>
                          {p.skema_okupasi?.nama_skema}
                          <br />
                          <small className="text-muted">
                            {p.skema_okupasi?.kode_skema}
                          </small>
                        </td>
                        <td>
                          {p.reviewed_at
                            ? new Date(p.reviewed_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "-"}
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBadgeClass(p.status)}`}
                          >
                            {getStatusLabel(p.status)}
                          </span>
                        </td>
                        <td>
                          {p.penilaian_asesor && (
                            <span
                              className={`badge ${
                                p.penilaian_asesor.hasil_penilaian ===
                                "kompeten"
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {p.penilaian_asesor.hasil_penilaian === "kompeten"
                                ? "✓ Kompeten"
                                : "✗ Belum Kompeten"}
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleViewReview(p.id)}
                          >
                            {p.status === "in_review"
                              ? "📝 Lanjutkan"
                              : "👁️ Lihat"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                meta={myReviewsPagination}
                onPageChange={handleMyReviewsPageChange}
              />
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>Belum ada review</h3>
              <p>Anda belum melakukan review pengajuan apapun.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AsesorDashboard;
