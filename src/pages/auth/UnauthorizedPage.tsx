import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Akses Ditolak</h2>
        <p className="text-gray-600 mb-6">
          Anda tidak memiliki akses ke halaman ini.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
