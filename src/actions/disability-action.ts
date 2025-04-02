"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDisabilityS } from "@/lib/schemas/user-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type discapacidadRecord = Prisma.discapacidadGetPayload<{ include: { file: true } }>;

export const getDisabilities = async (): Promise<{ success: boolean; message?: string; data?: discapacidadRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    const disabilities: discapacidadRecord[] | null = await prisma.discapacidad.findMany({ where: { user_id: user.id }, include: { file: true } });
    if (!disabilities) throw new Error("No hay discapacidades registradas.");

    return { success: true, data: disabilities };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las discapacidades";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDisability = async (id: string, data: ZDisabilityS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    await prisma.discapacidad.create({
      data: {
        user_id: id,
        tipo: data.tipo,
        discapacidad: data.discapacidad.toUpperCase(),
        entidad_certificadora: data.entidad_certificadora,
        fecha_certificacion: new Date(data.fecha_certificacion).toISOString(),
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Discapacidad registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar la discapacidad.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateDisability = async (id: string, data: ZDisabilityS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.discapacidad.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Discapacidad no encontrado");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.discapacidad.update({
      where: { id },
      data: {
        tipo: data.tipo,
        discapacidad: data.discapacidad.toUpperCase(),
        entidad_certificadora: data.entidad_certificadora,
        fecha_certificacion: new Date(data.fecha_certificacion).toISOString(),
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Discapacidad modificada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar la discapacidad.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteDisability = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.discapacidad.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Discapacidad no encontrado");

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

    await prisma.discapacidad.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Discapacidad eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la discapacidad.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
