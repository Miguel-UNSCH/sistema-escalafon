"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { isUCDInUse } from "@/lib/db-utils";
import { ZAscensoS } from "@/lib/schemas/w-situation-schema";
import { Prisma } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type ascensoRecord = Prisma.ascensoGetPayload<{
  include: {
    file: true;
    currentUCD: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
    newUCD: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
  };
}>;
export const getAscensos = async (id: string): Promise<{ success: boolean; message?: string; data?: ascensoRecord[] }> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: ascensoRecord[] | null = await prisma.ascenso.findMany({
      where: { user_id: user.id },
      include: {
        file: true,
        currentUCD: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
        newUCD: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
      },
    });
    if (!response) throw new Error("No hay ascensos registrados");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los ascensos";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createAscenso = async (id: string, data: ZAscensoS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_c = await prisma.cargo.findUnique({ where: { id: Number(data.current_cargo_id) } });
    if (!current_c) throw new Error("Cargo actual no encontrado");
    const current_d = await prisma.dependencia.findUnique({ where: { id: Number(data.current_dependencia_id) } });
    if (!current_d) throw new Error("Dependencia actual no encontrada");
    const c_cargoDependencia = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: current_c.id, dependenciaId: current_d.id } } });
    if (!c_cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");
    let c_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: c_cargoDependencia.id } },
    });
    if (!c_usuarioCargoDependencia) {
      c_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({ data: { userId: user.id, cargoDependenciaId: c_cargoDependencia.id } });
    }
    const new_c = await prisma.cargo.findUnique({ where: { id: Number(data.new_cargo_id) } });
    if (!new_c) throw new Error("Nuevo cargo no encontrado");
    const new_d = await prisma.dependencia.findUnique({ where: { id: Number(data.new_dependencia_id) } });
    if (!new_d) throw new Error("Nueva dependencia no encontrada");
    const n_cargoDependencia = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: current_c.id, dependenciaId: current_d.id } } });
    if (!n_cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");
    let n_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: n_cargoDependencia.id } },
    });
    if (!n_usuarioCargoDependencia) {
      n_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({ data: { userId: user.id, cargoDependenciaId: n_cargoDependencia.id } });
    }

    const exist_file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!exist_file) throw new Error("Archivo no encontrado");

    await prisma.ascenso.create({
      data: {
        user_id: user.id,
        resolucion_ascenso: data.resolucion_ascenso.toUpperCase(),
        nivel_remunerativo: data.nivel_remunerativo.toUpperCase(),
        fecha: new Date(data.fecha).toISOString(),
        cnp: Number(data.cnp),
        currentUCDId: c_usuarioCargoDependencia.id,
        newUCDId: n_usuarioCargoDependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Ascenso creado con éxito" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el ascenso";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateAscenso = async (id: string, user_id: string, data: ZAscensoS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) throw new Error("Usuario no encontrado");

    const currentAscenso = await prisma.ascenso.findUnique({
      where: { id },
      include: { file: true },
    });
    if (!currentAscenso) throw new Error("Ascenso no encontrado");

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
    if (!currentCargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia actual seleccionada");

    let currentUsuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: currentCargoDependencia.id,
        },
      },
    });
    if (!currentUsuarioCargoDependencia) {
      currentUsuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({
        data: { userId: user.id, cargoDependenciaId: currentCargoDependencia.id },
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
    if (!newCargoDependencia) throw new Error("No existe la relación entre el nuevo cargo y la nueva dependencia seleccionada");

    let newUsuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: newCargoDependencia.id,
        },
      },
    });
    if (!newUsuarioCargoDependencia) {
      newUsuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({
        data: { userId: user.id, cargoDependenciaId: newCargoDependencia.id },
      });
    }

    if (data.file && currentAscenso.file) {
      const filePath = path.resolve(process.cwd(), currentAscenso.file.path, `${currentAscenso.file.id}${currentAscenso.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);
      await prisma.file.update({
        where: { id: currentAscenso.file.id },
        data: { name: data.file.name, size: fileBuffer.length },
      });
    }

    await prisma.ascenso.update({
      where: { id },
      data: {
        resolucion_ascenso: data.resolucion_ascenso.toUpperCase(),
        nivel_remunerativo: data.nivel_remunerativo.toUpperCase(),
        fecha: data.fecha,
        cnp: Number(data.cnp),
        currentUCDId: currentUsuarioCargoDependencia.id,
        newUCDId: newUsuarioCargoDependencia.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Actualización exitosa." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar el ascenso";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteAscenso = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.ascenso.findUnique({ where: { id } });
    if (!current_model) throw new Error("Ascenso no encontrado");

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

    const current_ucd = current_model.currentUCDId;
    const new_ucd = current_model.newUCDId;

    await prisma.ascenso.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    const current_stillInUse = await isUCDInUse(current_ucd);
    if (!current_stillInUse) await prisma.usuarioCargoDependencia.delete({ where: { id: current_ucd } });

    const new_stillInUse = await isUCDInUse(new_ucd);
    if (!new_stillInUse) await prisma.usuarioCargoDependencia.delete({ where: { id: new_ucd } });

    return { success: true, message: "Ascenso eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el ascenso";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
