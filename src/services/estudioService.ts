/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";
import { ZEstudio } from "@/lib/schemas/estudio.schema";

export const getEstudio = async (personalId: number) => {
  try {
    const response = await api.get(`/estudios?personalId=${personalId}`);

    // Convertimos `periodo` de string JSON a objeto { from, to }
    return response.data.map((estudio: any) => ({
      ...estudio,
      periodo: JSON.parse(estudio.periodo), // ✅ Convertimos `periodo` a objeto
    }));
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los estudios." };
  }
};

export const createEstudio = async (data: ZEstudio) => {
  try {
    const transformedData = {
      ...data,
      periodo: JSON.stringify(data.periodo), // ✅ Convertimos `periodo` a string JSON antes de enviarlo
    };

    const response = await api.post(`/estudios`, transformedData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al registrar el estudio." };
  }
};
