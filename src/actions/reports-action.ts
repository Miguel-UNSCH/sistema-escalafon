"use server";

export const fn_report_time = async (id: string): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    console.log(id);
    return { success: true, message: "Reporte generado correctamente", data: {} };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo." };
  }
};
