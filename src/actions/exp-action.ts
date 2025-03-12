"use server";

import { Prisma, User } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZExpS } from "@/lib/schemas/user-schema";

export type expRecord = Prisma.ExperienceGetPayload<{ include: { cargo: true; dependencia: true } }>;

export const getExperiences = async (): Promise<{ success: boolean; message?: string; data?: Array<expRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const experiencias: Array<expRecord> | null = await prisma.experience.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true },
    });
    if (!experiencias) throw new Error("No hay experiencias registradas");

    return { success: true, message: `Se encontraron ${experiencias.length + 1} elementos`, data: experiencias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las experiencias.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

// export const getExp = async (): Promise<{ success: boolean; message?: string; data?: Experience }> => {};

export const createExp = async (data: ZExpS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    await prisma.experience.create({
      data: {
        user_id: user.id,
        centro_labor: data.centro_labor.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
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
