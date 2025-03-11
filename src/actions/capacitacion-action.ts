"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZCapacitacionS } from "@/lib/schemas/user-schema";
import { Capacitacion, User } from "@prisma/client";

export const getCapacitaciones = async (): Promise<{ success: boolean; message?: string; data?: Capacitacion[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const capacitacion: Capacitacion[] | null = await prisma.capacitacion.findMany({ where: { user_id: user.id } });
    if (!capacitacion) throw new Error("No hay capacitaciones registradas.");

    return { success: true, message: `Se encontraron ${capacitacion.length + 1} elementos`, data: capacitacion };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las capacitaciones.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

// export const getCapactacion = async (id: string): Promise<{ success: boolean; message?: string; data?: Capacitacion }> => {};

export const createCapacitacion = async (data: ZCapacitacionS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    await prisma.capacitacion.create({
      data: {
        user_id: user.id,
        centro_capacitacion: data.centro_capacitacion.toUpperCase(),
        materia: data.materia.toUpperCase(),
        especialidad: data.especialidad?.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        horas_lectivas: data.horas_lectivas,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Capacitación registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar la capacitación.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
