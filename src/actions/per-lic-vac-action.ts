"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZPerLicVacS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export type perLicRecord = Prisma.per_lic_vacGetPayload<{ include: { cargo: true; dependencia: true; file: true } }>;
export const getPerLicVacs = async (): Promise<{
  success: boolean;
  message?: string;
  data?: perLicRecord[];
}> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: perLicRecord[] | null = await prisma.per_lic_vac.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true, file: true },
    });
    if (!response) throw new Error("No hay permisos, licencias o vacaciones disponibles");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los permisos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createPerLicVac = async (data: ZPerLicVacS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    await prisma.per_lic_vac.create({
      data: {
        user_id: user.id,
        tipo: data.tipo,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Permiso, licencia o vacación creada correctamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el descanso médico.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updatePerLicVac = async (id: string, data: ZPerLicVacS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.per_lic_vac.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Permiso, licencia o vacación no encontrada");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);
      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.per_lic_vac.update({
      where: { id },
      data: {
        tipo: data.tipo,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        periodo: { from: new Date(data.periodo.from).toISOString(), to: new Date(data.periodo.to).toISOString() },
      },
    });

    return { success: true, message: "Actualización exitosa." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deletePerLicVac = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.per_lic_vac.findUnique({ where: { id } });
    if (!current_model) throw new Error("Permiso, licencia o vacación no encontrada");

    const current_file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!current_file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), current_file.path, `${current_file.id}${current_file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      console.warn("Advertencia: No se pudo eliminar el archivo físico:", err);
    }

    await prisma.per_lic_vac.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Permiso, licencia o vacación eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el permiso, licencia o vacación.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
