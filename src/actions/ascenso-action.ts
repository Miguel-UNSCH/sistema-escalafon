"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZAscensoS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";

export type ascensoRecord = Prisma.ascensoGetPayload<{ include: { current_cargo: true; current_dependencia: true; new_cargo: true; new_dependencia: true; file: true } }>;
export const getAscensos = async (): Promise<{ success: boolean; message?: string; data?: ascensoRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: ascensoRecord[] | null = await prisma.ascenso.findMany({
      where: { user_id: user.id },
      include: { current_cargo: true, current_dependencia: true, new_cargo: true, new_dependencia: true, file: true },
    });
    if (!response) throw new Error("No hay ascensos registrados");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los ascensos";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createAscenso = async (data: ZAscensoS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const current_c = await prisma.cargo.findUnique({ where: { nombre: data.current_cargo.nombre } });
    if (!current_c) throw new Error("Cargo actual no encontrado");

    const new_c = await prisma.cargo.findUnique({ where: { nombre: data.new_cargo.nombre } });
    if (!new_c) throw new Error("Nuevo cargo no encontrado");

    const current_d = await prisma.dependencia.findUnique({ where: { codigo: data.current_dependencia.codigo } });
    if (!current_d) throw new Error("Dependencia actual no encontrada");

    const new_d = await prisma.dependencia.findUnique({ where: { codigo: data.new_dependencia.codigo } });
    if (!new_d) throw new Error("Nueva dependencia no encontrada");

    const exist_file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!exist_file) throw new Error("Archivo no encontrado");

    await prisma.ascenso.create({
      data: {
        user_id: user.id,
        resolucion_ascenso: data.resolucion_ascenso.toUpperCase(),
        nivel_remunerativo: data.nivel_remunerativo.toUpperCase(),
        fecha: data.fecha,
        cnp: data.cnp,
        current_cargo_id: current_c.id,
        new_cargo_id: new_c.id,
        current_dependencia_id: current_d.id,
        new_dependencia_id: new_d.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Ascenso creado con éxito" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el ascenso";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
