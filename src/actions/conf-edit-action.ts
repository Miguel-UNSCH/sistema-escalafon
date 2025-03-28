"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { conf_edicion } from "@prisma/client";

export const getConfEdit = async (): Promise<{ success: boolean; message?: string; data?: conf_edicion }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response = await prisma.conf_edicion.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (!response) throw new Error("No hay configuracion de edicion disponibles.");

    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al obtener la configuracion de edicion." };
  }
};

export const createConfEdit = async (data: conf_edicion): Promise<{ success: boolean; message: string; data?: { id: number } }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const res = await prisma.conf_edicion.create({
      data: {
        fecha_inicio: new Date(data.fecha_inicio).toISOString(),
        fecha_fin: new Date(data.fecha_fin).toISOString(),
      },
    });
    if (!res) throw new Error("Error al crear la configuracion de edicion.");

    return { success: true, message: "Configuracion de edicion creada correctamente.", data: { id: res.id } };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al crear la configuracion de edicion." };
  }
};

export const updateConfEdit = async (id: number, data: conf_edicion): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.conf_edicion.findUnique({ where: { id } });
    if (!current_model) throw new Error("Configuracion de edicion no encontrada.");

    await prisma.conf_edicion.update({
      where: { id },
      data: {
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
      },
    });

    return { success: true, message: "Configuracion de edicion actualizada correctamente." };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al actualizar la configuracion de edicion." };
  }
};

export const deleteConfEdit = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.conf_edicion.findUnique({ where: { id } });
    if (!current_model) throw new Error("Configuracion de edicion no encontrada.");

    await prisma.conf_edicion.delete({ where: { id } });

    return { success: true, message: "Configuracion de edicion eliminada correctamente." };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al eliminar la configuracion de edicion." };
  }
};
