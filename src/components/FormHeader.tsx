import React from "react";
import { PengajuanSertifikasi } from "../types";

interface FormHeaderProps {
  pageNumber: number;
  totalPages: number;
  data?: PengajuanSertifikasi;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  pageNumber,
  totalPages,
  data,
}) => {
  return (
    <div className="w-full border border-black mb-2 text-[9px]">
      <div className="flex">
        {/* Logo and Main Title */}
        <div className="w-[30%] p-2 border-r border-black flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-1">
            <img
              src="https://picsum.photos/id/1/40/40"
              alt="Logo LSP"
              className="w-8 h-8 object-contain"
            />
            <div className="font-black text-[14px] text-red-700 leading-none">
              LSP
            </div>
          </div>
          <div className="font-bold text-[7px] leading-tight">
            Lembaga Sertifikasi Profesi
            <br />
            SMK NEGERI 17 JAKARTA
          </div>
        </div>
        {/* Middle Metadata */}
        <div className="w-[40%] border-r border-black flex flex-col">
          <div className="p-1 border-b border-black text-center font-bold bg-white leading-tight flex-1 flex items-center justify-center uppercase text-[8px] px-4">
            {data?.skema_okupasi?.nama_skema || "SKEMA SERTIFIKASI OKUPASI"}
          </div>
          <div className="p-2 text-center font-bold flex items-center justify-center uppercase text-[10px]">
            FR. APL-02. ASESMEN MANDIRI
          </div>
        </div>
        {/* Right Metadata */}
        <div className="w-[30%]">
          <div className="flex border-b border-black">
            <div className="w-[45%] p-1 px-2 border-r border-black">
              No. Dokumen
            </div>
            <div className="w-[5%] p-1 text-center">:</div>
            <div className="w-[50%] p-1 font-bold">FR-APL.02.01.00</div>
          </div>
          <div className="flex border-b border-black">
            <div className="w-[45%] p-1 px-2 border-r border-black">
              Edisi/Revisi
            </div>
            <div className="w-[5%] p-1 text-center">:</div>
            <div className="w-[50%] p-1 font-bold">02/00</div>
          </div>
          <div className="flex border-b border-black">
            <div className="w-[45%] p-1 px-2 border-r border-black">
              Tanggal Berlaku
            </div>
            <div className="w-[5%] p-1 text-center">:</div>
            <div className="w-[50%] p-1 font-bold">18 November 2024</div>
          </div>
          <div className="flex">
            <div className="w-[45%] p-1 px-2 border-r border-black">
              Halaman
            </div>
            <div className="w-[5%] p-1 text-center">:</div>
            <div className="w-[50%] p-1 font-bold text-center">
              {pageNumber} dari {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
