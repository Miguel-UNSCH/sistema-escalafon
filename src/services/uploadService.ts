/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios.config";

export const uploadFile = async (params: { personalId: string; folder?: string }, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const queryParams = new URLSearchParams(params as Record<string, string>).toString();
    const response = await api.post(`/files?${queryParams}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "Error desconocido al subir el archivo" };
  }
};
