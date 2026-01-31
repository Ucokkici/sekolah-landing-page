/**
 * Helper function untuk menghandle file URL
 * Mengubah relative URL menjadi absolute URL dengan base backend
 */

// Ambil base URL dari environment atau gunakan default
// Laravel backend biasanya di port 8000
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Mendapatkan full URL untuk file
 * @param fileUrl - URL file dari backend (bisa relative atau absolute)
 * @returns Full URL yang bisa diakses
 */
export const getFileUrl = (fileUrl: string | null | undefined): string => {
  if (!fileUrl) return "";

  // Jika sudah absolute URL (dimulai dengan http/https), return as is
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }

  // Jika dimulai dengan /, hapus leading slash untuk menghindari double slash
  const cleanUrl = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;

  // Gabungkan dengan base URL
  return `${API_BASE_URL}/${cleanUrl}`;
};

/**
 * Membuka file di tab baru
 * @param fileUrl - URL file
 */
export const openFile = (fileUrl: string | null | undefined) => {
  const fullUrl = getFileUrl(fileUrl);
  if (fullUrl) {
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  }
};

/**
 * Download file
 * @param fileUrl - URL file
 * @param filename - Nama file untuk download
 */
export const downloadFile = async (
  fileUrl: string | null | undefined,
  filename?: string
) => {
  const fullUrl = getFileUrl(fileUrl);
  if (!fullUrl) return;

  try {
    const response = await fetch(fullUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    // Fallback: buka di tab baru
    openFile(fileUrl);
  }
};

/**
 * Validasi apakah URL file valid
 * @param fileUrl - URL file
 * @returns boolean
 */
export const isValidFileUrl = (fileUrl: string | null | undefined): boolean => {
  if (!fileUrl) return false;

  // Check if it's a valid URL format
  try {
    const fullUrl = getFileUrl(fileUrl);
    new URL(fullUrl);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get file extension from URL
 * @param fileUrl - URL file
 * @returns extension (e.g., 'pdf', 'jpg', 'png')
 */
export const getFileExtension = (
  fileUrl: string | null | undefined
): string => {
  if (!fileUrl) return "";

  const url = fileUrl.split("?")[0]; // Remove query params
  const parts = url.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

/**
 * Get file type icon based on extension
 * @param fileUrl - URL file
 * @returns emoji icon
 */
export const getFileIcon = (fileUrl: string | null | undefined): string => {
  const ext = getFileExtension(fileUrl);

  const iconMap: { [key: string]: string } = {
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    xls: "📊",
    xlsx: "📊",
    ppt: "📊",
    pptx: "📊",
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
    svg: "🖼️",
    zip: "📦",
    rar: "📦",
    txt: "📃",
    csv: "📋",
  };

  return iconMap[ext] || "📄";
};
