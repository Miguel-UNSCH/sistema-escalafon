/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const getCargos = async () => {
  try {
    const response = await api.get(`/cargo`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCargo = async (parmas: { nombre: string }) => {
  try {
    const queryParams = new URLSearchParams(parmas as Record<string, string>).toString();
    const response = await api.get(`/cargo?${queryParams}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
