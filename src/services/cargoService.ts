/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const getCargo = async () => {
  try {
    const response = await api.get(`/cargo`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createCargo = async (cargoData: { nombre: string }) => {
  try {
    const response = await api.post(`/cargo`, cargoData);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
