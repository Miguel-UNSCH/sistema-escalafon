"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { User } from "@prisma/client";

export const getusers = async (name: string): Promise<{ success: boolean; message?: string; data?: User[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const users: User[] | null = await prisma.user.findMany({ where: { name: { contains: name, mode: "insensitive" } } });
    if (!users) throw new Error("No hay usuarios registrados");

    return { success: true, message: `Se encontraron ${users.length} elementos`, data: users };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los usuarios";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getUser = async (): Promise<{ success: boolean; message?: string; data?: User }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("No hay usuarios registrados");

    return { success: true, data: user };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los usuarios";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getPerUsers = async (search?: string): Promise<{ success: boolean; message?: string; data?: User[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");
    if (session.user.role !== "admin") throw new Error("Permisos no satisfactorios");

    const users: User[] = await prisma.user.findMany({
      where: search
        ? {
            OR: [{ name: { contains: search, mode: "insensitive" } }, { last_name: { contains: search, mode: "insensitive" } }, { dni: { contains: search } }],
          }
        : {},
    });
    if (!users) throw new Error("No hay usuarios registrados");

    return { success: true, message: `Se encontraron ${users.length} elementos`, data: users };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los usuarios";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
