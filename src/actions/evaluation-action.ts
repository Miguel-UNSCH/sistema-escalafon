"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZEvaluation } from "@/lib/schemas/bonus-schema";
import { Prisma, User } from "@prisma/client";

export type evaluationRecord = Prisma.evaluationGetPayload<{ include: { cargo: true; dependencia: true } }>;

export const getEvaluations = async (): Promise<{ success: boolean; message?: string; data?: Array<evaluationRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: Array<evaluationRecord> | null = await prisma.evaluation.findMany({ where: { user_id: user.id }, include: { cargo: true, dependencia: true } });
    if (!response) throw new Error("No haye evaluaciones registradas.");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getEvaluation = async (id: string): Promise<{ success: boolean; message?: string; data?: evaluation }> => {};

export const createEvaluation = async (data: ZEvaluation & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.evaluation.create({
      data: {
        puntuacion: data.puntuacion,
        fecha: data.fecha,
        user_id: user.id,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
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
