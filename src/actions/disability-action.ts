"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDisabilityS } from "@/lib/schemas/user-schema";
import { discapacidad, User } from "@prisma/client";

export const getDisabilities = async (): Promise<{ success: boolean; message?: string; data?: discapacidad[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const disabilities: discapacidad[] = await prisma.discapacidad.findMany({ where: { user_id: user.id } });
    if (!disabilities) throw new Error("No hay discapacidades registradas.");

    return { success: true, data: disabilities };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las discapacidades";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getDisability = async (id: string): Promise<{ success: boolean; message?: string; data?: discapacidad }> => {};

export const createDisability = async (data: ZDisabilityS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    await prisma.discapacidad.create({
      data: {
        user_id: user.id,
        tipo: data.tipo,
        discapacidad: data.discapacidad.toUpperCase(),
        entidad_certificadora: data.entidad_certificadora,
        fecha_certificacion: new Date(data.fecha_certificacion).toISOString(),
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Discapacidad registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar la discapacidad.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
