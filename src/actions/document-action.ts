"use server";

import { Prisma, User } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDocumentS } from "@/lib/schemas/documents-schema";

export type documentRecord = Prisma.documentoGetPayload<{
  include: { emisor: true; receptor: true; cargo_emisor: true; cargo_receptor: true; dependencia_emisor: true; dependencia_receptor: true };
}>;

export const getDocumentos = async (): Promise<{ success: boolean; message?: string; data?: Array<documentRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: documentRecord[] | null = await prisma.documento.findMany({
      where: { emisor_id: user.id },
      include: { emisor: true, receptor: true, cargo_emisor: true, cargo_receptor: true, dependencia_emisor: true, dependencia_receptor: true },
    });
    if (!response) throw new Error("No hay documentos registrados");

    return { success: true, message: `Se encontraron ${response.length} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los documentos";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

// export const getDocumento = async (id: string): Promise<{ success: boolean; message?: string; data?: documento }> => {};

export const createDocumento = async (data: ZDocumentS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const emisor: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!emisor) throw new Error("Usuario no encontrado");

    const receptor = await prisma.user.findUnique({ where: { dni: data.receptor.dni } });
    if (!receptor) throw new Error("Receptor no encontrado");

    const cargo_emisor = await prisma.cargo.findUnique({ where: { nombre: data.cargo_emisor.nombre } });
    if (!cargo_emisor) throw new Error("Cargo emisor no encontrado");

    const cargo_receptor = await prisma.cargo.findUnique({ where: { nombre: data.cargo_receptor.nombre } });
    if (!cargo_receptor) throw new Error("Cargo receptor no encontrado");

    const dependencia_emisor = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia_emisor.codigo } });
    if (!dependencia_emisor) throw new Error("Dependencia emisor no encontrada");

    const dependencia_receptor = await prisma.dependencia.findUnique({ where: { codigo: data.dependencia_receptor.codigo } });
    if (!dependencia_receptor) throw new Error("Dependencia receptor no encontrada");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.documento.create({
      data: {
        numero_documento: data.numero_documento.toUpperCase(),
        tipo_documento: data.tipo_documento,
        asunto: data.asunto.toUpperCase(),
        emisor_id: emisor.id,
        receptor_id: receptor.id,
        file_id: file.id,
        cargo_emisor_id: cargo_emisor.id,
        cargo_receptor_id: cargo_receptor.id,
        dependencia_emisor_id: dependencia_emisor.id,
        dependencia_receptor_id: dependencia_receptor.id,
      },
    });

    return { success: true, message: "Documento creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el documento";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
