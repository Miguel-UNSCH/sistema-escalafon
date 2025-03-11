"use client";

import { File } from "@prisma/client";

export const uploadFile = async (file: globalThis.File, category: string, subfolder?: string): Promise<{ success: boolean; message?: string; data?: File }> => {
  try {
    if (!file) throw new Error("No se ha seleccionado ningún archivo");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    if (subfolder) formData.append("subfolder", subfolder);

    const response: Response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const responseData: { message: string; file: File } = await response.json();
    if (!response.ok) throw new Error(responseData.message || "Error al subir el archivo");

    return { success: true, message: "Archivo subido correctamente", data: responseData.file };
  } catch (error: unknown) {
    let errorMessage = "Error desconocido al subir el archivo";
    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
