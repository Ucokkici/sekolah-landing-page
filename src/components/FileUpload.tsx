import React, { useState, type ChangeEvent } from "react";
import asesiService from "../services/asesiService";
import { type BuktiKelengkapan } from "../types";
import { AxiosError } from "axios";

type JenisDokumen =
  | "kartu_pelajar"
  | "raport_semester_1_5"
  | "sertifikat_pkl"
  | "kartu_keluarga_ktp"
  | "pas_foto_3x4";

interface FileUploadProps {
  pengajuanId: number;
  jenisDokumen: JenisDokumen;
  onSuccess?: (bukti: BuktiKelengkapan) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  pengajuanId,
  jenisDokumen,
  onSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const response = await asesiService.uploadBukti(
        pengajuanId,
        jenisDokumen,
        file
      );

      if (response.success) {
        alert("File berhasil diupload!");
        setFile(null);
        if (onSuccess) onSuccess(response.data);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Gagal upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm mb-2">
          {error}
        </div>
      )}

      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.pdf"
        className="mb-2 text-sm"
      />

      {file && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
