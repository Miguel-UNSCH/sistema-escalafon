"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZCapacitacionS } from "@/lib/schemas/user-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type capacitacionRecord = Prisma.CapacitacionGetPayload<{ include: { file: true } }>;

export const getCapacitaciones = async (id: string): Promise<{ success: boolean; message?: string; data?: capacitacionRecord[] }> => {
  try {
    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const capacitacion: capacitacionRecord[] | null = await prisma.capacitacion.findMany({ where: { user_id: user.id }, include: { file: true } });
    if (!capacitacion) throw new Error("No hay capacitaciones registradas.");

    return { success: true, data: capacitacion };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las capacitaciones.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createCapacitacion = async (id: string, data: ZCapacitacionS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    await prisma.capacitacion.create({
      data: {
        user_id: currentUser.id,
        tipe: data.tipe,
        centro_capacitacion: data.centro_capacitacion.toUpperCase(),
        materia: data.materia.toUpperCase(),
        especialidad: data.especialidad?.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        horas_lectivas: data.horas_lectivas,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Capacitación registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar la capacitación.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateCapacitacion = async (id: string, data: ZCapacitacionS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.capacitacion.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Estudio no encontrado");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.capacitacion.update({
      where: { id },
      data: {
        tipe: data.tipe,
        centro_capacitacion: data.centro_capacitacion.toUpperCase(),
        materia: data.materia.toUpperCase(),
        especialidad: data.especialidad?.toUpperCase(),
        horas_lectivas: data.horas_lectivas,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
      },
    });

    return { success: true, message: "Capacitación actualizada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar la capacitación.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteCapacitacion = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.capacitacion.findUnique({ where: { id } });
    if (!current_model) throw new Error("Capacitación no encontrada");

    const current_file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!current_file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), current_file.path, `${current_file.id}${current_file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      // oxlint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      // oxlint-disable-next-line no-console
      console.warn("Advertencia: No se pudo eliminar el archivo físico:", err);
    }

    await prisma.capacitacion.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Capacitación eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la capacitación.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
