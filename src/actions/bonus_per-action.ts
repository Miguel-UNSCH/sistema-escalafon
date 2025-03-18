"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZBonusPersonal } from "@/lib/schemas/bonus-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type bonusPersonalRecord = Prisma.bonus_personalGetPayload<{ include: { cargo: true; dependencia: true; file: true } }>;

export const getBonusesPer = async (): Promise<{ success: boolean; message?: string; data?: Array<bonusPersonalRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: bonusPersonalRecord[] | null = await prisma.bonus_personal.findMany({ where: { user_id: user.id }, include: { cargo: true, dependencia: true, file: true } });
    if (!response) throw new Error("No hay bonos personales registrados");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos personales";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createBonusPer = async (data: ZBonusPersonal & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.bonus_personal.create({
      data: {
        tipo: data.tipo.toUpperCase(),
        resolucion_bonus: data.resolucion_bonus.toUpperCase(),
        fecha: data.fecha,
        user_id: user.id,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Bono personal creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateBonusPer = async (id: string, data: ZBonusPersonal & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.bonus_personal.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Bono personal no encontrado");

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

    await prisma.bonus_personal.update({
      where: { id },
      data: {
        tipo: data.tipo.toUpperCase(),
        resolucion_bonus: data.resolucion_bonus.toUpperCase(),
        fecha: data.fecha,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
      },
    });

    return { success: true, message: "Actualización exitosa." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteBonusPer = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.bonus_personal.findUnique({ where: { id } });
    if (!current_model) throw new Error("Bono personal no encontrado");

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

    await prisma.bonus_personal.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Bono personal eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el bono personal.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
