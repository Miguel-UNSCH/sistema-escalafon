import api from "@/config/axios.config";
import { CustomError, handleError } from "@/middleware/errorHandler";

export const getUser = async (id: string) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw handleError(error as CustomError);
  }
};

export const createUser = async (userData: { name: string; email: string }) => {
  try {
    const response = await api.post("/user", userData);
    return response.data;
  } catch (error: unknown) {
    throw handleError(error as CustomError);
  }
};
