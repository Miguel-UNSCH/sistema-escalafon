/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";
import { ZConyuge } from "@/lib/schemas/conyuge.schema";

export const getConyuge = async (personalId: string) => {
  try {
    const response = await api.get(`/conyuge?personalId=${personalId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener el datos" };
  }
};

export const createConyuge = async (data: ZConyuge) => {
  try {
    const transformedData = {
      ...data,
      fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : null,
    };
    const response = await api.post(`/conyuge`, transformedData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los datos" };
  }
};
