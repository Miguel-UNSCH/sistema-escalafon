/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";
import { ZConyuge } from "@/lib/schemas/conyuge.schema";

export const getConyuge = async (personalId: number) => {
  try {
    const response = await api.get(`/conyuge/${personalId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener el ubigeo" };
  }
};

export const createConyuge = async (data: ZConyuge) => {
  try {
    const transformedData = {
      ...data,
      fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : null,
    };
    console.log(transformedData);
    const response = await api.post(`/conyuge`, transformedData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};
