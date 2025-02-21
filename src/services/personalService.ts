import api from "@/config/axios.config";
import { ZPersonal } from "@/lib/schemas/personal.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";

export const getPersonal = async (id: string) => {
  try {
    const response = await api.get(`/personal/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw handleError(error as CustomError);
  }
};

// add get users by params
export const getAllPersonal = async () => {
  try {
    const response = await api.get(`/personal`);
    return response.data;
  } catch (error: unknown) {
    throw handleError(error as CustomError);
  }
};

export const getCurrentPersonal = async (userId: string) => {
  try {
    const response = await api.get(`/personal?userId=${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw handleError(error as CustomError);
  }
};

export const createPersonal = async (personalData: ZPersonal) => {
  try {
    // const transformedData = {
    //   ...data,
    //   userId: "chnage-id",
    //   fechaIngreso: data.fechaIngreso ? new Date(data.fechaIngreso).toISOString() : null,
    //   fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : null,
    // };
    const response = await api.post(`/personal`, personalData);
    return response.data;
  } catch (error: unknown) {
    throw handleError(error as CustomError);
  }
};
