"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZConyuge } from "@/lib/schemas/personal-schema";
import { Conyuge, Personal, Ubigeo, User } from "@prisma/client";

export const getCurrentSpouse = async (): Promise<{ success: boolean; message?: string; data?: Conyuge }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: user.id } });
    if (!personal) throw new Error("Personal no encontrado");

    const spouse: Conyuge | null = await prisma.conyuge.findUnique({ where: { personal_id: personal.id }, include: { ubigeo: true } });
    if (!spouse) throw new Error(`Couldn not find spouse for personal with id ${personal.id}`);

    return { success: true, data: spouse };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener cónyuge.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const createSpouse = async (data: ZConyuge): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user?.email) throw new Error("No autorizado");

    const currentUser: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const currentPersonal: Personal | null = await prisma.personal.findUnique({ where: { user_id: currentUser.id } });
    if (!currentPersonal) throw new Error("Personal no encontrado");
    if (currentPersonal.estado_civil !== "c") throw new Error("No se puede agregar cónyuge a personal que no es casado.");

    const ubigeo: Ubigeo | null = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    await prisma.conyuge.create({
      data: {
        personal_id: currentPersonal.id,
        nombres: data.nombres.toUpperCase(),
        apellidos: data.apellidos.toUpperCase(),
        dni: data.dni,
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString(),
        ubigeo_id: ubigeo.id,
        grado_instruccion: data.grado_instruccion,
      },
    });

    return { success: true, message: "Conyuge creado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear conyuge.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
