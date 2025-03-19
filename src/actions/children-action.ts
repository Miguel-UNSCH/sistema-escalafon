"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZChildren } from "@/lib/schemas/personal-schema";
import { Children, Personal, Prisma, Ubigeo, User } from "@prisma/client";

export type childrenRecord = Prisma.ChildrenGetPayload<{ include: { ubigeo: true } }>;

export const getChilds = async (): Promise<{ success: boolean; message?: string; data?: Children[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: user.id } });
    if (!personal) throw new Error("Personal no encontrado");

    const children: childrenRecord[] | null = await prisma.children.findMany({ where: { parents: { some: { personal_id: personal.id } } }, include: { ubigeo: true } });

    return { success: true, data: children };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener hijos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createChild = async (data: ZChildren): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session || !session?.user?.email) throw new Error("No autorizado");

    const currentUser: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const currentPersonal: Personal | null = await prisma.personal.findUnique({ where: { user_id: currentUser.id } });
    if (!currentPersonal) throw new Error("Personal no encontrado");

    const ubigeo: Ubigeo | null = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
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
      data: {
        personal_id: currentPersonal.id,
        children_id: newChild.id,
      },
    });

    return { success: true, message: "Hijo registrado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el hijo.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateChildren = async (id: string, data: ZChildren): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.children.findUnique({ where: { id } });
    if (!current_model) throw new Error("Discapacidad no encontrado");

    const ubigeo: Ubigeo | null = await prisma.ubigeo.findUnique({ where: { inei: data.ubigeo.inei } });
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
