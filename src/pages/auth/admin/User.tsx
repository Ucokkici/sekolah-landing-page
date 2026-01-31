import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { User } from "../../../types";
import "./User.scss";
import UserDetailModal from "./UserDetailModal";

const AdminUsers: React.FC = () => {
  // Kita kembalikan ke users biasa karena backend yang menghandle slicing data
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<Record<number, boolean>>(
    {}
  );

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 15;

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  // Modal State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status");

  // Fungsi untuk mengambil data user
  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      // Response sekarang berbentuk Paginator dari Laravel
      const response = await api.get<{
        success: boolean;
        message: string;
        data: {
          current_page: number;
          data: User[];
          total: number;
          last_page: number;
        };
      }>("/admin/users", {
        params: {
          page: currentPage, // Kirim page ke backend
          per_page: itemsPerPage, // Kirim limit ke backend
          status_approval: statusFilter, // Sesuaikan key jika backend pakai 'status' atau 'status_approval'
          role: roleFilter || undefined,
          search: searchTerm || undefined,
        },
      });

      if (response.data.success && response.data.data) {
        // Backend mengirim object: { data: [], total: 123, ... }
        // Jadi akses response.data.data untuk array User
        setUsers(response.data.data.data);
        setTotalItems(response.data.data.total);
      } else {
        setUsers([]);
        setTotalItems(0);
        setError("Format data user tidak valid dari server.");
      }
    } catch (err: any) {
      console.error("Gagal memuat data user:", err);
      setError(
        err.response?.data?.message ||
          "Terjadi kesalahan jaringan koneksi ke server."
      );
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect Debounce Pencarian (Reset ke halaman 1)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      loadUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Effect Filter (Reset ke halaman 1)
  useEffect(() => {
    setCurrentPage(1);
    loadUsers();
  }, [roleFilter, statusFilter]);

  // Effect Ganti Halaman
  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleApprove = async (userId: number) => {
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      await api.post(`/admin/users/${userId}/approve`);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status_approval: "approved" } : user
        )
      );

      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, status_approval: "approved" });
      }

      alert("User berhasil disetujui!");
      if (isModalOpen) closeModal();
      loadUsers(); // Refresh data dari server
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Terjadi kesalahan saat menyetujui user."
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleReject = async (userId: number) => {
    const reason = window.prompt("Alasan penolakan:");
    if (!reason) return;

    setActionLoading((prev) => ({ ...prev, [userId]: true }));

    try {
      await api.post(`/admin/users/${userId}/reject`, { reason });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status_approval: "rejected" } : user
        )
      );

      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, status_approval: "rejected" });
      }

      alert("User berhasil ditolak.");
      if (isModalOpen) closeModal();
      loadUsers();
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Terjadi kesalahan saat menolak user."
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setCurrentPage(1);
    window.location.href = "/admin/users";
  };

  // Hitung total halaman dari totalItems yang dikirim backend
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page__loading">
          <div className="admin-page__spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Manajemen User</h1>
          {statusFilter && (
            <span className="filter-badge">
              Status Filter: <strong>{statusFilter.toUpperCase()}</strong>
            </span>
          )}
        </div>
        <button onClick={resetFilters} className="btn btn-reset">
          Reset Filter
        </button>
      </div>

      <div className="admin-page__filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari Nama atau Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-search"
          />
        </div>
        <div className="role-box">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select-role"
          >
            <option value="">Semua Role</option>
            <option value="asesi">Asesi</option>
            <option value="asesor">Asesor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="admin-page__table-container">
        <table className="admin-page__table">
          <thead>
            <tr>
              <th>Nama Lengkap</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status Approval</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ fontWeight: "bold" }}>
                      {user.nama_lengkap}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                      {user.no_ktp_nik_paspor}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`admin-page__status admin-page__status--${user.status_approval}`}
                    >
                      {user.status_approval}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => openModal(user)}
                        title="Lihat Detail Lengkap"
                      >
                        👁️ Detail
                      </button>

                      {user.status_approval === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-approve"
                            onClick={() => handleApprove(user.id)}
                            disabled={actionLoading[user.id]}
                          >
                            ✔
                          </button>
                          <button
                            className="btn btn-sm btn-reject"
                            onClick={() => handleReject(user.id)}
                            disabled={actionLoading[user.id]}
                          >
                            ✖
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Tidak ada data user yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* --- PAGINATION UI --- */}
        {totalItems > 0 && (
          <div className="admin-page__pagination">
            <div className="pagination-controls">
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`btn ${
                        currentPage === pageNum
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </span>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <UserDetailModal
        user={selectedUser}
        onClose={closeModal}
        onApprove={handleApprove}
        onReject={handleReject}
        actionLoading={selectedUser ? actionLoading[selectedUser.id] : false}
      />
    </div>
  );
};

export default AdminUsers;
