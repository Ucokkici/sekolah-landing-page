import React from "react";
import { DetailUnitKompetensi } from "../types";

interface UnitTableProps {
  details: DetailUnitKompetensi[];
}

const UnitTable: React.FC<UnitTableProps> = ({ details }) => {
  return (
    <div className="w-full mb-4">
      {/* Unit Competency Header Row */}
      {details.length > 0 && (
        <div className="flex border-x border-t border-black bg-[#FFCC99] font-bold text-[9px]">
          <div className="w-[20%] p-1.5 px-3 border-r border-black">
            Unit Kompetensi:
          </div>
          <div className="flex-1 p-1.5 px-3">
            {details[0].unit_kompetensi?.nama_unit} ({" "}
            {details[0].unit_kompetensi?.kode_unit} )
          </div>
        </div>
      )}

      {/* Question Subheader */}
      <div className="flex border border-black bg-[#FFCC99] font-bold text-[8px] text-center">
        <div className="w-[55%] p-1 border-r border-black">
          Dapatkah Saya Melaksanakan Unit Kompetensi Ini?
        </div>
        <div className="w-[5%] p-1 border-r border-black">K</div>
        <div className="w-[5%] p-1 border-r border-black">BK</div>
        <div className="w-[35%] p-1">Bukti yang relevan</div>
      </div>

      {/* Rows */}
      {details.map((detail, idx) => (
        <div
          key={detail.id}
          className="flex border-x border-b border-black text-[8px] min-h-[60px]"
        >
          <div className="w-[55%] p-3 border-r border-black flex flex-col justify-start">
            <div className="font-bold mb-1 italic text-gray-700">
              Elemen : Melaksanakan tugas unit kompetensi {idx + 1}
            </div>
            <div className="pl-2">
              <span className="font-bold">● Kriteria Unjuk Kerja:</span>
              <p className="mt-1 leading-relaxed">
                1.1 Langkah kerja diidentifikasi sesuai SOP
                <br />
                1.2 Hasil kerja divalidasi sesuai spesifikasi program
              </p>
            </div>
          </div>

          <div className="w-[5%] border-r border-black flex items-center justify-center p-1">
            <div className="w-4 h-4 border border-black flex items-center justify-center text-[10px] font-bold">
              {detail.is_kompeten ? "V" : ""}
            </div>
          </div>

          <div className="w-[5%] border-r border-black flex items-center justify-center p-1">
            <div className="w-4 h-4 border border-black flex items-center justify-center text-[10px] font-bold">
              {!detail.is_kompeten ? "V" : ""}
            </div>
          </div>

          <div className="w-[35%] p-3 text-[8px] italic leading-relaxed">
            {detail.bukti_relevan || "-"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitTable;
