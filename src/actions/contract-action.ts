"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZContratoS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type contractRecord = Prisma.ContratoGetPayload<{
  include: {
    file: true;
    ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
  };
}>;

export const getContracts = async (id: string): Promise<{ success: boolean; message?: string; data?: contractRecord[] }> => {
  try {
    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const contracts: contractRecord[] | null = await prisma.contrato.findMany({
      where: { user_id: user.id },
      include: {
        file: true,
        ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
      },
    });
    if (!contracts) throw new Error("No hay contratos registrados");

    return { success: true, data: contracts };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los contratos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createContract = async (id: string, data: ZContratoS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const existFile = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!existFile) throw new Error("Archivo no encontrado, necesita subir el documento de sustento.");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } } });

    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    let usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: currentUser.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia)
      usuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({ data: { userId: currentUser.id, cargoDependenciaId: cargoDependencia.id } });

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.contrato.create({
      data: {
        user_id: currentUser.id,
        tipo_contrato: data.tipo_contrato,
        condicion_laboral: data.condicion_laboral,
        regimen_laboral: data.regimen_laboral || null,
        resolucion_contrato: data.resolucion_contrato?.toUpperCase() || null,
        nivel_remuneracion: data.nivel_remuneracion?.toUpperCase() || null,
        pap: Number(data.pap) || null,
        cnp: Number(data.cnp) || null,
        meta: data.meta?.toUpperCase() || null,
        obra: data.obra?.toUpperCase() || null,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        ucd_id: usuarioCargoDependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Contrato creado exito en la base de datos." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el contrato.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateContract = async (id: string, user_id: string, data: ZContratoS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
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

    const current_model = await prisma.contrato.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Contrato no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } } });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    let usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: currentUser.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) {
      usuarioCargoDependencia = await prisma.usuarioCargoDependencia.create({ data: { userId: currentUser.id, cargoDependenciaId: cargoDependencia.id } });
    }

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    const dataUpdate: any = {
      tipo_contrato: data.tipo_contrato,
      condicion_laboral: data.condicion_laboral,
      regimen_laboral: ["cas", "dl_276", "pro_inv"].includes(data.tipo_contrato) ? data.regimen_laboral : null,
      resolucion_contrato: data.resolucion_contrato?.toUpperCase() || null,
      nivel_remuneracion: data.tipo_contrato === "dl_276" ? data.nivel_remuneracion?.toUpperCase() || null : null,
      pap: data.tipo_contrato === "dl_276" ? Number(data.pap) || null : null,
      cnp: data.tipo_contrato === "dl_276" ? Number(data.cnp) || null : null,
      meta: data.tipo_contrato === "pro_inv" ? data.meta?.toUpperCase() || null : null,
      obra: data.tipo_contrato === "pro_inv" ? data.obra?.toUpperCase() || null : null,
      periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
      ucd_id: usuarioCargoDependencia.id,
    };

    await prisma.contrato.update({ where: { id }, data: dataUpdate });

    return { success: true, message: "Contrato modificado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar el contrato.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteContract = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.contrato.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Contrato no encontrado");

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

    await prisma.contrato.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Contrato eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el contrato.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
