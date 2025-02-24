/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";
import { ZPersonal } from "@/lib/schemas/personal.schema";

export const getPersonal = async (id: string) => {
  try {
    const response = await api.get(`/personal/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};

export const getAllPersonal = async () => {
  try {
    const response = await api.get(`/personal`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};

export const getCurrentPersonal = async (userId: string) => {
  try {
    const response = await api.get(`/personal?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};

export const createPersonal = async (data: ZPersonal) => {
  try {
    const transformedData = {
      ...data,
      fechaIngreso: data.fechaIngreso ? new Date(data.fechaIngreso).toISOString() : null,
      fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : null,
    };
    console.log(transformedData);
    const response = await api.post(`/personal`, transformedData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al obtener los ubigeos" };
  }
};
