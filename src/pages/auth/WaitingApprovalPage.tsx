import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const WaitingApprovalPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⏳</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Menunggu Approval</h2>

        <p className="text-gray-600 mb-6">
          Akun Anda sedang dalam proses verifikasi oleh admin.
        </p>

        <button
          onClick={logout}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default WaitingApprovalPage;
