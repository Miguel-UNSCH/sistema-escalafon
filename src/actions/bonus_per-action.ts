"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZBonusPersonal } from "@/lib/schemas/bonus-schema";
import { Prisma, User } from "@prisma/client";

export type bonusPersonalRecord = Prisma.bonus_personalGetPayload<{ include: { cargo: true; dependencia: true } }>;

export const getBonusesPer = async (): Promise<{ success: boolean; message?: string; data?: Array<bonusPersonalRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: Array<bonusPersonalRecord> | null = await prisma.bonus_personal.findMany({ where: { user_id: user.id }, include: { cargo: true, dependencia: true } });
    if (!response) throw new Error("No hay bonos personales registrados");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos personales";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getBonusPer = async (id: string): Promise<{ success: boolean; message?: string; data?: desplazamiento }> => {};

export const createBonusPer = async (data: ZBonusPersonal & { file_id: string }): Promise<{ success: boolean; message: string }> => {
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

    await prisma.bonus_personal.create({
      data: {
        tipo: data.tipo.toUpperCase(),
        resolucion_bonus: data.resolucion_bonus.toUpperCase(),
        fecha: data.fecha,
        user_id: user.id,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
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
