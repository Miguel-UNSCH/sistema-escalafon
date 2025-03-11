"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZEstudioS } from "@/lib/schemas/user-schema";
import { FormacionAcademica, User } from "@prisma/client";

export const getStudies = async (): Promise<{ success: boolean; message?: string; data?: FormacionAcademica[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const studies: FormacionAcademica[] | null = await prisma.formacionAcademica.findMany({ where: { user_id: user.id } });
    if (!studies) throw new Error("No hay estudios registrados.");

    return { success: true, message: `Se encontraron ${studies.length + 1} elementos`, data: studies };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los estudios.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

// export const getStudy = async (id: string): Promise<{ success: boolean; message?: string; data?: FormacionAcademica }> => {};

export const createStudy = async (data: ZEstudioS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    await prisma.formacionAcademica.create({
      data: {
        user_id: user.id,
        nivel: data.nivel,
        institucion: data.institucion.toUpperCase(),
        carrera: data.carrera?.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Estudio registrado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el estudio.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
