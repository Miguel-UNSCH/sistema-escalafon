"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDemerito, ZMerito } from "@/lib/schemas/m-d-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type meritoRecord = Prisma.meritoGetPayload<{
  include: { file: true; usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } };
}>;
export type demeritoRecord = Prisma.demeritoGetPayload<{
  include: { file: true; usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } };
}>;

export const getMeritos = async (): Promise<{ success: boolean; message?: string; data?: Array<meritoRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: meritoRecord[] | null = await prisma.merito.findMany({
      where: { user_id: user.id },
      include: { file: true, usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!response) throw new Error("No haye meritos registradas.");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getDemeritos = async (): Promise<{ success: boolean; message?: string; data?: Array<demeritoRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");
    if (session?.user?.role !== "admin") throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: demeritoRecord[] | null = await prisma.demerito.findMany({
      include: { file: true, usuarioCargoDependencia: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!response) throw new Error("No hay demeritos registradas.");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createMerito = async (data: ZMerito & { file_id: string }): Promise<{ success: boolean; message: string }> => {
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

    await prisma.merito.create({
      data: {
        fecha: new Date(data.fecha).toISOString(),
        user_id: user.id,
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Merito creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDemerito = async (data: ZDemerito & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");
    if (session?.user?.role !== "admin") throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { dni: data.user.dni } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.demerito.create({
      data: {
        tipo_sancion: data.tipo_sancion,
        fecha: data.fecha,
        user_id: user.id,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Demerito creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateMerito = async (id: string, data: ZMerito & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const currentMerito = await prisma.merito.findUnique({ where: { id }, include: { file: true } });
    if (!currentMerito || !currentMerito.file) throw new Error("Mérito o archivo no encontrado");

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
      const filePath = path.resolve(process.cwd(), currentMerito.file.path, `${currentMerito.file.id}${currentMerito.file.extension}`);

      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: currentMerito.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.merito.update({ where: { id }, data: { fecha: data.fecha, ...(data.file_id && { file_id: data.file_id }) } });

    return { success: true, message: "Mérito actualizado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar el mérito";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteMerito = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_merito = await prisma.merito.findUnique({ where: { id } });
    if (!current_merito) throw new Error("Mérito no encontrado");

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

    await prisma.merito.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Mérito y archivo eliminados exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el mérito";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
