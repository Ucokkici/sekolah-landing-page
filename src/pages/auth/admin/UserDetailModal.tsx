import React from "react";
import { User } from "../../../types"; // Pastikan import tipe User Anda

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  actionLoading: boolean;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detail Pengguna</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {/* Informasi Dasar */}
          <div className="detail-section">
            <h4>Informasi Pribadi</h4>
            <div className="detail-row">
                <span className="label">Nama Lengkap:</span>
                <span className="value">{user.nama_lengkap}</span>
            </div>
            <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
            </div>
            <div className="detail-row">
                <span className="label">Username:</span>
                <span className="value">{user.username}</span>
            </div>
            <div className="detail-row">
                <span className="label">Role:</span>
                <span className="badge badge-role">{user.role.toUpperCase()}</span>
            </div>
            <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`badge badge-${user.status_approval}`}>
                    {user.status_approval}
                </span>
            </div>
          </div>

          {/* Identitas Lengkap */}
          <div className="detail-section">
            <h4>Identitas & Kontak</h4>
            <div className="detail-row">
                <span className="label">No. KTP/NIK:</span>
                <span className="value">{user.no_ktp_nik_paspor}</span>
            </div>
            <div className="detail-row">
                <span className="label">Tempat, Tgl Lahir:</span>
                <span className="value">
                    {user.tempat_lahir}, {new Date(user.tanggal_lahir).toLocaleDateString('id-ID')}
                </span>
            </div>
            <div className="detail-row">
                <span className="label">Jenis Kelamin:</span>
                <span className="value">{user.jenis_kelamin}</span>
            </div>
            <div className="detail-row">
                <span className="label">Kebangsaan:</span>
                <span className="value">{user.kebangsaan}</span>
            </div>
            <div className="detail-row">
                <span className="label">No. Telepon:</span>
                <span className="value">{user.no_telepon}</span>
            </div>
          </div>

          {/* Alamat */}
          <div className="detail-section">
            <h4>Alamat</h4>
            <div className="detail-row">
                <span className="label">Alamat Rumah:</span>
                <span className="value">{user.alamat_rumah}</span>
            </div>
            
            {/* Data Pekerjaan (Opsional) */}
            {(user.nama_institusi_perusahaan || user.jabatan) && (
                <>
                    <div className="detail-row">
                        <span className="label">Nama Institusi:</span>
                        <span className="value">{user.nama_institusi_perusahaan || "-"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Jabatan:</span>
                        <span className="value">{user.jabatan || "-"}</span>
                    </div>
                </>
            )}
          </div>

          {/* Aksi Hanya untuk Pending */}
          {user.status_approval === "pending" && (
            <div className="detail-actions">
                <button
                    className="btn btn-approve"
                    onClick={() => onApprove(user.id)}
                    disabled={actionLoading}
                >
                    Setujui User
                </button>
                <button
                    className="btn btn-reject"
                    onClick={() => onReject(user.id)}
                    disabled={actionLoading}
                >
                    Tolak User
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;