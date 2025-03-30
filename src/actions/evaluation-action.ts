"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZEvaluation } from "@/lib/schemas/bonus-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { checkEditable } from "./limit-time";

export type evaluationRecord = Prisma.evaluationGetPayload<{
  include: {
    file: true;
    evaluado_ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
    evaluador_ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
    evaluador: true;
  };
}>;

export const getEvaluations = async (): Promise<{ success: boolean; message?: string; data?: evaluationRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: evaluationRecord[] | null = await prisma.evaluation.findMany({
      where: { evaluado_id: user.id },
      include: {
        file: true,
        evaluado_ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
        evaluador_ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
        evaluador: true,
      },
    });
    if (!response) throw new Error("No hay evaluaciones registradas.");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createEvaluation = async (data: ZEvaluation & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");
    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");
    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");
    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    const ev_cargo = await prisma.cargo.findUnique({ where: { id: Number(data.ev_cargo_id) } });
    if (!ev_cargo) throw new Error("Cargo del evaluador no encontrado");
    const ev_dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.ev_dependencia_id) } });
    if (!ev_dependencia) throw new Error("Dependencia del evaluador no encontrada");
    const ev_cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: ev_cargo.id, dependenciaId: ev_dependencia.id } },
    });
    if (!ev_cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia del evaluador.");
    const ev_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: data.evaluador.id, cargoDependenciaId: ev_cargoDependencia.id } },
    });
    if (!ev_usuarioCargoDependencia) throw new Error("No existe la relación entre el evaluador y el cargo-dependencia seleccionado.");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.evaluation.create({
      data: {
        etapa: Number(data.etapa),
        fecha: new Date(data.fecha).toISOString(),
        evaluado_id: user.id,
        evaluado_ucd_id: usuarioCargoDependencia.id,
        evaluador_id: data.evaluador.id,
        evaluador_ucd_id: ev_usuarioCargoDependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Evaluacion creada exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateEvaliation = async (id: string, data: ZEvaluation & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.evaluation.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Evaluacion no encontrada");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");
    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");
    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");
    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    const ev_cargo = await prisma.cargo.findUnique({ where: { id: Number(data.ev_cargo_id) } });
    if (!ev_cargo) throw new Error("Cargo del evaluador no encontrado");
    const ev_dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.ev_dependencia_id) } });
    if (!ev_dependencia) throw new Error("Dependencia del evaluador no encontrada");
    const ev_cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: ev_cargo.id, dependenciaId: ev_dependencia.id } },
    });
    if (!ev_cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia del evaluador.");
    const ev_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: data.evaluador.id, cargoDependenciaId: ev_cargoDependencia.id } },
    });
    if (!ev_usuarioCargoDependencia) throw new Error("No existe la relación entre el evaluador y el cargo-dependencia seleccionado.");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);

      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.evaluation.update({
      where: { id },
      data: {
        etapa: Number(data.etapa),
        fecha: data.fecha,
        evaluado_id: user.id,
        evaluado_ucd_id: usuarioCargoDependencia.id,
        evaluador_id: data.evaluador.id,
        evaluador_ucd_id: ev_usuarioCargoDependencia.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Actualizacion exitosa." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteEvaluation = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.evaluation.findUnique({ where: { id } });
    if (!current_model) throw new Error("Evaluacion no encontrada");

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

    await prisma.evaluation.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Evaluacion eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la evaluacion.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
