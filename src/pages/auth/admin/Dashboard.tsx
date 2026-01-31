import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminService from "../../../services/adminService";
import { DashboardStats } from "../../../types";
import "./Dashboard.scss";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchDashboard();

    // Handler untuk menutup sidebar jika klik di luar (mobile)
    const handleOutsideClick = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const menuBtn = document.querySelector(".mobile-menu-btn");

      if (
        window.innerWidth <= 768 &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuBtn &&
        !menuBtn.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isSidebarOpen]);

  const fetchDashboard = async () => {
    try {
      const response = await adminService.getDashboard();
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError("Gagal memuat data dashboard");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <div className="main-content">
          <div className="admin-page__loading">
            <div className="admin-page__spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout">
        <div className="main-content">
          <div className="admin-page__error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="nav-menu">
          <li>
            <Link to="#" className="nav-link active">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/assignment" className="nav-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <circle cx="10" cy="14" r="2"></circle>
                <circle cx="18" cy="14" r="2"></circle>
              </svg>
              Penjadwalan
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="nav-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/pengajuan" className="nav-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Pengajuan
            </Link>
          </li>

          <li>
            <Link to="/admin/corrections" className="nav-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4"></path>
                <line x1="14.5" y1="13.5" x2="21" y2="6.5"></line>
              </svg>
              Perbaikan Data
            </Link>
          </li>

          <li>
            <Link to="/admin/password_reset" className="nav-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1a11 11 0 0 1.99-1.99a11 11 0 0 1.99-1.99a10.01 0 0 0 2 0 0-5.4 0-5.4 0-2.2 0-2.2 10.01 0 0 0 2 2 0 0 0.5.4"></path>
                <path d="M12 15a3 3 0 0 1-5.997.96a3 3 0 0 0 5.998.99a3 3 0 0 0 5.998.99a3 3 0 0 0 5.998.99a3 3 0 0 0 5.998.99a3 3 0 0 0 5.998.99M14 12c3.31 0 0 0 5.99-5.99 0 0 0 2.2 0 0 0 0 3.99-3.99a3 3 0 0 0 5.99-5.99"></path>
              </svg>
              Lupa Password
            </Link>
          </li>

          <li>
            <Link to="#" className="nav-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51 1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2v-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.51 1V3a2 2 0 0 1 2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.51 1V3a2 2 0 0 1 2-2 2 2 0 0 1 2-2v-.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 0l.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1 2-2h-.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 0l.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 0l.06.06a1.65 1.65 0 0 0-.33 1.82V3a2 2 0 0 1 2-2 2 2 0 0 1 2-2v-.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 0l.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1 2-2h-.09a1.65 1.65 0 0 0 1.51 1z"></path>
              </svg>
              Settings
            </Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* Header */}
        <header className="admin_header">
          <div>
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              ☰
            </button>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="meta-sub">Ringkasan aktivitas sistem hari ini</p>
          </div>
          <div className="user-profile">
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--secondary-color)" }}
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "8px",
                  height: "8px",
                  background: "red",
                  borderRadius: "50%",
                }}
              ></span>
            </div>
            <span style={{ fontWeight: 500 }}>Super Admin</span>
            <img
              src="https://picsum.photos/seed/adminuser/40/40"
              alt="Admin Avatar"
              className="user-avatar"
            />
          </div>
        </header>

        {/* QUICK ACTION CARD (NEW) */}
        <Link to="/admin/assignment" className="card-link">
          <div className="card card--action">
            <div className="card-icon-bg card-icon-bg--purple">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <circle cx="10" cy="14" r="2"></circle>
                <circle cx="18" cy="14" r="2"></circle>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Penjadwalan Asesmen</h3>
              <p className="card-desc">
                Assign asesor ke asesi berdasarkan sekolah dan jurusan.
              </p>
              <div className="card-action-text">Buat Jadwal Baru →</div>
            </div>
          </div>
        </Link>

        {/* Stats Grid */}
        <div className="stats-grid">
          {/* Total Users (Link ke Semua User) */}
          <Link to="/admin/users" className="card-link">
            <div className="card">
              <div
                className="card-icon-bg"
                style={{
                  backgroundColor: "var(--primary-color)",
                  fill: "var(--primary-color)",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="card-title">Total Users</h3>
              <p className="card-value">{stats?.total_users || 0}</p>
              <span className="meta-sub">Lihat semua user</span>
            </div>
          </Link>

          {/* Pending Approval (Link KE User Filter Pending) */}
          <Link to="/admin/users?status=pending" className="card-link">
            <div className="card card--warning">
              <div className="card-icon-bg">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="card-title">Pending Approval</h3>
              <p className="card-value">{stats?.pending_approval || 0}</p>
              <span className="meta-sub">Klik untuk tinjau user pending</span>
            </div>
          </Link>

          {/* Total Pengajuan (Link ke Semua Pengajuan) */}
          <Link to="/admin/pengajuan" className="card-link">
            <div className="card">
              <div
                className="card-icon-bg"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  fill: "var(--secondary-color)",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="card-title">Total Pengajuan</h3>
              <p className="card-value">{stats?.total_pengajuan || 0}</p>
              <span className="meta-sub">Semua kategori skema</span>
            </div>
          </Link>

          {/* Approved (Statistik Pengajuan Approved) */}
          <div className="card card--success">
            <div className="card-icon-bg">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="card-title">Pengajuan Approved</h3>
            <p className="card-value">{stats?.pengajuan_approved || 0}</p>
            <span className="meta-sub">Tingkat keberhasilan sertifikasi</span>
          </div>
        </div>

        {/* Role Stats Grid */}
        <h3 className="role-section-title">Statistik Peran Pengguna</h3>
        <div className="role-stats-grid">
          {/* Asesi */}
          <div className="role-card role-card--asesi">
            <div className="role-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="role-info">
              <h4>Total Asesi</h4>
              <p>{stats?.total_asesi || 0}</p>
            </div>
          </div>

          {/* Asesor */}
          <div className="role-card role-card--asesor">
            <div className="role-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a2.12 2.12 0 0 1 3-3l3.76 3.76z"></path>
              </svg>
            </div>
            <div className="role-info">
              <h4>Total Asesor</h4>
              <p>{stats?.total_asesor || 0}</p>
            </div>
          </div>

          {/* Admin */}
          <div className="role-card role-card--admin">
            <div className="role-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="role-info">
              <h4>Total Admin</h4>
              <p>{stats?.total_admin || 0}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
