"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZPerLicVacS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";

export const getPerLicVacs = async (): Promise<{
  success: boolean;
  message?: string;
  data?: Array<Prisma.per_lic_vacGetPayload<{ include: { cargo: true; dependencia: true } }>>;
}> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: Array<Prisma.per_lic_vacGetPayload<{ include: { cargo: true; dependencia: true } }>> | null = await prisma.per_lic_vac.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true },
    });
    if (!response) throw new Error("No hay permisos, licencias o vacaciones disponibles");

    return { success: true, message: `Se encontraron ${response.length + 1} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los permisos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getPerLicVac = async (id: string): Promise<{ success: boolean; message?: string; data?: --- }> => {};

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
