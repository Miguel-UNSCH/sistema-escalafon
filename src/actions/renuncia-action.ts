"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZRenunciaS } from "@/lib/schemas/w-situation-schema";
import { Prisma, renuncia, User } from "@prisma/client";

export const getRenuncias = async (): Promise<{ success: boolean; message?: string; data?: renuncia[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const renuncias: Array<Prisma.renunciaGetPayload<{ include: { cargo: true; dependencia: true } }>> | null = await prisma.renuncia.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true },
    });
    if (!renuncias) throw new Error("No hay renuncias registradas.");

    return { success: true, message: `Se encontraron ${renuncias.length + 1} elementos`, data: renuncias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las renuncias.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getRenuncia = async (id: string): Promise<{ success: boolean; message?: string; data?: renuncia }> => {};

export const createRenuncia = async (data: ZRenunciaS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    await prisma.renuncia.create({
      data: {
        user_id: user.id,
        motivo: data.motivo.toUpperCase(),
        fecha: new Date(data.fecha).toISOString(),
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Renuncia registrada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el estudio.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
