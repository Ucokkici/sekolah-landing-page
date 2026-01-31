import api from "./api";
import {
  type ApiResponse,
  type Jurusan,
  type SkemaOkupasi,
  type UnitKompetensi,
} from "../types";

interface SkemaByJurusanResponse {
  jurusan: Jurusan;
  skema: SkemaOkupasi[];
}

interface UnitBySkemaResponse {
  skema: SkemaOkupasi;
  unit_kompetensi: UnitKompetensi[];
}

const masterDataService = {
  getJurusan: async (): Promise<ApiResponse<Jurusan[]>> => {
    const response = await api.get<ApiResponse<Jurusan[]>>("/jurusan");
    return response.data;
  },

  getSkemaByJurusan: async (
    jurusanId: number
  ): Promise<ApiResponse<SkemaByJurusanResponse>> => {
    const response = await api.get<ApiResponse<SkemaByJurusanResponse>>(
      `/jurusan/${jurusanId}/skema`
    );
    return response.data;
  },

  getUnitBySkema: async (
    skemaId: number
  ): Promise<ApiResponse<UnitBySkemaResponse>> => {
    const response = await api.get<ApiResponse<UnitBySkemaResponse>>(
      `/skema/${skemaId}/unit-kompetensi`
    );
    return response.data;
  },

  getAllSkema: async (): Promise<ApiResponse<SkemaOkupasi[]>> => {
    const response = await api.get<ApiResponse<SkemaOkupasi[]>>("/skema");
    return response.data;
  },

  getSkemaDetail: async (
    skemaId: number
  ): Promise<ApiResponse<SkemaOkupasi>> => {
    const response = await api.get<ApiResponse<SkemaOkupasi>>(
      `/skema/${skemaId}`
    );
    return response.data;
  },
};

export default masterDataService;
