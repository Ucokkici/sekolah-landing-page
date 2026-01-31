import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar Navigasi */}
      <nav className="admin-layout__sidebar">
        <h2 className="admin-layout__logo">LSP Admin</h2>
        <ul className="admin-layout__nav-list">
          <li className="admin-layout__nav-item">
            <Link to="/admin/dashboard" className="admin-layout__nav-link">
              Dashboard
            </Link>
          </li>
          <li className="admin-layout__nav-item">
            <Link to="/admin/user" className="admin-layout__nav-link">
              Manajemen User
            </Link>
          </li>
          <li className="admin-layout__nav-item">
            <Link to="/admin/pengajuan" className="admin-layout__nav-link">
              Manajemen Pengajuan
            </Link>
          </li>
        </ul>
      </nav>

      {/* Konten Utama */}
      <main className="admin-layout__main-content">
        {/* Outlet adalah tempat di mana komponen halaman akan dirender */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
