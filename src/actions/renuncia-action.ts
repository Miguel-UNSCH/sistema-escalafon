"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZRenunciaS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type renunciaRecord = Prisma.renunciaGetPayload<{ include: { cargo: true; dependencia: true; file: true } }>;

export const getRenuncias = async (): Promise<{ success: boolean; message?: string; data?: renunciaRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const renuncias: renunciaRecord[] | null = await prisma.renuncia.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true, file: true },
    });
    if (!renuncias) throw new Error("No hay renuncias registradas.");

    return { success: true, data: renuncias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las renuncias.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createRenuncia = async (data: ZRenunciaS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
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

    await prisma.renuncia.create({
      data: {
        user_id: user.id,
        motivo: data.motivo.toUpperCase(),
        fecha: new Date(data.fecha).toISOString(),
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Renuncia registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el estudio.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateRenuncia = async (id: string, data: ZRenunciaS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_renuncia = await prisma.renuncia.findUnique({ where: { id }, include: { file: true } });
    if (!current_renuncia) throw new Error("Renuncia no encontrada");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_renuncia.file.path, `${current_renuncia.file.id}${current_renuncia.file.extension}`);

      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_renuncia.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.renuncia.update({
      where: { id },
      data: {
        motivo: data.motivo.toUpperCase(),
        fecha: data.fecha,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
      },
    });

    return { success: true, message: "Renuncia actualizada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el estudio.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteRenuncia = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_renuncia = await prisma.renuncia.findUnique({ where: { id } });
    if (!current_renuncia) throw new Error("Renuncia no encontrada");

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

    await prisma.renuncia.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Renuncia eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la renuncia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
