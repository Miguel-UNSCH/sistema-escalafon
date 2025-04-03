"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZChildren } from "@/lib/schemas/personal-schema";
import { Children, Personal, Prisma } from "@prisma/client";
import { checkEditable } from "./limit-time";

export type childrenRecord = Prisma.ChildrenGetPayload<{ include: { ubigeo: true } }>;

export const getChilds = async (id: string): Promise<{ success: boolean; message?: string; data?: Children[] }> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new Error("Usuario no encontrado");

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: user.id } });
    if (!personal) throw new Error("Personal no encontrado");

    const children: childrenRecord[] | null = await prisma.children.findMany({ where: { parents: { some: { personal_id: personal.id } } }, include: { ubigeo: true } });

    return { success: true, data: children };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al obtener hijos.";
    return { success: false, message: errorMessage };
  }
};

export const createChild = async (id: string, data: ZChildren): Promise<{ success: boolean; message: string }> => {
  try {
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const currentPersonal: Personal | null = await prisma.personal.findUnique({ where: { user_id: currentUser.id } });
    if (!currentPersonal) throw new Error("Personal no encontrado");

    const ubigeo = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    const newChild: Children = await prisma.children.create({
      data: {
        nombres: data.nombres.toUpperCase(),
        apellidos: data.apellidos.toUpperCase(),
        dni: data.dni,
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString(),
        grado_instruccion: data.grado_instruccion,
        ubigeo_id: ubigeo.id,
      },
    });

    await prisma.personalChildren.create({
      data: { personal_id: currentPersonal.id, children_id: newChild.id },
    });

    return { success: true, message: "Hijo registrado exitosamente." };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error al registrar el hijo.";
    return { success: false, message: errorMessage };
  }
};

export const updateChildren = async (id: string, data: ZChildren): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.children.findUnique({ where: { id } });
    if (!current_model) throw new Error("Discapacidad no encontrado");

    const ubigeo = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
    if (!ubigeo) throw new Error("El ubigeo proporcionado no existe.");

    await prisma.children.update({
      where: { id },
      data: {
        nombres: data.nombres,
        apellidos: data.apellidos,
        dni: data.dni,
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString(),
        grado_instruccion: data.grado_instruccion,
        ubigeo_id: ubigeo.id,
      },
    });

    return { success: true, message: "Hijo modificado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el hijo.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteChildren = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    if (currentUser.role !== "admin") {
      const check = await checkEditable();
      if (!check.success || check.editable === false) throw new Error(check.message || "No tienes permiso para modificar datos en este momento.");
    }

    const current_model = await prisma.children.findUnique({ where: { id } });
    if (!current_model) throw new Error("children no encontrado");

    await prisma.children.delete({ where: { id } });

    return { success: true, message: "children eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar al hijo.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
