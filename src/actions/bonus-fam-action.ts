"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZBonusFamiliar } from "@/lib/schemas/bonus-schema";
import { Prisma, User } from "@prisma/client";

export type bonusFamiliarRecord = Prisma.bonus_familyGetPayload<{ include: { cargo: true; dependencia: true } }>;

export const getBonusesFam = async (): Promise<{ success: boolean; message?: string; data?: Array<bonusFamiliarRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: Array<bonusFamiliarRecord> | null = await prisma.bonus_family.findMany({ where: { user_id: user.id }, include: { cargo: true, dependencia: true } });
    if (!response) throw new Error("No hay bonos familiares registrados");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getBonusFam = async (id: string): Promise<{ success: boolean; message?: string; data?: bonus_family }> => {};

export const createBonusFam = async (data: ZBonusFamiliar & { file_id: string }): Promise<{ success: boolean; message: string }> => {
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

    await prisma.bonus_family.create({
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
