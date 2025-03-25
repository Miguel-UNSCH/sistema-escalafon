"use server";

import { Prisma, User } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZExpS } from "@/lib/schemas/user-schema";
import fs from "fs/promises";
import path from "path";
import { isUCDInUse } from "@/lib/db-utils";

export type expRecord = Prisma.ExperienceGetPayload<{
  include: { file: true; usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } };
}>;

export const getExperiences = async (): Promise<{ success: boolean; message?: string; data?: expRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const experiencias: expRecord[] | null = await prisma.experience.findMany({
      where: { user_id: user.id },
      include: { file: true, usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!experiencias) throw new Error("No hay experiencias registradas");

    return { success: true, data: experiencias };
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

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } } });

    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    let usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id } },
    });

    if (!usuarioCargoDependencia) {
      usuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({ data: { userId: user.id, cargoDependenciaId: cargoDependencia.id } });
    }

    await prisma.experience.create({
      data: {
        user_id: user.id,
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
        centro_labor: data.centro_labor.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
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

export const updateExp = async (id: string, data: ZExpS & { file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const current_model = await prisma.experience.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Experiencia no encontrada");

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

    let usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id },
      },
    });
    if (!usuarioCargoDependencia) {
      usuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({
        data: { userId: user.id, cargoDependenciaId: cargoDependencia.id },
      });
    }

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    const previousUCDId = current_model.usuarioCargoDependenciaId;

    await prisma.experience.update({
      where: { id },
      data: {
        user_id: user.id,
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
        centro_labor: data.centro_labor.toUpperCase(),
        periodo: {
          from: new Date(data.periodo.from).toISOString(),
          to: new Date(data.periodo.to).toISOString(),
        },
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    if (previousUCDId !== usuarioCargoDependencia.id) {
      const stillInUse = await isUCDInUse(previousUCDId);
      if (!stillInUse) await prisma.usuarioCargoDependencia.delete({ where: { id: previousUCDId } });
    }

    return { success: true, message: "Experiencia actualizada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar la experiencia.";
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
      // eslint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
      // eslint-disable-next-line no-unused-vars
    } catch (e: unknown) {
      throw new Error("No se pudo eliminar el archivo físico.");
    }

    const usuarioCargoDependenciaId = current_model.usuarioCargoDependenciaId;

    await prisma.experience.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    const stillInUse = await isUCDInUse(usuarioCargoDependenciaId);
    if (!stillInUse) await prisma.usuarioCargoDependencia.delete({ where: { id: usuarioCargoDependenciaId } });

    return { success: true, message: "Experiencia eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la experiencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
