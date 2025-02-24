import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const uploadFile = async (file: string) => {
  try {
    const fileServerUrl = process.env.NEXT_PUBLIC_FILE_SERVER_URL;
    const token = process.env.NEXT_PUBLIC_FILE_SERVER_TOKEN;

    if (!fileServerUrl) throw new Error("La URL del servidor de archivos no está configurada");
    if (!token) throw new Error("El token de autenticación no está configurado");

    const response = await axios.post(
      `${fileServerUrl}/sistema-escalafon/upload`,
      { file },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error al subir archivo:", error.response?.data || error.message);
    return error.response?.data || { error: "Error desconocido" };
  }
};
