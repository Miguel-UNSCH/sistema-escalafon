"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZRenunciaS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type renunciaRecord = Prisma.renunciaGetPayload<{
  include: { file: true; usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } };
}>;

export const getRenuncias = async (id: string): Promise<{ success: boolean; message?: string; data?: renunciaRecord[] }> => {
  try {
    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const renuncias: renunciaRecord[] | null = await prisma.renuncia.findMany({
      where: { user_id: user.id },
      include: { file: true, usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!renuncias) throw new Error("No hay renuncias registradas.");

    return { success: true, data: renuncias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las renuncias.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createRenuncia = async (id: string, data: ZRenunciaS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } } });

    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: currentUser.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    await prisma.renuncia.create({
      data: {
        user_id: currentUser.id,
        motivo: data.motivo.toUpperCase(),
        fecha: new Date(data.fecha).toISOString(),
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
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

export const updateRenuncia = async (id: string, user_id: string, data: ZRenunciaS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentUser = await prisma.user.findUnique({ where: { id: user_id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const current_renuncia = await prisma.renuncia.findUnique({ where: { id }, include: { file: true } });
    if (!current_renuncia) throw new Error("Renuncia no encontrada");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id },
      },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: { userId: currentUser.id, cargoDependenciaId: cargoDependencia.id },
      },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_renuncia.file.path, `${current_renuncia.file.id}${current_renuncia.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({
        where: { id: current_renuncia.file.id },
        data: { name: data.file.name, size: fileBuffer.length },
      });
    }

    await prisma.renuncia.update({
      where: { id },
      data: {
        motivo: data.motivo.toUpperCase(),
        fecha: data.fecha,
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Renuncia actualizada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar la renuncia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteRenuncia = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_renuncia = await prisma.renuncia.findUnique({ where: { id } });
    if (!current_renuncia) throw new Error("Renuncia no encontrada");

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

    await prisma.renuncia.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Renuncia eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la renuncia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
