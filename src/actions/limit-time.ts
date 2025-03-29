"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";

export const limitTime = async (): Promise<{ success: boolean; message?: string; data?: Date }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const edit_config = await prisma.conf_edicion.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (!edit_config) throw new Error("Configuracion no encontrada");

    const time_limit = user.modification_end_time > edit_config.createdAt ? user.modification_end_time : edit_config.createdAt;

    return { success: true, data: new Date(time_limit) };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al obtener el tiempo limite" };
  }
};
