// eslint-disable no-unused-vars
"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZEstudioS } from "@/lib/schemas/personal-schema";
import { uploadFile } from "@/service/file-service";
import { FormacionAcademica, Personal, User } from "@prisma/client";

// export const getStudies = async (): Promise<{ success: boolean; message?: string; data?: FormacionAcademica }> => {};

// export const getStudy = async (id: string): Promise<{ success: boolean; message?: string; data?: FormacionAcademica }> => {};

export const createStudy = async (data: ZEstudioS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const personal: Personal | null = await prisma.personal.findUnique({ where: { user_id: user.id } });
    if (!personal) throw new Error("Personal no encontrado");

    await prisma.formacionAcademica.create({
      data: {
        personal_id: personal.id,
        nivel: data.nivel,
        institucion: data.institucion,
        carrera: data.carrera,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        certificado: data.file_id,
      },
    });

    return { success: true, message: "Estudio registrado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el estudio.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
