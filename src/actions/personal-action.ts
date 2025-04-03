"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZPersonal } from "@/lib/schemas/personal-schema";
import { Prisma } from "@prisma/client";
import { checkEditable } from "./limit-time";

export type personalRecord = Prisma.PersonalGetPayload<{ include: { user: true; ubigeo: true } }>;

export const get_current_personal = async (id: string): Promise<{ success: boolean; message?: string; data?: personalRecord }> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Usuario no encontrado");

    const personal: personalRecord | null = await prisma.personal.findUnique({
      where: { user_id: user.id },
      include: { user: true, ubigeo: true },
    });
    if (!personal) throw new Error("Personal no encontrado");

    return { success: true, data: personal };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener al Personal.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
export const createPersonal = async (data: ZPersonal, user_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const user_edit = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user_edit) throw new Error("Usuario no encontrado");

    if (user_edit.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentUser = await prisma.user.findUnique({ where: { id: user_id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    await prisma.personal.create({
      data: {
        user_id,
        sexo: data.sexo,
        grupo_sanguineo: data.grupo_sanguineo,
        n_autogenerado: data.n_autogenerado,
        licencia_conducir: data.licencia_conducir,
        fecha_ingreso: new Date(data.fecha_ingreso).toISOString(),
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString(),
        domicilio: data.domicilio.toUpperCase(),
        numero_contacto: data.numero_contacto,
        estado_civil: data.estado_civil,
        discapacidad: data.discapacidad,
        numero_hijos: data.numero_hijos,
        ubigeo_id: ubigeo.id,
      },
    });

    return { success: true, message: "Personal creado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el Personal.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updatePersonal = async (id: string, data: ZPersonal): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    await prisma.personal.update({
      where: { id },
      data: {
        sexo: data.sexo,
        grupo_sanguineo: data.grupo_sanguineo,
        n_autogenerado: data.n_autogenerado,
        licencia_conducir: data.licencia_conducir,
        fecha_ingreso: new Date(data.fecha_ingreso).toISOString(),
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString(),
        domicilio: data.domicilio.toUpperCase(),
        numero_contacto: data.numero_contacto,
        estado_civil: data.estado_civil,
        numero_hijos: data.numero_hijos,
        discapacidad: data.discapacidad,
        ubigeo_id: ubigeo.id,
      },
    });

    return { success: true, message: "Personal actualizado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar el Personal.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deletePersonal = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentPeronal = await prisma.personal.findUnique({ where: { id } });
    if (!currentPeronal) throw new Error("El personal especificado no existe.");

    await prisma.personal.delete({ where: { id } });

    return { success: true, message: "Personal eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el Personal.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
