/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";
import { ZHijo } from "@/lib/schemas/hijo.schema";

export const getHijos = async (personalId: string) => {
  try {
    const response = await api.get(`/hijo?personalId=${personalId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error deconocido al obtener los datos" };
  }
};

export const createHijo = async (data: ZHijo) => {
  try {
    const transformedData = {
      ...data,
      fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : null,
    };
    const response = await api.post(`/hijo`, transformedData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los datos" };
  }
};
