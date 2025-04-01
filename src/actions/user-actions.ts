"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const restorePwd = async (id: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("No autorizado");
    if (session.user.role !== "admin") throw new Error("Permisos no satisfactorios");

    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("No se encontró el usuario");
    if (user.role === "admin") throw new Error("No se puede restaurar la contraseña de un administrador");

    const hashedPassword = await bcrypt.hash(user.dni, 10);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        must_change_pwd: 1,
      },
    });

    return { success: true, message: "Contraseña restaurada correctamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al restaurar la contraseña";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateUser = async (id: string, data: Partial<Pick<User, "name" | "last_name" | "dni" | "email">>): Promise<{ success: boolean; message?: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("No se encontró el usuario");

    await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        last_name: data.last_name,
        dni: data.dni,
        email: data.email,
      },
    });

    return { success: true, message: "Usuario actualizado correctamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar el usuario";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
export const getUserById = async (id: string): Promise<{ success: boolean; message?: string; data?: User }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const response = await prisma.user.findUnique({ where: { id } });
    if (!response) throw new Error("No se encontró el usuario");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener el usuario";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getUsers = async (name: string): Promise<{ success: boolean; message?: string; data?: User[] }> => {
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
      include: { ascenso: true, contrato: true, Desplazamiento: true },
    });
    if (!users) throw new Error("No hay usuarios registrados");

    return { success: true, message: `Se encontraron ${users.length} elementos`, data: users };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los usuarios";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
