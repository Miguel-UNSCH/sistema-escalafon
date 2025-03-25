"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { isUCDInUse } from "@/lib/db-utils";
import { ZDesplazamientoS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type desplazamientoRecord = Prisma.desplazamientoGetPayload<{
  include: {
    file: true;
    currentUCD: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
    newUCD: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
  };
}>;

export const getDesplazamientos = async (): Promise<{ success: boolean; message?: string; data?: Array<desplazamientoRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: desplazamientoRecord[] | null = await prisma.desplazamiento.findMany({
      where: { user_id: user.id },
      include: {
        file: true,
        currentUCD: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
        newUCD: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
      },
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

    const user: User | null = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) throw new Error("Usuario no encontrado");

    const currentCargo = await prisma.cargo.findUnique({
      where: { id: Number(data.current_cargo_id) },
    });
    if (!currentCargo) throw new Error("Cargo actual no encontrado");

    const currentDependencia = await prisma.dependencia.findUnique({
      where: { id: Number(data.current_dependencia_id) },
    });
    if (!currentDependencia) throw new Error("Dependencia actual no encontrada");

    const currentCargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: currentCargo.id,
          dependenciaId: currentDependencia.id,
        },
      },
    });
    if (!currentCargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia actuales");

    let currentUCD = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: currentCargoDependencia.id,
        },
      },
    });
    if (!currentUCD) {
      currentUCD = await prisma.usuarioCargoDependencia.create({
        data: {
          userId: user.id,
          cargoDependenciaId: currentCargoDependencia.id,
        },
      });
    }

    const newCargo = await prisma.cargo.findUnique({
      where: { id: Number(data.new_cargo_id) },
    });
    if (!newCargo) throw new Error("Nuevo cargo no encontrado");

    const newDependencia = await prisma.dependencia.findUnique({
      where: { id: Number(data.new_dependencia_id) },
    });
    if (!newDependencia) throw new Error("Nueva dependencia no encontrada");

    const newCargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: newCargo.id,
          dependenciaId: newDependencia.id,
        },
      },
    });
    if (!newCargoDependencia) throw new Error("No existe la relación entre el nuevo cargo y la nueva dependencia");

    let newUCD = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: newCargoDependencia.id,
        },
      },
    });
    if (!newUCD) {
      newUCD = await prisma.usuarioCargoDependencia.create({
        data: {
          userId: user.id,
          cargoDependenciaId: newCargoDependencia.id,
        },
      });
    }

    const exist_file = await prisma.file.findUnique({
      where: { id: data.file_id },
    });
    if (!exist_file) throw new Error("Archivo no encontrado");

    await prisma.desplazamiento.create({
      data: {
        user_id: user.id,
        tipo_desplazamiento: data.tipo_desplazamiento,
        fecha: new Date(data.fecha).toISOString(),
        tipo_file: data.tipo_file.toUpperCase(),
        currentUCDId: currentUCD.id,
        newUCDId: newUCD.id,
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
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) throw new Error("Usuario no encontrado");

    const current_model = await prisma.desplazamiento.findUnique({
      where: { id },
      include: { file: true },
    });
    if (!current_model) throw new Error("Desplazamiento no encontrado");

    const currentCargo = await prisma.cargo.findUnique({
      where: { id: Number(data.current_cargo_id) },
    });
    if (!currentCargo) throw new Error("Cargo actual no encontrado");

    const currentDependencia = await prisma.dependencia.findUnique({
      where: { id: Number(data.current_dependencia_id) },
    });
    if (!currentDependencia) throw new Error("Dependencia actual no encontrada");

    const currentCargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: currentCargo.id,
          dependenciaId: currentDependencia.id,
        },
      },
    });
    if (!currentCargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia actuales");

    // Buscar o crear el registro en UsuarioCargoDependencia para la situación actual
    let currentUCD = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: currentCargoDependencia.id,
        },
      },
    });
    if (!currentUCD) {
      currentUCD = await prisma.usuarioCargoDependencia.create({
        data: {
          userId: user.id,
          cargoDependenciaId: currentCargoDependencia.id,
        },
      });
    }

    const newCargo = await prisma.cargo.findUnique({
      where: { id: Number(data.new_cargo_id) },
    });
    if (!newCargo) throw new Error("Nuevo cargo no encontrado");

    const newDependencia = await prisma.dependencia.findUnique({
      where: { id: Number(data.new_dependencia_id) },
    });
    if (!newDependencia) throw new Error("Nueva dependencia no encontrada");

    // Buscar la relación en cargoDependencia para el nuevo cargo y dependencia
    const newCargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: newCargo.id,
          dependenciaId: newDependencia.id,
        },
      },
    });
    if (!newCargoDependencia) throw new Error("No existe la relación entre el nuevo cargo y la nueva dependencia");

    // Buscar o crear el registro en UsuarioCargoDependencia para la situación nueva
    let newUCD = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: newCargoDependencia.id,
        },
      },
    });
    if (!newUCD) {
      newUCD = await prisma.usuarioCargoDependencia.create({
        data: {
          userId: user.id,
          cargoDependenciaId: newCargoDependencia.id,
        },
      });
    }

    // Actualizar el archivo si se proporciona uno nuevo
    if (data.file && current_model.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({
        where: { id: current_model.file.id },
        data: { name: data.file.name, size: fileBuffer.length },
      });
    }

    // Actualizar el registro de desplazamiento utilizando currentUCD.id y newUCD.id
    await prisma.desplazamiento.update({
      where: { id },
      data: {
        tipo_desplazamiento: data.tipo_desplazamiento,
        fecha: new Date(data.fecha).toISOString(),
        tipo_file: data.tipo_file.toUpperCase(),
        currentUCDId: currentUCD.id,
        newUCDId: newUCD.id,
        ...(data.file_id && { file_id: data.file_id }),
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
      // eslint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Advertencia: No se pudo eliminar el archivo físico:", err);
    }

    const current_ucd = current_model.currentUCDId;
    const new_ucd = current_model.newUCDId;

    await prisma.desplazamiento.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    const current_stillInUse = await isUCDInUse(current_ucd);
    if (!current_stillInUse) await prisma.usuarioCargoDependencia.delete({ where: { id: current_ucd } });

    const new_stillInUse = await isUCDInUse(new_ucd);
    if (!new_stillInUse) await prisma.usuarioCargoDependencia.delete({ where: { id: new_ucd } });

    return { success: true, message: "Desplazamiento eliminado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el desplaazamiento";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
