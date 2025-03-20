"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZPersonal } from "@/lib/schemas/personal-schema";
import { Prisma } from "@prisma/client";

export type personalRecord = Prisma.PersonalGetPayload<{ include: { user: true; ubigeo: true } }>;

export const getCurrentPersonal = async (email: string): Promise<{ success: boolean; message?: string; data?: personalRecord }> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
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

export const createPersonal = async (data: ZPersonal): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user?.email) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    await prisma.personal.create({
      data: {
        user_id: currentUser.id,
        sexo: data.sexo,
        grupo_sanguineo: data.grupo_sanguineo,
        n_autogenerado: data.n_autogenerado,
        licencia_conducir: data.licencia_conducir,
        fecha_ingreso: new Date(data.fecha_ingreso).toISOString(),
        anios_servicio: data.anios_servicio,
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
        anios_servicio: data.anios_servicio,
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
