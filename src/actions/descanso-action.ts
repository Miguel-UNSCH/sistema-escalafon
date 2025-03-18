"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDesMedS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type descanso_medicoRecord = Prisma.descanso_medicoGetPayload<{ include: { cargo: true; dependencia: true; file: true } }>;

export const getDescansos = async (): Promise<{ success: boolean; message?: string; data?: descanso_medicoRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: descanso_medicoRecord[] | null = await prisma.descanso_medico.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true, file: true },
    });
    if (!response) throw new Error("No hay descanso medicos disponibles");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los descansos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDesanso = async (data: ZDesMedS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
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

    await prisma.descanso_medico.create({
      data: {
        user_id: user.id,
        tipo_descanso: data.tipo_descanso,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        file_id: file.id,
      },
    });

    return { success: true, message: "Descanso medico creado correctamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el descanso medico.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateDescanso = async (id: string, data: ZDesMedS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_descanso = await prisma.descanso_medico.findUnique({ where: { id }, include: { file: true } });
    if (!current_descanso) throw new Error("Descanso no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_descanso.file.path, `${current_descanso.file.id}${current_descanso.file.extension}`);

      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_descanso.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.descanso_medico.update({
      where: { id },
      data: {
        tipo_descanso: data.tipo_descanso,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
      },
    });

    return { success: true, message: "Descanso medico actualizado correctamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar la Renucnia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteDescanso = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_descanso = await prisma.descanso_medico.findUnique({ where: { id } });
    if (!current_descanso) throw new Error("Descanso no encontrada");

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

    return { success: true, message: "Descanso eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la descanso.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
