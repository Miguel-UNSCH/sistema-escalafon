/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const getDependencias = async () => {
  try {
    const response = await api.get(`/dependencia`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener las dependencias" };
  }
};

export const getDependencia = async (params: { nombre?: string; direccion?: string; caodigo?: string }) => {
  try {
    const queryparams = new URLSearchParams(params as Record<string, string>).toString();

    const response = await api.get(`/dependencia?${queryparams}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener la dependencia" };
  }
};
