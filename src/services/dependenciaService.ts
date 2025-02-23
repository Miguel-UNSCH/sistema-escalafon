/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const getDependencia = async () => {
  try {
    const response = await api.get(`/dependencia`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createDependencia = async (dependenciaData: { nombre: string }) => {
  try {
    const response = await api.post(`/dependencia`, dependenciaData);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
