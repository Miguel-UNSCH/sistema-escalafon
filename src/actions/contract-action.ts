"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZContratoS } from "@/lib/schemas/w-situation-schema";
import { Prisma, User } from "@prisma/client";

export const getContracts = async (): Promise<{
  success: boolean;
  message?: string;
  data?: Array<Prisma.ContratoGetPayload<{ include: { cargo: true; dependencia: true } }>>;
}> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const contracts: Array<Prisma.ContratoGetPayload<{ include: { cargo: true; dependencia: true } }>> | null = await prisma.contrato.findMany({
      where: { user_id: user.id },
      include: { cargo: true, dependencia: true },
    });
    if (!contracts) throw new Error("No hay contratos registrados");

    return { success: true, message: `Se encontraron ${contracts.length + 1} elementos`, data: contracts };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los contratos.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

// export const getContract = async (): Promise<{ success: boolean; message?: string; data?: --- }> => {};

export const createContract = async (data: ZContratoS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: data.cargo.nombre } });
    if (!cargo) throw new Error("Cargo no encontrado");

    const dependencia = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia.codigo } });
    if (!dependencia) throw new Error("Dependencia no encontrada");

    await prisma.contrato.create({
      data: {
        user_id: user.id,
        tipo_contrato: data.tipo_contrato,
        condicion_laboral: data.condicion_laboral,
        resolucion_contrato: data.resolucion_contrato?.toUpperCase() || null,
        regimen_laboral: data.regimen_laboral,
        nivel_remuneracion: data.nivel_remuneracion?.toUpperCase() || null,
        pap: data.pap || null,
        cnp: data.cnp || null,
        meta: data.meta?.toUpperCase() || null,
        convenio: data.convenio?.toUpperCase() || null,
        fecha_ingreso: new Date(data.fecha_ingreso).toISOString(),
        fecha_cese: data.fecha_cese ? new Date(data.fecha_cese).toISOString() : null,
        cargo_id: cargo.id,
        dependencia_id: dependencia.id,
        file_id: data.file_id,
      },
    });

    return { success: true, message: "Contrato creado exito en la base de datos." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el contrato.";

    if (error instanceof Error) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
