"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDesMedS } from "@/lib/schemas/w-situation-schema";
import { Prisma } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type descanso_medicoRecord = Prisma.descanso_medicoGetPayload<{
  include: {
    file: true;
    usuarioCargoDependencia: {
      include: {
        cargoDependencia: {
          include: {
            cargo: true;
            dependencia: true;
          };
        };
      };
    };
  };
}>;

export const getDescansos = async (): Promise<{ success: boolean; message?: string; data?: descanso_medicoRecord[] }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response = await prisma.descanso_medico.findMany({
      where: { user_id: user.id },
      include: {
        file: true,
        usuarioCargoDependencia: {
          include: {
            cargoDependencia: {
              include: {
                cargo: true,
                dependencia: true,
              },
            },
          },
        },
      },
    });
    if (!response) throw new Error("No hay descansos médicos disponibles.");

    return {
      success: true,
      data: response,
    };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los descansos médicos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDescanso = async (data: ZDesMedS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: {
          cargoId: cargo.id,
          dependenciaId: dependencia.id,
        },
      },
    });

    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: {
          userId: user.id,
          cargoDependenciaId: cargoDependencia.id,
        },
      },
    });

    if (!usuarioCargoDependencia) throw new Error("El usuario no tiene asignado ese cargo en la dependencia seleccionada.");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.descanso_medico.create({
      data: {
        user_id: user.id,
        tipo_descanso: data.tipo_descanso,
        detalle: data.detalle.toUpperCase(),
        periodo: {
          from: new Date(data.periodo.from).toISOString(),
          to: new Date(data.periodo.to).toISOString(),
        },
        file_id: file.id,
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
      },
    });

    return { success: true, message: "Descanso médico registrado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al registrar el descanso médico.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateDescanso = async (id: string, data: ZDesMedS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const current_descanso = await prisma.descanso_medico.findUnique({ where: { id }, include: { file: true } });
    if (!current_descanso) throw new Error("Descanso no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: {
        cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id },
      },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");

    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: {
        userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id },
      },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_descanso.file.path, `${current_descanso.file.id}${current_descanso.file.extension}`);

      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_descanso.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.descanso_medico.update({
      where: { id },
      data: {
        tipo_descanso: data.tipo_descanso,
        detalle: data.detalle.toUpperCase(),
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        usuarioCargoDependenciaId: usuarioCargoDependencia.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Descanso medico actualizado correctamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al modificar la Renucnia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteDescanso = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_descanso = await prisma.descanso_medico.findUnique({ where: { id } });
    if (!current_descanso) throw new Error("Descanso no encontrada");

    const current_file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!current_file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), current_file.path, `${current_file.id}${current_file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      // eslint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Advertencia: No se pudo eliminar el archivo físico:", err);
    }

    await prisma.renuncia.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Descanso eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la descanso.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
