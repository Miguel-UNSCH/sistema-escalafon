"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZConsS } from "@/lib/schemas/documents-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type consRecord = Prisma.constanciaGetPayload<{
  include: { file: true; ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } };
}>;

export const getCons = async (): Promise<{ success: boolean; message?: string; data?: consRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: consRecord[] | null = await prisma.constancia.findMany({
      where: { user_id: user.id },
      include: { file: true, ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!response) throw new Error("No hay constancias registradas.");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las renuncias.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createCons = async (data: ZConsS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: cargo.id,
          dependenciaId: dependencia.id,
        },
      },
    });

    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: cargoDependencia.id,
        },
      },
    });

    if (!usuarioCargoDependencia) throw new Error("El usuario no tiene asignado ese cargo en la dependencia seleccionada.");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.constancia.create({
      data: {
        user_id: user.id,
        nivel_remunerado: data.nivel_remunerado,
        pap: Number(data.pap),
        cnp: Number(data.cnp),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        ucd_id: usuarioCargoDependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Constancia creada exitosamente." };
  } catch (error: unknown) {
    let errMessage = "Error al crear la constancia.";
    if (error instanceof Error) errMessage = error.message;
    return { success: false, message: errMessage };
  }
};

export const uploadCons = async (id: string, data: ZConsS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const current_model = await prisma.constancia.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Constancia no encontrada");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: cargo.id,
          dependenciaId: dependencia.id,
        },
      },
    });

    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: cargoDependencia.id,
        },
      },
    });

    if (!usuarioCargoDependencia) throw new Error("El usuario no tiene asignado ese cargo en la dependencia seleccionada.");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({
        where: { id: current_model.file.id },
        data: { name: data.file.name, size: fileBuffer.length },
      });
    }

    await prisma.constancia.update({
      where: { id },
      data: {
        nivel_remunerado: data.nivel_remunerado,
        pap: Number(data.pap),
        cnp: Number(data.cnp),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        ucd_id: usuarioCargoDependencia.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Constancia actualizada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar la constancia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteCons = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.constancia.findUnique({ where: { id } });
    if (!current_model) throw new Error("Constancia no encontrada");

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

    await prisma.constancia.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Constancia eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la constancia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
