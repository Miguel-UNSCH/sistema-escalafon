"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZEstudioS } from "@/lib/schemas/user-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type formAcRecord = Prisma.FormacionAcademicaGetPayload<{ include: { file: true } }>;

export const getStudies = async (id: string): Promise<{ success: boolean; message?: string; data?: formAcRecord[] }> => {
  try {
    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const studies: formAcRecord[] | null = await prisma.formacionAcademica.findMany({ where: { user_id: user.id }, include: { file: true } });
    if (!studies) throw new Error("No hay estudios registrados.");

    return { success: true, data: studies };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los estudios.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createStudy = async (id: string, data: ZEstudioS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const existFile = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!existFile) throw new Error("Archivo no encontrado, necesita subir el documento de sustento.");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    await prisma.formacionAcademica.create({
      data: {
        user_id: id,
        nivel: data.nivel,
        institucion: data.institucion.toUpperCase(),
        carrera: data.carrera?.toUpperCase(),
        facultad: data.facultad?.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Estudio registrado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el estudio.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateStudy = async (id: string, data: ZEstudioS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.formacionAcademica.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Estudio no encontrado");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.formacionAcademica.update({
      where: { id },
      data: {
        nivel: data.nivel,
        institucion: data.institucion.toUpperCase(),
        carrera: data.carrera?.toUpperCase(),
        facultad: data.facultad?.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Estudio actualizado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar el estudio.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteStudy = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.formacionAcademica.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Estudio no encontrado");

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

    await prisma.formacionAcademica.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Estudio eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el estudio.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
