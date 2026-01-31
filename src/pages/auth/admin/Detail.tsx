import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  FileDown,
  Download,
  User,
  BookOpen,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Award,
  Calendar,
  Clipboard,
} from "lucide-react";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

import adminService from "../../../services/adminService";
import { PengajuanSertifikasi } from "../../../types";
import styles from "./Detail.module.scss";

type PengajuanDetail = PengajuanSertifikasi;

const AdminPengajuanDetail: React.FC = () => {
  const [pengajuan, setPengajuan] = useState<PengajuanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = pengajuan?.penilaian_asesor ? 6 : 5;

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const pengajuanId = pathSegments[pathSegments.length - 1];

    if (pengajuanId && !isNaN(parseInt(pengajuanId))) {
      loadPengajuanDetail(parseInt(pengajuanId));
    } else {
      setError("ID Pengajuan tidak valid.");
      setLoading(false);
    }
  }, []);

  const loadPengajuanDetail = async (id: number) => {
    try {
      setLoading(true);
      const response = await adminService.getPengajuanDetail(id);

      if (response.success) {
        setPengajuan(response.data);
      } else {
        setError(response.message || "Gagal memuat detail pengajuan");
      }
    } catch (err: any) {
      console.error("Error loading pengajuan detail:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal memuat detail pengajuan"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleDownloadPDF = () => {
    if (!pengajuan) return;
    generatePDF(pengajuan);
  };

  const generatePDF = (data: PengajuanDetail) => {
    const doc = new jsPDF();
    const primaryColor: [number, number, number] = [59, 130, 246];
    const successColor: [number, number, number] = [16, 185, 129];
    const errorColor: [number, number, number] = [239, 68, 68];
    const grayColor: [number, number, number] = [107, 114, 128];

    let yPos = 20;

    // Header dengan background biru
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 45, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("LAPORAN PENGAJUAN SERTIFIKASI", 105, 20, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Sistem Informasi Sertifikasi Kompetensi", 105, 30, {
      align: "center",
    });
    doc.text(`Dicetak pada ${new Date().toLocaleString("id-ID")}`, 105, 37, {
      align: "center",
    });

    yPos = 55;

    // Box informasi pengajuan
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(14, yPos, 182, 35, 3, 3, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("INFORMASI PENGAJUAN", 20, yPos + 8);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`ID Pengajuan:`, 20, yPos + 16);
    doc.setFont("helvetica", "bold");
    doc.text(`#${data.id}`, 55, yPos + 16);

    doc.setFont("helvetica", "normal");
    doc.text(`Status:`, 20, yPos + 23);
    doc.setFont("helvetica", "bold");
    const statusText = getStatusLabel(data.status);
    const statusColor = getStatusColor(data.status);
    doc.setTextColor(...statusColor);
    doc.text(statusText, 55, yPos + 23);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text(`Tanggal Dibuat:`, 110, yPos + 16);
    doc.setFont("helvetica", "bold");
    doc.text(formatDate(data.created_at), 145, yPos + 16);

    if (data.submitted_at) {
      doc.setFont("helvetica", "normal");
      doc.text(`Tanggal Diajukan:`, 110, yPos + 23);
      doc.setFont("helvetica", "bold");
      doc.text(formatDate(data.submitted_at), 145, yPos + 23);
    }

    yPos += 45;

    // Section: Informasi Asesi
    addSectionHeader(doc, "INFORMASI ASESI", yPos);
    yPos += 10;

    const asesiData = [
      ["Nama Lengkap", data.asesi?.nama_lengkap || "N/A"],
      ["Username", data.asesi?.username || "N/A"],
      ["Email", data.asesi?.email || "N/A"],
      ["No. Telepon", data.asesi?.no_telepon || "N/A"],
    ];

    autoTable(doc, {
      startY: yPos,
      body: asesiData,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        lineColor: [229, 231, 235],
        lineWidth: 0.5,
      },
      columnStyles: {
        0: {
          cellWidth: 50,
          fontStyle: "bold",
          textColor: grayColor,
        },
        1: {
          cellWidth: 130,
          textColor: [0, 0, 0],
        },
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Section: Program Sertifikasi
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    addSectionHeader(doc, "PROGRAM SERTIFIKASI", yPos);
    yPos += 10;

    const programData = [
      [
        "Jurusan",
        `${data.jurusan?.nama_jurusan || "N/A"} (${
          data.jurusan?.kode_jurusan || "N/A"
        })`,
      ],
      [
        "Skema Sertifikasi",
        `${data.skema_okupasi?.nama_skema || "N/A"} (${
          data.skema_okupasi?.kode_skema || "N/A"
        })`,
      ],
    ];

    autoTable(doc, {
      startY: yPos,
      body: programData,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        lineColor: [229, 231, 235],
        lineWidth: 0.5,
      },
      columnStyles: {
        0: {
          cellWidth: 50,
          fontStyle: "bold",
          textColor: grayColor,
        },
        1: {
          cellWidth: 130,
          textColor: [0, 0, 0],
        },
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Section: Unit Kompetensi
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }

    if (data.detail_unit_kompetensi && data.detail_unit_kompetensi.length > 0) {
      addSectionHeader(doc, "UNIT KOMPETENSI", yPos);
      yPos += 10;

      const unitData = data.detail_unit_kompetensi.map((detail, index) => [
        index + 1,
        detail.unit_kompetensi?.kode_unit || "N/A",
        detail.unit_kompetensi?.nama_unit || "N/A",
        detail.is_kompeten ? "✓ Kompeten" : "✗ Belum Kompeten",
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [["No", "Kode Unit", "Nama Unit", "Status"]],
        body: unitData,
        theme: "striped",
        styles: {
          fontSize: 9,
          cellPadding: 4,
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 12, halign: "center" },
          1: { cellWidth: 35 },
          2: { cellWidth: 85 },
          3: { cellWidth: 35, halign: "center" },
        },
        didParseCell: function (data) {
          if (data.section === "body" && data.column.index === 3) {
            const cellValue = data.cell.text[0];
            if (cellValue.includes("✓")) {
              data.cell.styles.textColor = successColor;
              data.cell.styles.fontStyle = "bold";
            } else if (cellValue.includes("✗")) {
              data.cell.styles.textColor = errorColor;
              data.cell.styles.fontStyle = "bold";
            }
          }
        },
      });

      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Section: Dokumen Kelengkapan
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }

    if (data.bukti_kelengkapan && data.bukti_kelengkapan.length > 0) {
      addSectionHeader(doc, "DOKUMEN KELENGKAPAN", yPos);
      yPos += 10;

      const dokumenData = data.bukti_kelengkapan.map((bukti, index) => [
        index + 1,
        formatDokumenLabel(bukti.jenis_dokumen),
        bukti.nama_file,
        formatFileSize(bukti.ukuran_file),
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [["No", "Jenis Dokumen", "Nama File", "Ukuran"]],
        body: dokumenData,
        theme: "striped",
        styles: {
          fontSize: 9,
          cellPadding: 4,
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 12, halign: "center" },
          1: { cellWidth: 50 },
          2: { cellWidth: 85 },
          3: { cellWidth: 25, halign: "center" },
        },
      });

      yPos = (doc as any).lastAutoTable.finalY + 15;
    }

    // Section: Catatan Asesi
    if (data.catatan_asesi) {
      if (yPos > 220) {
        doc.addPage();
        yPos = 20;
      }

      addSectionHeader(doc, "CATATAN ASESI", yPos);
      yPos += 10;

      doc.setFillColor(255, 251, 235);
      doc.roundedRect(14, yPos, 182, 30, 3, 3, "F");

      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(146, 64, 14);
      const splitCatatan = doc.splitTextToSize(data.catatan_asesi, 170);
      doc.text(splitCatatan, 20, yPos + 8);

      yPos += 35;
    }

    // Section: Penilaian Asesor
    if (data.penilaian_asesor) {
      if (yPos > 180) {
        doc.addPage();
        yPos = 20;
      }

      const isKompeten = data.penilaian_asesor.hasil_penilaian === "kompeten";

      addSectionHeader(
        doc,
        "HASIL PENILAIAN ASESOR",
        yPos,
        isKompeten ? successColor : errorColor
      );
      yPos += 10;

      // Box hasil penilaian
      const boxHeight = data.penilaian_asesor.rekomendasi ? 70 : 50;
      doc.setFillColor(
        isKompeten ? 236 : 254,
        isKompeten ? 253 : 242,
        isKompeten ? 245 : 242
      );
      doc.roundedRect(14, yPos, 182, boxHeight, 3, 3, "F");

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Nama Asesor:", 20, yPos + 10);
      doc.setFont("helvetica", "normal");
      doc.text(data.penilaian_asesor.nama_asesor || "N/A", 60, yPos + 10);

      doc.setFont("helvetica", "bold");
      doc.text("Tanggal Penilaian:", 20, yPos + 18);
      doc.setFont("helvetica", "normal");
      doc.text(
        formatDate(data.penilaian_asesor.tanggal_penilaian),
        60,
        yPos + 18
      );

      doc.setFont("helvetica", "bold");
      doc.text("Hasil Penilaian:", 20, yPos + 26);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...(isKompeten ? successColor : errorColor));
      doc.text(isKompeten ? "✓ KOMPETEN" : "✗ BELUM KOMPETEN", 60, yPos + 26);

      if (data.penilaian_asesor.bukti_penilaian) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("Bukti Penilaian:", 20, yPos + 36);
        doc.setFont("helvetica", "normal");
        const splitBukti = doc.splitTextToSize(
          data.penilaian_asesor.bukti_penilaian,
          170
        );
        doc.text(splitBukti, 20, yPos + 42);
        yPos += splitBukti.length * 5;
      }

      if (data.penilaian_asesor.rekomendasi) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("Rekomendasi:", 20, yPos + 36);
        doc.setFont("helvetica", "italic");
        const splitRekomendasi = doc.splitTextToSize(
          data.penilaian_asesor.rekomendasi,
          170
        );
        doc.text(splitRekomendasi, 20, yPos + 42);
      }

      yPos += boxHeight + 15;

      // Tanda Tangan Asesor
      if (data.penilaian_asesor.tanda_tangan) {
        if (yPos > 220) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("Tanda Tangan Digital Asesor:", 14, yPos);
        yPos += 8;

        // Box untuk tanda tangan
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(1);
        doc.roundedRect(14, yPos, 80, 50, 3, 3, "S");

        // Tambahkan gambar tanda tangan
        try {
          doc.addImage(
            data.penilaian_asesor.tanda_tangan,
            "PNG",
            19,
            yPos + 5,
            70,
            40
          );
        } catch (error) {
          // Jika gagal load gambar, tampilkan teks
          doc.setFontSize(8);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(156, 163, 175);
          doc.text("(Tanda tangan digital)", 54, yPos + 27, {
            align: "center",
          });
        }

        // Nama asesor di bawah tanda tangan
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(data.penilaian_asesor.nama_asesor || "N/A", 54, yPos + 56, {
          align: "center",
        });

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 114, 128);
        doc.text("Asesor Sertifikasi", 54, yPos + 62, { align: "center" });

        yPos += 70;
      }
    }

    // Footer untuk setiap halaman
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Garis footer
      doc.setDrawColor(...grayColor);
      doc.setLineWidth(0.5);
      doc.line(14, 280, 196, 280);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...grayColor);
      doc.text(`Halaman ${i} dari ${pageCount}`, 105, 285, { align: "center" });

      doc.setFontSize(7);
      doc.text("Dokumen ini digenerate secara otomatis oleh sistem", 105, 290, {
        align: "center",
      });
    }

    doc.save(
      `Pengajuan_${data.id}_${
        data.asesi?.nama_lengkap?.replace(/\s+/g, "_") || "Asesi"
      }.pdf`
    );
  };

  const addSectionHeader = (
    doc: jsPDF,
    title: string,
    yPos: number,
    color: [number, number, number] = [59, 130, 246]
  ) => {
    doc.setFillColor(...color);
    doc.roundedRect(14, yPos, 182, 8, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, yPos + 5.5);

    doc.setTextColor(0, 0, 0);
  };

  const getStatusColor = (status: string): [number, number, number] => {
    const colorMap: Record<string, [number, number, number]> = {
      draft: [107, 114, 128],
      submitted: [59, 130, 246],
      in_review: [245, 158, 11],
      approved: [16, 185, 129],
      rejected: [239, 68, 68],
    };
    return colorMap[status] || [107, 114, 128];
  };

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      draft: "Draft",
      submitted: "Diajukan",
      in_review: "Dalam Review",
      approved: "Disetujui",
      rejected: "Ditolak",
    };
    return statusMap[status] || status;
  };

  const getStatusModifier = (status: string): string => {
    return status.replace("_", "-");
  };

  const formatDokumenLabel = (jenis: string): string => {
    const labelMap: Record<string, string> = {
      kartu_pelajar: "Kartu Pelajar",
      raport_semester_1_5: "Raport Semester 1-5",
      sertifikat_pkl: "Sertifikat PKL",
      kartu_keluarga_ktp: "KK & KTP",
      pas_foto_3x4: "Pas Foto 3x4",
    };
    return labelMap[jenis] || jenis;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error || !pengajuan) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorBox}>
          <p className={styles.errorMessage}>
            {error || "Data tidak ditemukan"}
          </p>
          <button onClick={handleBack} className={styles.retryButton}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.pageHeader}>
          <div className={styles.leftSection}>
            <button onClick={handleBack} className={styles.backButton}>
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </button>
            <div>
              <h1 className={styles.title}>Detail Pengajuan #{pengajuan.id}</h1>
              <p className={styles.subtitle}>
                Informasi lengkap pengajuan sertifikasi
              </p>
            </div>
          </div>
          <button onClick={handleDownloadPDF} className={styles.downloadButton}>
            <FileDown className="w-5 h-5" />
            Download PDF
          </button>
        </header>

        {/* Status Banner */}
        <div
          className={`${styles.statusBanner} ${
            styles[`statusBanner--${getStatusModifier(pengajuan.status)}`]
          }`}
        >
          <div className={styles.statusContent}>
            <Clock className={styles.statusIcon} />
            <div>
              <p className={styles.statusLabel}>Status Pengajuan</p>
              <p className={styles.statusValue}>
                {getStatusLabel(pengajuan.status)}
              </p>
            </div>
          </div>
          <div className={styles.statusDates}>
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>Dibuat</span>
              <span className={styles.dateValue}>
                {formatDate(pengajuan.created_at)}
              </span>
            </div>
            {pengajuan.submitted_at && (
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Diajukan</span>
                <span className={styles.dateValue}>
                  {formatDate(pengajuan.submitted_at)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step Navigation */}
        <div className={styles.stepIndicator}>
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`${styles.stepItem} ${
                currentStep === step ? styles.active : ""
              } ${currentStep > step ? styles.completed : ""}`}
              onClick={() => goToStep(step)}
            >
              <div className={styles.stepNumber}>
                {currentStep > step ? <CheckCircle size={20} /> : step}
              </div>
              <div className={styles.stepLabel}>
                {step === 1 && "Informasi"}
                {step === 2 && "Program"}
                {step === 3 && "Unit Kompetensi"}
                {step === 4 && "Dokumen"}
                {step === 5 && "Catatan"}
                {step === 6 && pengajuan.penilaian_asesor && "Penilaian"}
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className={styles.stepContent}>
          {/* Step 1: Informasi Asesi */}
          {currentStep === 1 && (
            <div className={`${styles.card} ${styles.fadeIn}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${styles.blue}`}>
                  <User size={24} />
                </div>
                <h2>Informasi Asesi</h2>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.label}>Nama Lengkap</p>
                  <p className={styles.value}>
                    {pengajuan.asesi?.nama_lengkap || "N/A"}
                  </p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.label}>Username</p>
                  <p className={styles.value}>
                    {pengajuan.asesi?.username || "N/A"}
                  </p>
                </div>
                <div className={`${styles.infoItem} ${styles.withIcon}`}>
                  <Mail className={styles.icon} />
                  <div>
                    <p className={styles.label}>Email</p>
                    <p className={styles.value}>
                      {pengajuan.asesi?.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div className={`${styles.infoItem} ${styles.withIcon}`}>
                  <Phone className={styles.icon} />
                  <div>
                    <p className={styles.label}>No. Telepon</p>
                    <p className={styles.value}>
                      {pengajuan.asesi?.no_telepon || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Program Sertifikasi */}
          {currentStep === 2 && (
            <div className={`${styles.card} ${styles.fadeIn}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${styles.green}`}>
                  <BookOpen size={24} />
                </div>
                <h2>Program Sertifikasi</h2>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.label}>Jurusan</p>
                  <p className={styles.value}>
                    {pengajuan.jurusan?.nama_jurusan || "N/A"}
                  </p>
                  <small className={styles.hint}>
                    Kode: {pengajuan.jurusan?.kode_jurusan || "N/A"}
                  </small>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.label}>Skema Sertifikasi</p>
                  <p className={styles.value}>
                    {pengajuan.skema_okupasi?.nama_skema || "N/A"}
                  </p>
                  <small className={styles.hint}>
                    Kode: {pengajuan.skema_okupasi?.kode_skema || "N/A"}
                  </small>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Unit Kompetensi */}
          {currentStep === 3 && (
            <div className={`${styles.card} ${styles.fadeIn}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${styles.purple}`}>
                  <Clipboard size={24} />
                </div>
                <h2>
                  Unit Kompetensi (
                  {pengajuan.detail_unit_kompetensi?.length || 0})
                </h2>
              </div>
              <div className={styles.unitList}>
                {pengajuan.detail_unit_kompetensi?.map((detail) => (
                  <div key={detail.id} className={styles.unitCard}>
                    <div className={styles.unitHeader}>
                      <div className={styles.unitInfo}>
                        <span className={styles.unitCode}>
                          {detail.unit_kompetensi?.kode_unit}
                        </span>
                        <h3 className={styles.unitName}>
                          {detail.unit_kompetensi?.nama_unit}
                        </h3>
                      </div>
                      <span
                        className={`${styles.competencyBadge} ${
                          detail.is_kompeten
                            ? styles.kompeten
                            : styles.belumKompeten
                        }`}
                      >
                        {detail.is_kompeten ? (
                          <>
                            <CheckCircle size={16} />
                            Kompeten
                          </>
                        ) : (
                          <>
                            <XCircle size={16} />
                            Belum Kompeten
                          </>
                        )}
                      </span>
                    </div>
                    {detail.bukti_relevan && (
                      <div className={styles.evidenceBox}>
                        <p className={styles.evidenceLabel}>Bukti Relevan:</p>
                        <p className={styles.evidenceText}>
                          {detail.bukti_relevan}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Dokumen Kelengkapan */}
          {currentStep === 4 && (
            <div className={`${styles.card} ${styles.fadeIn}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${styles.orange}`}>
                  <FileText size={24} />
                </div>
                <h2>
                  Dokumen Kelengkapan (
                  {pengajuan.bukti_kelengkapan?.length || 0})
                </h2>
              </div>
              <div className={styles.documentGrid}>
                {pengajuan.bukti_kelengkapan?.map((bukti) => (
                  <div key={bukti.id} className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <div>
                        <p className={styles.documentType}>
                          {formatDokumenLabel(bukti.jenis_dokumen)}
                        </p>
                        <p className={styles.uploadDate}>
                          {formatDate(bukti.uploaded_at)}
                        </p>
                      </div>
                      <a
                        href={bukti.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadLink}
                      >
                        <Download size={18} />
                      </a>
                    </div>
                    <div className={styles.documentDetails}>
                      <p className={styles.fileName} title={bukti.nama_file}>
                        {bukti.nama_file}
                      </p>
                      <p className={styles.fileMeta}>
                        {formatFileSize(bukti.ukuran_file)} • {bukti.mime_type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Catatan Asesi */}
          {currentStep === 5 && (
            <div className={`${styles.card} ${styles.fadeIn}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${styles.yellow}`}>
                  <FileText size={24} />
                </div>
                <h2>Catatan Asesi</h2>
              </div>
              {pengajuan.catatan_asesi ? (
                <div className={styles.catatanBox}>
                  <p className={styles.catatanText}>
                    {pengajuan.catatan_asesi}
                  </p>
                </div>
              ) : (
                <p className={styles.noData}>Tidak ada catatan dari asesi.</p>
              )}
            </div>
          )}

          {/* Step 6: Penilaian Asesor (Only if exists) */}
          {currentStep === 6 && pengajuan.penilaian_asesor && (
            <div
              className={`${styles.card} ${styles.fadeIn} ${styles.penilaianCard}`}
            >
              <div className={styles.cardHeader}>
                <div
                  className={`${styles.iconWrapper} ${
                    pengajuan.penilaian_asesor.hasil_penilaian === "kompeten"
                      ? styles.green
                      : styles.red
                  }`}
                >
                  <Award size={24} />
                </div>
                <h2>Hasil Penilaian Asesor</h2>
              </div>

              <div className={styles.penilaianGrid}>
                <div className={styles.penilaianItem}>
                  <p className={styles.label}>Nama Asesor</p>
                  <p className={styles.value}>
                    {pengajuan.penilaian_asesor.nama_asesor}
                  </p>
                </div>

                <div className={`${styles.penilaianItem} ${styles.withIcon}`}>
                  <Calendar className={styles.icon} />
                  <div>
                    <p className={styles.label}>Tanggal Penilaian</p>
                    <p className={styles.value}>
                      {formatDate(pengajuan.penilaian_asesor.tanggal_penilaian)}
                    </p>
                  </div>
                </div>

                <div className={`${styles.penilaianItem} ${styles.fullWidth}`}>
                  <p className={styles.label}>Hasil Penilaian</p>
                  <span
                    className={`${styles.hasilBadge} ${
                      pengajuan.penilaian_asesor.hasil_penilaian === "kompeten"
                        ? styles.kompeten
                        : styles.belumKompeten
                    }`}
                  >
                    {pengajuan.penilaian_asesor.hasil_penilaian ===
                    "kompeten" ? (
                      <>
                        <CheckCircle size={20} />
                        KOMPETEN
                      </>
                    ) : (
                      <>
                        <XCircle size={20} />
                        BELUM KOMPETEN
                      </>
                    )}
                  </span>
                </div>

                {pengajuan.penilaian_asesor.bukti_penilaian && (
                  <div
                    className={`${styles.penilaianItem} ${styles.fullWidth}`}
                  >
                    <p className={styles.label}>Bukti Penilaian</p>
                    <p className={styles.text}>
                      {pengajuan.penilaian_asesor.bukti_penilaian}
                    </p>
                  </div>
                )}

                {pengajuan.penilaian_asesor.rekomendasi && (
                  <div
                    className={`${styles.penilaianItem} ${styles.fullWidth} ${styles.rekomendasiBox}`}
                  >
                    <p className={styles.label}>Rekomendasi / Catatan Asesor</p>
                    <p className={styles.rekomendasiText}>
                      {pengajuan.penilaian_asesor.rekomendasi}
                    </p>
                  </div>
                )}

                {pengajuan.penilaian_asesor.tanda_tangan && (
                  <div
                    className={`${styles.penilaianItem} ${styles.fullWidth}`}
                  >
                    <p className={styles.label}>Tanda Tangan Digital</p>
                    <div className={styles.signatureBox}>
                      <img
                        src={pengajuan.penilaian_asesor.tanda_tangan}
                        alt="Tanda Tangan Asesor"
                        className={styles.signatureImage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className={styles.stepNavigation}>
          <button
            onClick={prevStep}
            className={styles.navButton}
            disabled={currentStep === 1}
          >
            <ArrowLeft size={18} />
            Sebelumnya
          </button>
          <span className={styles.stepCounter}>
            Step {currentStep} dari {totalSteps}
          </span>
          <button
            onClick={nextStep}
            className={styles.navButton}
            disabled={currentStep === totalSteps}
          >
            Selanjutnya
            <ArrowLeft size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPengajuanDetail;
