"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZConyuge } from "@/lib/schemas/personal-schema";
import { Conyuge, Personal, Prisma } from "@prisma/client";
import { checkEditable } from "./limit-time";

export type spouseRecord = Prisma.ConyugeGetPayload<{ include: { ubigeo: true } }>;

export const getCurrentSpouse = async (): Promise<{ success: boolean; message?: string; data?: spouseRecord }> => {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("Usuario no encontrado");

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: user.id } });
    if (!personal) throw new Error("Personal no encontrado");

    const spouse: spouseRecord | null = await prisma.conyuge.findUnique({ where: { personal_id: personal.id }, include: { ubigeo: true } });
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
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentPersonal: Personal | null = await prisma.personal.findUnique({ where: { user_id: currentUser.id } });
    if (!currentPersonal) throw new Error("Personal no encontrado");
    if (currentPersonal.estado_civil !== "c") throw new Error("No se puede agregar cónyuge a personal que no es casado.");

    const ubigeo = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
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

export const updateSpouse = async (data: ZConyuge): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: currentUser.id } });
    if (!personal) throw new Error("Personal no encontrado");

    const spouse: Conyuge | null = await prisma.conyuge.findUnique({ where: { personal_id: personal.id } });
    if (!spouse) throw new Error("Cónyuge no encontrado");

    const ubigeo = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    await prisma.conyuge.update({
      where: { id: spouse.id },
      data: {
        nombres: data.nombres.toUpperCase(),
        apellidos: data.apellidos.toUpperCase(),
        dni: data.dni,
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString(),
        ubigeo_id: ubigeo.id,
        grado_instruccion: data.grado_instruccion,
      },
    });

    return { success: true, message: "Cónyuge actualizado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar cónyuge.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteSpouse = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: currentUser.id } });
    if (!personal) throw new Error("Personal no encontrado");

    const spouse: Conyuge | null = await prisma.conyuge.findUnique({ where: { personal_id: personal.id } });
    if (!spouse) throw new Error("Cónyuge no encontrado");

    await prisma.conyuge.delete({ where: { id: spouse.id } });

    return { success: true, message: "Cónyuge eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar cónyuge.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
