"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { canEdit } from "@/helpers";

export const limitTime = async (): Promise<{ success: boolean; message?: string; data?: { start: Date; end: Date } }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const edit_config = await prisma.conf_edicion.findFirst({ orderBy: { createdAt: "desc" } });
    const now = new Date();

    let modificationStart = now;
    if (edit_config && edit_config.fecha_inicio && edit_config.fecha_inicio > now) modificationStart = edit_config.fecha_inicio;

    let modificationEnd = user.modification_end_time;
    if (edit_config && edit_config.fecha_fin) modificationEnd = new Date(Math.max(user.modification_end_time.getTime(), edit_config.fecha_fin.getTime()));

    return { success: true, data: { start: modificationStart, end: modificationEnd } };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al obtener el tiempo límite" };
  }
};

export const checkEditable = async (): Promise<{ success: boolean; editable?: boolean; message?: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role === "admin") return { success: true, editable: true, message: "Admin: editable sin restricción de tiempo" };

    const edit_config = await prisma.conf_edicion.findFirst({ orderBy: { createdAt: "desc" } });
    const now = new Date();

    let modificationStart = now;
    if (edit_config && edit_config.fecha_inicio && edit_config.fecha_inicio > now) modificationStart = edit_config.fecha_inicio;

    let modificationEnd = user.modification_end_time;
    if (edit_config && edit_config.fecha_fin) modificationEnd = new Date(Math.max(user.modification_end_time.getTime(), edit_config.fecha_fin.getTime()));

    const editable = canEdit(modificationStart, modificationEnd);

    return { success: true, editable };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error desconocido" };
  }
};
