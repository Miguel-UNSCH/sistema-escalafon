"use server";

import { Prisma, User } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma.config";
import { ZDocumentS } from "@/lib/schemas/documents-schema";
import fs from "fs/promises";
import path from "path";

export type documentRecord = Prisma.documentoGetPayload<{
  include: {
    user: true;
    received: true;
    ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
    r_ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } };
    file: true;
  };
}>;

export const getDocumentos = async (): Promise<{ success: boolean; message?: string; data?: Array<documentRecord> }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const response: documentRecord[] | null = await prisma.documento.findMany({
      where: { user_id: user.id },
      include: {
        user: true,
        received: true,
        ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
        r_ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } },
        file: true,
      },
    });
    if (!response) throw new Error("No hay documentos registrados");

    return { success: true, message: `Se encontraron ${response.length} elementos`, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los documentos";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createDocumento = async (data: ZDocumentS & { file_id: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");
    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");
    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");
    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    const r_cargo = await prisma.cargo.findUnique({ where: { id: Number(data.r_cargo_id) } });
    if (!r_cargo) throw new Error("Cargo del evaluador no encontrado");
    const r_dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.r_dependencia_id) } });
    if (!r_dependencia) throw new Error("Dependencia del evaluador no encontrada");
    const r_cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: r_cargo.id, dependenciaId: r_dependencia.id } },
    });
    if (!r_cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia del evaluador.");
    const r_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: data.received.id, cargoDependenciaId: r_cargoDependencia.id } },
    });
    if (!r_usuarioCargoDependencia) throw new Error("No existe la relación entre el evaluador y el cargo-dependencia seleccionado.");

    const file = await prisma.file.findUnique({ where: { id: data.file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    await prisma.documento.create({
      data: {
        tipo_documento: data.tipo_documento,
        asunto: data.asunto.toUpperCase(),
        user_id: user.id,
        ucd_id: usuarioCargoDependencia.id,
        r_id: data.received.id,
        r_ucd_id: r_usuarioCargoDependencia.id,
        fecha_emision: new Date(data.fecha).toISOString(),
        file_id: file.id,
      },
    });

    return { success: true, message: "Documento creado exitosamente" };
  } catch (error: unknown) {
    let errorMessage = "Error al crear el documento";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const updateDocumento = async (id: string, data: ZDocumentS & { file?: File | null; file_id?: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("No autorizado");

    const user: User | null = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error("Usuario no encontrado");

    const current_model = await prisma.documento.findUnique({ where: { id }, include: { file: true } });
    if (!current_model) throw new Error("Docuemnto no encontrado");

    const cargo = await prisma.cargo.findUnique({ where: { id: Number(data.cargo_id) } });
    if (!cargo) throw new Error("Cargo no encontrado");
    const dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.dependencia_id) } });
    if (!dependencia) throw new Error("Dependencia no encontrada");
    const cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: cargo.id, dependenciaId: dependencia.id } },
    });
    if (!cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia seleccionada.");
    const usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: user.id, cargoDependenciaId: cargoDependencia.id } },
    });
    if (!usuarioCargoDependencia) throw new Error("No existe la relación entre el usuario y el cargo-dependencia seleccionado.");

    const r_cargo = await prisma.cargo.findUnique({ where: { id: Number(data.r_cargo_id) } });
    if (!r_cargo) throw new Error("Cargo del evaluador no encontrado");
    const r_dependencia = await prisma.dependencia.findUnique({ where: { id: Number(data.r_dependencia_id) } });
    if (!r_dependencia) throw new Error("Dependencia del evaluador no encontrada");
    const r_cargoDependencia = await prisma.cargoDependencia.findUnique({
      where: { cargoId_dependenciaId: { cargoId: r_cargo.id, dependenciaId: r_dependencia.id } },
    });
    if (!r_cargoDependencia) throw new Error("No existe la relación entre el cargo y la dependencia del evaluador.");
    const r_usuarioCargoDependencia = await prisma.usuarioCargoDependencia.findUnique({
      where: { userId_cargoDependenciaId: { userId: data.received.id, cargoDependenciaId: r_cargoDependencia.id } },
    });
    if (!r_usuarioCargoDependencia) throw new Error("No existe la relación entre el evaluador y el cargo-dependencia seleccionado.");

    if (data.file) {
      const filePath = path.resolve(process.cwd(), current_model.file.path, `${current_model.file.id}${current_model.file.extension}`);

      const fileBuffer = Buffer.from(await data.file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);

      await prisma.file.update({ where: { id: current_model.file.id }, data: { name: data.file?.name, size: fileBuffer.length } });
    }

    await prisma.documento.update({
      where: { id },
      data: {
        tipo_documento: data.tipo_documento,
        asunto: data.asunto.toString(),
        fecha_emision: data.fecha,
        ucd_id: usuarioCargoDependencia.id,
        r_id: data.received.id,
        r_ucd_id: r_usuarioCargoDependencia.id,
        ...(data.file_id && { file_id: data.file_id }),
      },
    });

    return { success: true, message: "Actualizacion exitosa." };
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteDocumento = async (id: string, file_id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const current_model = await prisma.documento.findUnique({ where: { id } });
    if (!current_model) throw new Error("DOcuemnto no encontrada");

    const current_file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!current_file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), current_file.path, `${current_file.id}${current_file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      // oxlint-disable-next-line no-console
      console.log("Archivo eliminado correctamente.");
    } catch (err) {
      // oxlint-disable-next-line no-console
      console.warn("Advertencia: No se pudo eliminar el archivo físico:", err);
    }

    await prisma.documento.delete({ where: { id } });
    await prisma.file.delete({ where: { id: file_id } });

    return { success: true, message: "Documento eliminado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar el documento.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
