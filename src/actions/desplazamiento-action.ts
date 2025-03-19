"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDesplazamientoS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type desplazamientoRecord = Prisma.desplazamientoGetPayload<{
  include: { current_cargo: true; current_dependencia: true; new_cargo: true; new_dependencia: true; file: true };
}>;

export const getDesplazamientos = async (): Promise<{ success: boolean; message?: string; data?: Array<desplazamientoRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: desplazamientoRecord[] | null = await prisma.desplazamiento.findMany({
      where: { user_id: user.id },
      include: { current_cargo: true, current_dependencia: true, new_cargo: true, new_dependencia: true, file: true },
    });
    if (!response) throw new Error("No hay desplazamientos registrados.");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los desplazamientos";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDesplazamiento = async (data: ZDesplazamientoS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const current_c = await prisma.cargo.findUnique({ where: { nombre: data.current_cargo.nombre } });
    if (!current_c) throw new Error("Cargo actual no encontrado");

    const new_c = await prisma.cargo.findUnique({ where: { nombre: data.new_cargo.nombre } });
    if (!new_c) throw new Error("Nuevo cargo no encontrado");

    const current_d = await prisma.dependencia.findUnique({ where: { codigo: data.current_dependencia.codigo } });
    if (!current_d) throw new Error("Dependencia actual no encontrada");

    const new_d = await prisma.dependencia.findUnique({ where: { codigo: data.new_dependencia.codigo } });
    if (!new_d) throw new Error("Nueva dependencia no encontrada");

    const exist_file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!exist_file) throw new Error("Archivo no encontrado");

    await prisma.desplazamiento.create({
      data: {
        user_id: user.id,
        tipo_desplazamiento: data.tipo_desplazamiento,
        fecha: data.fecha,
        tipo_file: data.tipo_file.toUpperCase(),
        current_cargo_id: current_c.id,
        new_cargo_id: new_c.id,
        current_dependencia_id: current_d.id,
        new_dependencia_id: new_d.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Desplazamiento creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el desplazamiento";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateDesplazamiento = async (id: string, data: ZDesplazamientoS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.desplazamiento.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Desplazamiento no encontrado");

    const current_cargo = await prisma.cargo.findUnique({ where: { nombre: data.current_cargo.nombre } });
    if (!current_cargo) throw new Error("Cargo anterior no encontrado");

    const new_cargo = await prisma.cargo.findUnique({ where: { nombre: data.new_cargo.nombre } });
    if (!new_cargo) throw new Error("Nuevo cargo no encontrado");

    const current_dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.current_dependencia.codigo } });
    if (!current_dependencia) throw new Error("Dependencia anterior no encontrada");

    const new_dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.new_dependencia.codigo } });
    if (!new_dependencia) throw new Error("Nueva dependencia no encontrada");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.desplazamiento.update({
      where: { id },
      data: {
        tipo_desplazamiento: data.tipo_desplazamiento,
        fecha: data.fecha,
        tipo_file: data.tipo_file.toUpperCase(),
        current_cargo_id: current_cargo.id,
        new_cargo_id: new_cargo.id,
        current_dependencia_id: current_dependencia.id,
        new_dependencia_id: new_dependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Desplazamiento modificado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar el desplazamiento";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteDesplazamiento = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.desplazamiento.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Desplazamiento no encontrado");

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

    await prisma.desplazamiento.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Desplazamiento eliminado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el desplaazamiento";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
