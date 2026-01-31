import React, { useRef } from "react";
// Import disesuaikan dengan struktur folder user (Root types.ts)
import {
  PengajuanSertifikasi,
  BuktiKelengkapan,
  DetailUnitKompetensi,
} from "../../../types";
import html2pdf from "html2pdf.js";

// Import Logo
import logo from "../../../assets/lsp logo.png";

interface FormAPL01Props {
  data: PengajuanSertifikasi;
  onClose: () => void;
}

const FormAPL01: React.FC<FormAPL01Props> = ({ data, onClose }) => {
  const asesi = data.asesi;
  const skema = data.skema_okupasi;

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    if (!element) return;

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `FR.APL.01-${asesi?.nama_lengkap || "Dokumen"}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  /**
   * FIX CHECKBOX UNTUK PDF:
   * html2canvas sering bermasalah dengan flexbox center atau line-height dinamis.
   * Kita gunakan inline-block dengan dimensi kaku dan text-align center.
   */
  const Checkbox = ({ checked }: { checked: boolean }) => (
    <div
      className="inline-block border border-black bg-white text-center align-middle overflow-hidden shrink-0"
      style={{
        width: "14px",
        height: "14px",
        minWidth: "14px",
        minHeight: "14px",
        lineHeight: "1px", // Sedikit lebih kecil dari height agar ✓ tidak terpotong ke bawah
        fontSize: "11px",
        fontWeight: "bold",
        boxSizing: "border-box",
      }}
    >
      {checked ? "✓" : ""}
    </div>
  );

  const adminDocs =
    data.bukti_kelengkapan?.filter((item: BuktiKelengkapan) =>
      [
        "kartu_pelajar",
        "raport_semester_1_5",
        "sertifikat_pkl",
        "kartu_keluarga_ktp",
        "pas_foto_3x4",
      ].includes(item.jenis_dokumen)
    ) || [];

  const DocumentHeader = ({ page }: { page: number }) => (
    <header className="border-[1.5px] border-black text-black mb-4">
      <div className="flex w-full">
        <div className="w-24 h-24 shrink-0 border-r-[1.5px] border-black flex items-center justify-center bg-white p-1">
          <img
            src={logo}
            alt="Logo LSP"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-grow flex flex-col">
          <div className="flex border-b-[1.5px] border-black">
            <div className="w-[60%] border-r-[1.5px] border-black flex items-center justify-center p-1">
              <h1 className="text-sm font-bold uppercase text-center">
                LSP SMK NEGERI 17 JAKARTA
              </h1>
            </div>
            <div className="w-[40%] text-[10px]">
              <div className="flex border-b border-black">
                <div className="w-1/2 p-1 border-r border-black font-semibold">
                  No. Dokumen
                </div>
                <div className="w-1/2 p-1">: FR.APL.01.02.00</div>
              </div>
              <div className="flex">
                <div className="w-1/2 p-1 border-r border-black font-semibold">
                  Edisi/Revisi
                </div>
                <div className="w-1/2 p-1">: 02/00</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[60%] border-r-[1.5px] border-black bg-[#00adef] text-white flex items-center justify-center p-2 text-center">
              <h2 className="text-[11px] font-bold uppercase leading-tight">
                {skema?.nama_skema || "Skema Sertifikasi"}
              </h2>
            </div>
            <div className="w-[40%] text-[10px]">
              <div className="flex border-b border-black">
                <div className="w-1/2 p-1 border-r border-black font-semibold">
                  Tanggal Berlaku
                </div>
                <div className="w-1/2 p-1">: 18 November 2024</div>
              </div>
              <div className="flex">
                <div className="w-1/2 p-1 border-r border-black font-semibold">
                  Halaman
                </div>
                <div className="w-1/2 p-1">: {page} dari 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1.5px] border-black p-2 text-center">
        <h3 className="text-sm font-bold uppercase">
          FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI
        </h3>
      </div>
    </header>
  );

  const Footer = ({ page }: { page: number }) => (
    <div className="mt-4 flex justify-between items-end text-[11px] font-bold border-t border-black pt-2">
      <div className="italic">FR-APL.01.02.00</div>
      <div className="bg-[#dae8fc] px-4 py-0.5 border border-black">{page}</div>
    </div>
  );

  const Row = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex w-full items-baseline">
      <label className="w-[180px] shrink-0 font-medium">{label}</label>
      <span className="mr-2 font-bold">:</span>
      <div className="flex-grow border-b border-black px-1 min-h-[22px] pb-1">
        {value || ""}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-auto p-4 pt-20 md:p-10 md:pt-40 text-black print:static print:p-0 print:m-0">
      <div className="no-print mb-6 flex justify-between items-center max-w-[800px] mx-auto border-b pb-4">
        <h2 className="text-lg font-bold">Pratinjau Cetak FR.APL.01</h2>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded font-bold hover:bg-gray-300"
          >
            Tutup
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700"
          >
            DOWNLOAD PDF
          </button>
        </div>
      </div>

      <div ref={pdfRef} className="max-w-[800px] mx-auto bg-white p-2">
        {/* PAGE 1 */}
        <section className="min-h-[1050px] flex flex-col mb-10 print:mb-0">
          <DocumentHeader page={1} />
          <div className="flex-grow space-y-4 text-[13px]">
            <h5 className="font-bold">
              Bagian 1 : Rincian Data Pemohon Sertifikasi
            </h5>
            <div className="space-y-4">
              <h6 className="font-bold">a. Data Pribadi</h6>
              <div className="space-y-4 pl-4">
                <Row label="Nama lengkap" value={asesi?.nama_lengkap} />
                <Row
                  label="No. KTP/NIK/Paspor"
                  value={asesi?.no_ktp_nik_paspor}
                />
                <div className="flex w-full items-baseline">
                  <label className="w-[180px] shrink-0 font-medium">
                    Tempat / tgl. Lahir
                  </label>
                  <span className="mr-2 font-bold">:</span>
                  <div className="w-1/2 border-b border-black px-1 pb-1">
                    {asesi?.tempat_lahir}
                  </div>
                  <span className="mx-2">/</span>
                  <div className="w-1/2 border-b border-black px-1 pb-1">
                    {asesi?.tanggal_lahir}
                  </div>
                </div>
                <div className="flex w-full items-baseline">
                  <label className="w-[180px] shrink-0 font-medium">
                    Jenis kelamin
                  </label>
                  <span className="mr-2 font-bold">:</span>
                  <div className="flex gap-4 pb-1">
                    <span className="whitespace-nowrap">
                      {asesi?.jenis_kelamin === "laki-laki" ? "✓" : ""}{" "}
                      Laki-laki
                    </span>
                    <span>/</span>
                    <span className="whitespace-nowrap">
                      {asesi?.jenis_kelamin === "perempuan" ? "✓" : ""} Wanita
                    </span>
                    <span className="ml-2">*)</span>
                  </div>
                </div>
                <Row label="Kebangsaan" value={asesi?.kebangsaan} />
                <Row label="Alamat rumah" value={asesi?.alamat_rumah} />
                <Row label="No. HP" value={asesi?.no_telepon} />
                <Row label="E-mail" value={asesi?.email} />
                <Row
                  label="Kualifikasi Pendidikan"
                  value={asesi?.kualifikasi_pendidikan}
                />
              </div>
              <h6 className="font-bold mt-4">b. Data Pekerjaan Sekarang</h6>
              <div className="space-y-3 pl-4">
                <Row
                  label="Nama Institusi"
                  value={asesi?.nama_institusi_perusahaan}
                />
                <Row label="Jabatan" value={asesi?.jabatan} />
                <Row label="Alamat Kantor" value={asesi?.alamat_kantor} />
                <Row
                  label="No. Telp Kantor"
                  value={asesi?.no_telp_fax_email_kantor}
                />
              </div>
            </div>
          </div>
          <Footer page={1} />
        </section>

        {/* PAGE 2 - FIXED SECTION */}
        <section className="min-h-[1050px] flex flex-col pt-8 mb-10 print:mb-0">
          <DocumentHeader page={2} />
          <div className="flex-grow space-y-4 text-[13px]">
            <h5 className="font-bold">Bagian 2 : Data Sertifikasi</h5>

            {/* FIX: Layout lebih stabil tanpa gap-flex yang berlebihan untuk PDF */}
            <div className="border border-black overflow-hidden bg-white">
              {/* --- Data Skema --- */}
              <div className="flex border-b border-black">
                <div className="w-1/3 p-2 font-medium border-r border-black flex items-center bg-gray-50/10">
                  Skema Sertifikasi
                </div>
                <div className="w-2/3 flex flex-col">
                  <div className="flex border-b border-black">
                    <div className="w-[100px] p-2 border-r border-black font-semibold bg-gray-50/5">
                      Judul
                    </div>
                    <div className="flex-grow p-2 pb-1">
                      : {skema?.nama_skema}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[100px] p-2 border-r border-black font-semibold bg-gray-50/5">
                      Nomor
                    </div>
                    <div className="flex-grow p-2 pb-1">
                      : {skema?.kode_skema}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Data Tujuan Asesmen --- */}
              <div className="flex">
                <div className="w-1/3 p-2 font-medium border-r border-black flex items-center bg-gray-50/10">
                  Tujuan Asesmen
                </div>
                <div className="w-2/3 flex flex-col p-2">
                  <div className="flex items-center mb-1">
                    <Checkbox checked={true} />
                    <span className="ml-2 text-[12px] leading-none">
                      Sertifikasi
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Checkbox checked={false} />
                    <span className="ml-2 text-[12px] leading-none">
                      Sertifikasi Ulang
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Checkbox checked={false} />
                    <span className="ml-2 text-[12px] leading-none">
                      Pengakuan Kompetensi Terkini (PKT)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox checked={false} />
                    <span className="ml-2 text-[12px] leading-none">
                      Rekognisi Pembelajaran Lampau (RPL)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Tabel Unit Kompetensi --- PERBAIKAN: Type explicit (detail: DetailUnitKompetensi, idx: number) */}
            <h6 className="font-bold mt-6">Daftar Unit Kompetensi:</h6>
            <table className="w-full border-collapse border border-black text-[11px]">
              <thead>
                <tr className="bg-[#f9cb9c]">
                  <th className="border border-black p-2 w-[40px]">No.</th>
                  <th className="border border-black p-2 w-[120px]">
                    Kode Unit
                  </th>
                  <th className="border border-black p-2">Judul Unit</th>
                </tr>
              </thead>
              <tbody>
                {data.detail_unit_kompetensi?.map(
                  (detail: DetailUnitKompetensi, idx: number) => (
                    <tr key={detail.id}>
                      <td className="border border-black p-2 text-center">
                        {idx + 1}
                      </td>
                      <td className="border border-black p-2">
                        {detail.unit_kompetensi?.kode_unit}
                      </td>
                      <td className="border border-black p-2">
                        {detail.unit_kompetensi?.nama_unit}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <Footer page={2} />
        </section>

        {/* PAGE 3 - FINAL FIX: Compact & Overflow Safe */}
        <section className="flex flex-col pt-6 mb-10 print:mb-0 h-auto">
          <DocumentHeader page={3} />

          <div className="flex-grow mt-4 space-y-3 text-[12px] px-1">
            <h5 className="font-bold border-b border-black pb-1 mb-2">
              Bagian 3 : Bukti Kelengkapan Pemohon
            </h5>

            {/* TABEL 1: Bukti Persyaratan Dasar */}
            <div className="mb-3">
              <h6 className="font-bold mb-1 text-[12px]">
                Bukti Persyaratan Dasar Pemohon
              </h6>

              <table className="w-full border-collapse border border-black text-[11px] table-fixed">
                <thead>
                  <tr className="bg-[#f9cb9c]">
                    <th
                      rowSpan={2}
                      className="border border-black w-[5%] text-center align-middle font-bold"
                    >
                      No
                    </th>
                    <th
                      rowSpan={2}
                      className="border border-black w-[60%] text-center align-middle font-bold px-1"
                    >
                      Bukti Persyaratan Dasar
                    </th>
                    <th
                      colSpan={2}
                      className="border border-black w-[30%] text-center align-middle font-bold"
                    >
                      Ada
                    </th>
                    <th
                      rowSpan={2}
                      className="border border-black w-[5%] text-center align-middle font-bold"
                    >
                      Tidak Ada
                    </th>
                  </tr>
                  <tr className="bg-[#f9cb9c]">
                    <th className="border border-black text-center text-[9px] align-middle font-normal">
                      Memenuhi
                    </th>
                    <th className="border border-black text-center text-[9px] align-middle font-normal">
                      Tidak Memenuhi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      1
                    </td>
                    <td className="border border-black px-1 py-0.5 text-justify align-top leading-tight text-[11px] break-words">
                      Peserta didik pada SMK Konsentrasi Rekayasa Perangkat
                      Lunak XII semester 5 yang telah menyelesaikan mata
                      pelajaran berisi unit kompetensi yang akan diujikan.
                    </td>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      <Checkbox checked={true} />
                    </td>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      <Checkbox checked={false} />
                    </td>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      <Checkbox checked={false} />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      2
                    </td>
                    <td className="border border-black px-1 py-0.5 text-justify align-top leading-tight text-[11px] break-words">
                      Telah memiliki sertifikat/surat keterangan telah
                      melaksanakan Praktik Kerja Lapangan (PKL) pada bidang
                      Software Development.
                    </td>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      <Checkbox checked={true} />
                    </td>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      <Checkbox checked={false} />
                    </td>
                    <td className="border border-black px-1 py-0.5 text-center align-middle">
                      <Checkbox checked={false} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TABEL 2: Bukti Administratif */}
            <div className="mb-3">
              <h6 className="font-bold mb-1 text-[12px]">
                Bukti Administratif
              </h6>
              <table className="w-full border-collapse border border-black text-[11px] table-fixed">
                <thead>
                  <tr className="bg-[#f9cb9c]">
                    <th
                      rowSpan={2}
                      className="border border-black w-[5%] text-center align-middle font-bold"
                    >
                      No
                    </th>
                    <th
                      rowSpan={2}
                      className="border border-black w-[60%] text-center align-middle font-bold px-1"
                    >
                      Bukti Administratif
                    </th>
                    <th
                      colSpan={2}
                      className="border border-black w-[30%] text-center align-middle font-bold"
                    >
                      Ada
                    </th>
                    <th
                      rowSpan={2}
                      className="border border-black w-[5%] text-center align-middle font-bold"
                    >
                      Tidak Ada
                    </th>
                  </tr>
                  <tr className="bg-[#f9cb9c]">
                    <th className="border border-black text-center text-[9px] align-middle font-normal">
                      Memenuhi
                    </th>
                    <th className="border border-black text-center text-[9px] align-middle font-normal">
                      Tidak Memenuhi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adminDocs.length > 0 ? (
                    adminDocs.map((bukti: BuktiKelengkapan, idx: number) => {
                      const hasFile = !!bukti.file_path;
                      return (
                        <tr key={bukti.id}>
                          <td className="border border-black px-1 py-0.5 text-center align-middle">
                            {idx + 1}
                          </td>
                          <td className="border border-black px-1 py-0.5 text-left align-top leading-tight text-[11px] uppercase break-words">
                            {bukti.jenis_dokumen.replace(/_/g, " ")}
                          </td>
                          <td className="border border-black px-1 py-0.5 text-center align-middle">
                            <Checkbox checked={hasFile} />
                          </td>
                          <td className="border border-black px-1 py-0.5 text-center align-middle">
                            <Checkbox checked={false} />
                          </td>
                          <td className="border border-black px-1 py-0.5 text-center align-middle">
                            <Checkbox checked={!hasFile} />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="border border-black p-2 text-center italic"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bagian Rekomendasi & Tanda Tangan: Compact */}
            <div className="mt-4 border border-black">
              <table className="w-full border-collapse h-[130px]">
                <tbody>
                  <tr>
                    <td className="w-1/2 border-r border-black px-2 py-1 align-top">
                      <p className="font-bold text-[11px] mb-2">
                        Rekomendasi (diisi oleh LSP):
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Checkbox checked={data.status === "approved"} />
                          <span className="ml-2 text-[11px]">Diterima</span>
                        </div>
                        <div className="flex items-center">
                          <Checkbox checked={data.status !== "approved"} />
                          <span className="ml-2 text-[11px]">
                            Belum Diterima
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="w-1/2 px-2 py-1 align-bottom">
                      <p className="font-bold text-[11px] mb-1">
                        Pemohon/ Kandidat :
                      </p>
                      <div className="flex flex-col items-end h-full pb-1">
                        <p className="mb-1 text-[11px]">
                          {asesi?.nama_lengkap}
                        </p>
                        <div className="flex flex-col items-center justify-center flex-grow w-full">
                          <div className="h-12 w-full"></div>{" "}
                          {/* Spacer tanda tangan */}
                          <p className="text-[9px]">
                            ({data.submitted_at?.split("T")[0]})
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Footer page={3} />
        </section>
      </div>
    </div>
  );
};

export default FormAPL01;
