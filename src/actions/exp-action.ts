"use server";

import { Prisma, User } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZExpS } from "@/lib/schemas/user-schema";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type expRecord = Prisma.ExperienceGetPayload<{
  include: { file: true };
}>;

export const getExperiences = async (id: string): Promise<{ success: boolean; message?: string; data?: expRecord[] }> => {
  try {
    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const experiencias: expRecord[] | null = await prisma.experience.findMany({
      where: { user_id: id },
      include: { file: true },
    });
    if (!experiencias) throw new Error("No hay experiencias registradas");

    return { success: true, data: experiencias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las experiencias.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createExp = async (id: string, data: ZExpS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentUser = await prisma.user.findUnique({ where: { id: id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    await prisma.experience.create({
      data: {
        user_id: id,
        cargo: data.cargo.toUpperCase(),
        centro_labor: data.centro_labor.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Experiencia registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar la experiencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateExp = async (id: string, data: ZExpS & { file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.experience.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Experiencia no encontrada");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.experience.update({
      where: { id },
      data: {
        centro_labor: data.centro_labor.toUpperCase(),
        cargo: data.cargo.toUpperCase(),
        periodo: {
          from: new Date(data.periodo.from).toISOString(),
          to: new Date(data.periodo.to).toISOString(),
        },
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Experiencia actualizada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar la experiencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteExp = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.experience.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Experiencia no encontrado");

    const current_file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!current_file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), current_file.path, `${current_file.id}${current_file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      // oxlint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
    } catch {
      throw new Error("No se pudo eliminar el archivo físico.");
    }

    await prisma.experience.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Experiencia eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la experiencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
