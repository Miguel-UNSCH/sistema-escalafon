/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const getUbigeos = async () => {
  try {
    const response = await api.get(`/ubigeo`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};

export const getUbigeo = async (params: { departamento?: string; provincia?: string; distrito?: string }) => {
  try {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();

    const response = await api.get(`/ubigeo?${queryParams}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener el ubigeo" };
  }
};
