/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const getUbigeo = async () => {
  try {
    const response = await api.get(`/ubigeo`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};
