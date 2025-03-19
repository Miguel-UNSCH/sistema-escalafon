"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZContratoS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type contractRecord = Prisma.ContratoGetPayload<{ include: { cargo: true; dependencia: true; file: true } }>;

export const getContracts = async (): Promise<{ success: boolean; message?: string; data?: contractRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const contracts: contractRecord[] | null = await prisma.contrato.findMany({ where: { user_id: user.id }, include: { cargo: true, dependencia: true, file: true } });
    if (!contracts) throw new Error("No hay contratos registrados");

    return { success: true, data: contracts };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los contratos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createContract = async (data: ZContratoS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    await prisma.contrato.create({
      data: {
        user_id: user.id,
        tipo_contrato: data.tipo_contrato,
        condicion_laboral: data.condicion_laboral,
        resolucion_contrato: data.resolucion_contrato?.toUpperCase() || null,
        regimen_laboral: data.regimen_laboral,
        nivel_remuneracion: data.nivel_remuneracion?.toUpperCase() || null,
        pap: data.pap || null,
        cnp: data.cnp || null,
        meta: data.meta?.toUpperCase() || null,
        convenio: data.convenio?.toUpperCase() || null,
        fecha_ingreso: new Date(data.fecha_ingreso).toISOString(),
        fecha_cese: data.fecha_cese ? new Date(data.fecha_cese).toISOString() : null,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
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

export const updateContract = async (id: string, data: ZContratoS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.contrato.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Contrato no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.contrato.update({
      where: { id },
      data: {
        tipo_contrato: data.tipo_contrato,
        condicion_laboral: data.condicion_laboral,
        resolucion_contrato: data.resolucion_contrato?.toUpperCase() || null,
        regimen_laboral: data.regimen_laboral,
        nivel_remuneracion: data.nivel_remuneracion?.toUpperCase() || null,
        pap: data.pap || null,
        cnp: data.cnp || null,
        meta: data.meta?.toUpperCase() || null,
        convenio: data.convenio?.toUpperCase() || null,
        fecha_ingreso: new Date(data.fecha_ingreso).toISOString(),
        fecha_cese: data.fecha_cese ? new Date(data.fecha_cese).toISOString() : null,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Contrato modificado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar el contrato.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteContract = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.contrato.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Contrato no encontrado");

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

    await prisma.contrato.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Contrato eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el contrato.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
