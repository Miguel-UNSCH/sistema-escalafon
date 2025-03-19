"use server";

import { Prisma, User } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZExpS } from "@/lib/schemas/user-schema";
import fs from "fs/promises";
import path from "path";

export type expRecord = Prisma.ExperienceGetPayload<{ include: { cargo: true; dependencia: true; file: true } }>;

export const getExperiences = async (): Promise<{ success: boolean; message?: string; data?: Array<expRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const experiencias: Array<expRecord> | null = await prisma.experience.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true, file: true },
    });
    if (!experiencias) throw new Error("No hay experiencias registradas");

    return { success: true, message: `Se encontraron ${experiencias.length + 1} elementos`, data: experiencias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las experiencias.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const createExp = async (data: ZExpS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    await prisma.experience.create({
      data: {
        user_id: user.id,
        centro_labor: data.centro_labor.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
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

export const updateExp = async (id: string, data: ZExpS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.experience.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Experiencia no encontrada");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

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
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Experiencia modificada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
export const deleteExp = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.experience.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Experiencia no encontrado");

    const current_file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!current_file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), current_file.path, `${current_file.id}${current_file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      console.warn("Advertencia: No se pudo eliminar el archivo físico:", err);
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
