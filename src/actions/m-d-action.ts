"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDemerito, ZMerito } from "@/lib/schemas/m-d-schema";
import { demerito, merito, Prisma, User } from "@prisma/client";

export type meritoRecord = Prisma.meritoGetPayload<{ include: { cargo: true; dependencia: true } }>;
export type demeritoRecord = Prisma.demeritoGetPayload<{ include: { cargo: true; dependencia: true; user: true } }>;

export const getMeritos = async (): Promise<{ success: boolean; message?: string; data?: Array<meritoRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: Array<meritoRecord> | null = await prisma.merito.findMany({ where: { user_id: user.id }, include: { cargo: true, dependencia: true } });
    if (!response) throw new Error("No haye meritos registradas.");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getDemeritos = async (): Promise<{ success: boolean; message?: string; data?: Array<demeritoRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");
    if (session?.user?.role !== "admin") throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: Array<demeritoRecord> | null = await prisma.demerito.findMany({ include: { cargo: true, dependencia: true, user: true } });
    if (!response) throw new Error("No haye demeritos registradas.");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los bonos familiares";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getMerito = async (id: string): Promise<{ success: boolean; message?: string; data?: merito }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: merito | null = await prisma.merito.findUnique({ where: { id } });
    if (!response) throw new Error("Merito no encontrado");

    return { success: true, message: "Merito encontrado", data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
export const getDemerito = async (id: string): Promise<{ success: boolean; message?: string; data?: demerito }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: demerito | null = await prisma.demerito.findUnique({ where: { id } });
    if (!response) throw new Error("Demerito no encontrado");

    return { success: true, message: "Demerito encontrado", data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createMerito = async (data: ZMerito & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.merito.create({
      data: {
        fecha: data.fecha,
        user_id: user.id,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Merito creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDemerito = async (data: ZDemerito & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");
    if (session?.user?.role !== "admin") throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { dni: data.user.dni } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.demerito.create({
      data: {
        tipo_sancion: data.tipo_sancion,
        fecha: data.fecha,
        user_id: user.id,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: file.id,
      },
    });

    return { success: true, message: "Demerito creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el bono personal";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
