import React, { useEffect, useState } from "react";
import { FileDown, Eye, Search, Filter, FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

// Import Logo
import logo from "../../../assets/lsp logo.png";

// Import service dan tipe
import adminService from "../../../services/adminService";
import type { PengajuanSertifikasi } from "../../../types";
import styles from "./Pengajuan.module.scss";
import FormAPL01 from "./FormAPL01";

type Pengajuan = PengajuanSertifikasi;

const AdminPengajuan: React.FC = () => {
  const navigate = useNavigate();

  const [pengajuans, setPengajuans] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk Modal Form APL 01
  const [showAPL01, setShowAPL01] = useState(false);
  const [selectedForAPL01, setSelectedForAPL01] = useState<Pengajuan | null>(
    null
  );

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 15;

  // Load Data
  const loadPengajuans = async () => {
    try {
      setLoading(true);
      setError("");

      const params: any = {
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        page: currentPage,
        per_page: itemsPerPage,
      };

      const response = await adminService.getAllPengajuan(params);

      if (response.success) {
        if (response.data.data) {
          setPengajuans(response.data.data);
          setTotalItems(response.data.total);
        } else {
          setPengajuans(Array.isArray(response.data) ? response.data : []);
          setTotalItems(
            Array.isArray(response.data) ? response.data.length : 0
          );
        }
      } else {
        setError(response.message || "Gagal memuat data pengajuan");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal memuat data pengajuan"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      loadPengajuans();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    loadPengajuans();
  }, [statusFilter]);

  useEffect(() => {
    loadPengajuans();
  }, [currentPage]);

  const handleViewDetails = (pengajuanId: number) => {
    navigate(`/admin/pengajuan/${pengajuanId}`);
  };

  const handleDownloadAPL01 = async (pengajuanId: number) => {
    try {
      setLoading(true);
      const response = await adminService.getPengajuanDetail(pengajuanId);
      if (response.success) {
        setSelectedForAPL01(response.data);
        setShowAPL01(true);
      } else {
        alert("Gagal mengambil data untuk APL 01");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (pengajuanId: number) => {
    try {
      const response = await adminService.getPengajuanDetail(pengajuanId);
      if (response.success) {
        generateAPL02(response.data);
      } else {
        alert("Gagal mengambil data untuk PDF");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message || err.message || "Gagal mengunduh PDF"
      );
    }
  };

  const generateAPL02 = (pengajuan: Pengajuan) => {
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 12;

    const todayDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const drawHeader = (pageNum: number, totalPage: number) => {
      const y = 10;
      const headerHeight = 35;

      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 0, 0);

      // Main outer box
      doc.rect(margin, y, 186, headerHeight);

      // Vertical line after logo (40mm from left)
      doc.line(margin + 40, y, margin + 40, y + headerHeight);

      // Vertical line before metadata (130mm from right edge = 68mm from left margin)
      doc.line(margin + 130, y, margin + 130, y + headerHeight);

      // --- Logo Section (Left box) ---
      doc.addImage(logo, "PNG", margin + 2, y + 2, 36, 31);

      // --- Middle Section ---
      // Top part - "LSP SMK NEGERI 17 JAKARTA"
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("LSP SMK NEGERI 17 JAKARTA", margin + 85, y + 6, {
        align: "center",
      });

      // Horizontal line separating middle section
      doc.line(margin + 40, y + 9, margin + 130, y + 9);

      // "SKEMA SERTIFIKASI OKUPASI"
      doc.setFontSize(8);
      doc.text("SKEMA SERTIFIKASI OKUPASI", margin + 85, y + 14, {
        align: "center",
      });

      // Skema name
      doc.setFontSize(9);
      const skemaText =
        pengajuan.skema_okupasi?.nama_skema ||
        "PEMROGRAM JUNIOR (JUNIOR CODER)";
      doc.text(skemaText, margin + 85, y + 20, {
        align: "center",
        maxWidth: 85,
      });

      // Horizontal line before "FR. APL-02"
      doc.line(margin + 40, y + 23, margin + 130, y + 23);

      // "FR. APL-02. ASESMEN MANDIRI"
      doc.setFontSize(10);
      doc.text("FR. APL-02. ASESMEN MANDIRI", margin + 85, y + 30, {
        align: "center",
      });

      // --- Right Section (Metadata) ---
      const metaLabelX = margin + 132;
      const metaColonX = margin + 166;
      const metaValueX = margin + 169;

      // Horizontal lines for metadata rows
      doc.line(margin + 130, y + 8.75, margin + 186, y + 8.75);
      doc.line(margin + 130, y + 17.5, margin + 186, y + 17.5);
      doc.line(margin + 130, y + 26.25, margin + 186, y + 26.25);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);

      // Row 1: No. Dokumen
      doc.text("No. Dokumen", metaLabelX, y + 5.5);
      doc.text(":", metaColonX, y + 5.5);
      doc.setFont("helvetica", "bold");
      doc.text("FR-APL.02.01.00", metaValueX, y + 5.5);

      // Row 2: Edisi/Revisi
      doc.setFont("helvetica", "normal");
      doc.text("Edisi/Revisi", metaLabelX, y + 14.25);
      doc.text(":", metaColonX, y + 14.25);
      doc.text("02/00", metaValueX, y + 14.25);

      // Row 3: Tanggal Berlaku
      doc.text("Tanggal Berlaku", metaLabelX, y + 23);
      doc.text(":", metaColonX, y + 23);
      doc.setFont("helvetica", "bold");
      doc.text(todayDate, metaValueX, y + 23);

      // Row 4: Halaman
      doc.setFont("helvetica", "normal");
      doc.text("Halaman", metaLabelX, y + 31.75);
      doc.text(":", metaColonX, y + 31.75);
      doc.text(`${pageNum} dari ${totalPage}`, metaValueX, y + 31.75);
    };

    // Helper untuk draw footer
    const drawFooter = (pageNum: number) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text("FR-APL.02.02.00", margin, 285);

      // Blue box untuk page number
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.setFillColor(204, 229, 255);
      doc.rect(184, 280, 12, 7, "FD");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.text(`${pageNum}`, 190, 285, { align: "center" });
    };

    let yPos = 50;

    // Title FR.APL.02
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(0, 0, 0);
    doc.text("FR.APL.02. ASESMEN MANDIRI", margin, yPos);
    yPos += 6;

    // Skema Box
    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, 186, 15);
    doc.line(margin + 45, yPos, margin + 45, yPos + 15);
    doc.line(margin + 45, yPos + 7.5, margin + 198, yPos + 7.5);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Skema Sertifikasi", margin + 2, yPos + 4);

    doc.setFontSize(6.5);
    doc.text("(KKNI/Okupasi/Klaster)", margin + 2, yPos + 7.5);

    doc.setFontSize(8);
    doc.text("Judul", margin + 47, yPos + 5);
    doc.text(":", margin + 58, yPos + 5);
    doc.setFont("helvetica", "bold");
    doc.text(
      pengajuan.skema_okupasi?.nama_skema || "PEMROGRAM JUNIOR (JUNIOR CODER)",
      margin + 61,
      yPos + 5,
      { maxWidth: 130 }
    );

    doc.setFont("helvetica", "normal");
    doc.text("Nomor", margin + 47, yPos + 12);
    doc.text(":", margin + 58, yPos + 12);
    doc.text(
      pengajuan.skema_okupasi?.kode_skema || "03.SKM-OPJ-RPL.2023",
      margin + 61,
      yPos + 12
    );

    yPos += 18;

    // Panduan Box
    doc.setFillColor(255, 204, 153);
    doc.rect(margin, yPos, 186, 6, "F");
    doc.rect(margin, yPos, 186, 25);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("PANDUAN ASESMEN MANDIRI", margin + 2, yPos + 4.5);

    doc.setFontSize(8);
    doc.text("Instruksi:", margin + 2, yPos + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const instructions = [
      "Baca setiap pertanyaan di kolom sebelah kiri",
      "Beri tanda centang (V) pada kotak jika Anda yakin dapat melakukan tugas yang dijelaskan.",
      "Isi kolom di sebelah kanan dengan menuliskan bukti yang relevan anda miliki untuk menunjukkan bahwa anda melakukan pekerjaan.",
    ];

    instructions.forEach((text, i) => {
      doc.text("•", margin + 4, yPos + 14 + i * 5);
      doc.text(text, margin + 7, yPos + 14 + i * 5, { maxWidth: 178 });
    });

    yPos += 30;

    const units = pengajuan.detail_unit_kompetensi || [];

    units.forEach((detail) => {
      if (yPos > 210) {
        doc.addPage();
        yPos = 42;
      }

      autoTable(doc, {
        startY: yPos,
        margin: { left: margin, right: margin },
        tableWidth: 186,
        head: [
          [
            {
              content: `Unit Kompetensi: ${units.indexOf(detail) + 1}.`,
              styles: {
                halign: "left",
                cellWidth: 40,
                fontStyle: "bold",
                fontSize: 8,
              },
            },
            {
              content: `${
                detail.unit_kompetensi?.nama_unit || "Nama Unit Tidak Ditemukan"
              } ( ${detail.unit_kompetensi?.kode_unit || "KODE.00"} )`,
              styles: {
                halign: "left",
                fontStyle: "bold",
                fontSize: 8,
              },
            },
          ],
        ],
        theme: "grid",
        headStyles: {
          fillColor: [255, 204, 153],
          textColor: [0, 0, 0],
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          cellPadding: 1.5,
        },
      });
      yPos = (doc as any).lastAutoTable.finalY;

      const tableBody: any[] = [];
      const unitData = detail.unit_kompetensi as any;

      if (
        unitData?.elemen &&
        Array.isArray(unitData.elemen) &&
        unitData.elemen.length > 0
      ) {
        unitData.elemen.forEach((elemen: any, eIndex: number) => {
          tableBody.push([
            {
              content: `${eIndex + 1}. Elemen : ${elemen.nama_elemen || ""}`,
              styles: { fontStyle: "bold", fontSize: 7, cellPadding: 2 },
            },
            "",
            "",
            "",
          ]);

          if (
            elemen.kriteria_unjuk_kerja &&
            Array.isArray(elemen.kriteria_unjuk_kerja)
          ) {
            elemen.kriteria_unjuk_kerja.forEach((kuk: any) => {
              tableBody.push([
                `${kuk.kode_kuk || ""} ${kuk.deskripsi_kuk || ""}`,
                "",
                "",
                "",
              ]);
            });
          } else {
            tableBody.push([
              "- Tidak ada data kriteria unjuk kerja",
              "",
              "",
              "",
            ]);
          }
        });
      } else {
        tableBody.push([
          unitData?.deskripsi ||
            unitData?.nama_unit ||
            "Deskripsi unit tidak tersedia.",
          "",
          "",
          "",
        ]);
      }

      const totalRows = tableBody.length;
      if (totalRows > 0) {
        tableBody[0][1] = {
          content: "",
          rowSpan: totalRows,
          styles: { halign: "center" },
        };
        tableBody[0][2] = {
          content: "",
          rowSpan: totalRows,
          styles: { halign: "center" },
        };
        tableBody[0][3] = {
          content: detail.bukti_relevan || "-",
          rowSpan: totalRows,
          styles: { valign: "top" },
        };
      }

      autoTable(doc, {
        startY: yPos,
        margin: { left: margin, right: margin },
        tableWidth: 186,
        head: [
          [
            {
              content: `Dapatkah Saya ${
                detail.unit_kompetensi?.nama_unit || "Unit Kompetensi"
              } ?`,
              styles: { halign: "center" },
            },
            "K",
            "BK",
            "Bukti yang relevan",
          ],
        ],
        body: tableBody,
        theme: "grid",
        headStyles: {
          fillColor: [255, 204, 153],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          halign: "center",
          fontSize: 7.5,
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          cellPadding: 1.5,
        },
        styles: {
          fontSize: 7,
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          cellPadding: 2,
          overflow: "linebreak",
        },
        columnStyles: {
          0: { cellWidth: 105, valign: "top" },
          1: { cellWidth: 10, halign: "center", valign: "middle" },
          2: { cellWidth: 10, halign: "center", valign: "middle" },
          3: { cellWidth: 61, valign: "top" },
        },
        didDrawCell: (data) => {
          if (
            (data.column.index === 1 || data.column.index === 2) &&
            data.section === "body"
          ) {
            const cellWidth = data.cell.width;
            const cellHeight = data.cell.height;
            const boxSize = 5;
            const x = data.cell.x + (cellWidth - boxSize) / 2;
            const y = data.cell.y + (cellHeight - boxSize) / 2;
            doc.setLineWidth(0.4);
            doc.setDrawColor(0, 0, 0);
            doc.rect(x, y, boxSize, boxSize);
            const isK = data.column.index === 1;
            if ((isK && detail.is_kompeten) || (!isK && !detail.is_kompeten)) {
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10);
              doc.text("V", x + 1.2, y + 3.8);
            }
          }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 6;
    });

    if (yPos > 210) {
      doc.addPage();
      yPos = 42;
    }

    const leftWidth = 85;
    const rows = [
      { key: "asesi_title", height: 10, line: true },
      { key: "asesi_nama", height: 12, line: true },
      { key: "asesi_ttd", height: 14, line: true },
      { key: "asesor_title", height: 10, line: true },
      { key: "asesor_nama", height: 10, line: true },
      { key: "asesor_reg", height: 10, line: true },
      { key: "asesor_ttd", height: 14, line: true },
    ];

    const totalHeight = rows.reduce((sum, r) => sum + r.height, 0);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, 186, totalHeight);
    doc.line(margin + leftWidth, yPos, margin + leftWidth, yPos + totalHeight);

    let currentY = yPos;
    rows.forEach((row) => {
      currentY += row.height;
      if (row.line) {
        doc.line(margin + leftWidth, currentY, margin + 186, currentY);
      }
    });

    const labelX = margin + leftWidth + 3;
    const valueX = margin + leftWidth + 40;
    doc.line(valueX, yPos + rows[0].height, valueX, yPos + totalHeight);

    const getRowY = (index: number, offset = 7) => {
      let y = yPos;
      for (let i = 0; i < index; i++) {
        y += rows[i].height;
      }
      return y + offset;
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Rekomendasi Untuk Asesi:", margin + 3, yPos + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Asesmen dapat / tidak dapat dilanjutkan", margin + 3, yPos + 22);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Asesi :", labelX, getRowY(0));
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Nama", labelX, getRowY(1));
    doc.text(":", valueX - 5, getRowY(1));
    doc.text(pengajuan.asesi?.nama_lengkap || "", valueX + 2, getRowY(1));
    doc.text("Tanda tangan /", labelX, getRowY(2, 6));
    doc.text("Tanggal", labelX, getRowY(2, 11));
    doc.text(":", valueX - 5, getRowY(2, 9));

    doc.setFont("helvetica", "bold");
    doc.text("Ditinjau Oleh Asesor :", labelX, getRowY(3));
    doc.setFont("helvetica", "normal");
    doc.text("Nama", labelX, getRowY(4));
    doc.text(":", valueX - 5, getRowY(4));
    doc.text(pengajuan.asesor?.nama_lengkap || "", valueX + 2, getRowY(4));
    doc.text("No. Reg", labelX, getRowY(5));
    doc.text(":", valueX - 5, getRowY(5));
    doc.text("MET.000.000000.2024", valueX + 2, getRowY(5));
    doc.text("Tanda tangan /", labelX, getRowY(6, 6));
    doc.text("Tanggal", labelX, getRowY(6, 11));
    doc.text(":", valueX - 5, getRowY(6, 9));

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      drawHeader(i, pageCount);
      drawFooter(i);
    }
    doc.save(
      `FR_APL02_${pengajuan.asesi?.nama_lengkap?.replace(/\s+/g, "_")}.pdf`
    );
  };

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      draft: "Draft",
      submitted: "Diajukan",
      in_review: "Review",
      approved: "Disetujui",
      rejected: "Ditolak",
    };
    return statusMap[status] || status;
  };

  const getStatusModifier = (status: string): string => {
    return status.replace("_", "-");
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading && pengajuans.length === 0 && !showAPL01) {
    return (
      <div className={styles.loadingContainer}>
        <div className="text-center">
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Menyiapkan data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Modal APL 01 */}
      {showAPL01 && selectedForAPL01 && (
        <FormAPL01
          data={selectedForAPL01}
          onClose={() => {
            setShowAPL01(false);
            setSelectedForAPL01(null);
          }}
        />
      )}

      <div className={styles.contentWrapper}>
        <div className={styles.filtersSection}>
          <h2 className={styles.pageTitle}>
            Panel Administrasi - Pengajuan Sertifikasi
          </h2>

          <div className={styles.controlsRow}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Cari asesi atau skema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterSelectWrapper}>
              <Filter className={styles.filterIcon} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Diajukan</option>
                <option value="in_review">Dalam Review</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeaderCell}>ID</th>
                <th className={styles.tableHeaderCell}>Asesi</th>
                <th className={styles.tableHeaderCell}>Skema Sertifikasi</th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th className={styles.tableHeaderCell}>Tanggal</th>
                <th className={styles.tableHeaderCell}>Aksi</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {pengajuans.map((pengajuan) => (
                <tr key={pengajuan.id} className={styles.tableRow}>
                  <td className={styles.idCell}>#{pengajuan.id}</td>
                  <td className={styles.asesiCell}>
                    <div className={styles.asesiName}>
                      {pengajuan.asesi?.nama_lengkap}
                    </div>
                    <div className={styles.asesiEmail}>
                      {pengajuan.asesi?.email}
                    </div>
                  </td>
                  <td className={styles.skemaCell}>
                    <div className={styles.skemaName}>
                      {pengajuan.skema_okupasi?.nama_skema}
                    </div>
                    <div className={styles.skemaCode}>
                      {pengajuan.skema_okupasi?.kode_skema}
                    </div>
                  </td>
                  <td className={styles.statusCell}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[
                          `statusBadge--${getStatusModifier(pengajuan.status)}`
                        ]
                      }`}
                    >
                      {getStatusLabel(pengajuan.status)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    {pengajuan.submitted_at
                      ? new Date(pengajuan.submitted_at).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => handleViewDetails(pengajuan.id)}
                        className={`${styles.actionButton} ${styles["actionButton--detail"]}`}
                        title="Lihat Detail Form"
                      >
                        <Eye className={styles.icon} />
                        Lihat
                      </button>

                      {/* Tombol APL 01 Baru */}
                      <button
                        onClick={() => handleDownloadAPL01(pengajuan.id)}
                        className={`${styles.actionButton} bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 p-2 rounded text-xs transition-colors`}
                        title="Cetak FR.APL.01"
                      >
                        <FileText size={16} />
                        APL 01
                      </button>

                      <button
                        onClick={() => handleDownloadPDF(pengajuan.id)}
                        className={`${styles.actionButton} ${styles["actionButton--pdf"]}`}
                        title="Download APL 02 (jsPDF)"
                      >
                        <FileDown className={styles.icon} />
                        APL 02
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pengajuans.length === 0 && !loading && (
            <div className={styles.emptyState}>
              <p>Tidak ada data pengajuan yang sesuai.</p>
            </div>
          )}
        </div>

        {totalItems > 0 && (
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} dari{" "}
              {totalItems}
            </div>

            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="flex gap-1">
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
                      className={`${styles.paginationButton} ${
                        currentPage === pageNum ? styles.activePage : ""
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className={styles.paginationButton}
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
    </div>
  );
};

export default AdminPengajuan;
