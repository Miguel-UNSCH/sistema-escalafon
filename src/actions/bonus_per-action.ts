"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZBonusPersonal } from "@/lib/schemas/bonus-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type bonusPersonalRecord = Prisma.bonus_personalGetPayload<{
  include: { file: true; usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } };
}>;

export const getBonusesPer = async (): Promise<{ success: boolean; message?: string; data?: Array<bonusPersonalRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: bonusPersonalRecord[] | null = await prisma.bonus_personal.findMany({
      where: { user_id: user.id },
      include: { file: true, usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
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

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    await prisma.bonus_personal.create({
      data: {
        tipo: data.tipo.toUpperCase(),
        resolucion_bonus: data.resolucion_bonus.toUpperCase(),
        fecha: new Date(data.fecha).toISOString(),
        user_id: user.id,
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
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

export const updateBonusPer = async (id: string, data: ZBonusPersonal & { file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const bonusPersonal = await prisma.bonus_personal.findUnique({ where: { id }, include: { file: true } });
    if (!bonusPersonal) throw new Error("Bono personal no encontrado");

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
        userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id },
      },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), bonusPersonal.file.path, `${bonusPersonal.file.id}${bonusPersonal.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({
        where: { id: bonusPersonal.file.id },
        data: { name: data.file.name, size: fileBuffer.length },
      });
    }

    await prisma.bonus_personal.update({
      where: { id },
      data: {
        tipo: data.tipo.toUpperCase(),
        resolucion_bonus: data.resolucion_bonus.toUpperCase(),
        fecha: data.fecha,
        usuarioCargoDependenciaId: usuarioCargoDependencia?.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Bono personal actualizado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar el bono personal";
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
      // eslint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      // eslint-disable-next-line no-console
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
