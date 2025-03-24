// eslint-disable no-console
"use server";

import { prisma } from "@/config/prisma.config";
import path from "path";
import fs from "fs/promises";

export const getFile = async (fileId: string) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new Error("Archivo no encontrado");

    const filePath = path.join(process.cwd(), file.path, `${fileId}${file.extension}`);
    try {
      await fs.access(filePath);
    } catch {
      throw new Error("El archivo no existe en el servidor");
    }

    return `/api/upload/${fileId}`;
  } catch (error: unknown) {
    console.error("Error al obtener el archivo:", error);
    throw new Error("No se pudo recuperar el archivo");
  }
};

export const updateFile = async (file_id: string, newFile: globalThis.File) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: file_id } });
    if (!file) throw new Error("Archivo no encontrado");

    const filePath = path.resolve(process.cwd(), file.path, `${file_id}${file.extension}`);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (err) {
      console.warn(`No se encontró el archivo físico anterior: ${err}`);
    }

    await fs.writeFile(filePath, Buffer.from(await newFile.arrayBuffer()));

    await prisma.file.update({
      where: { id: file_id },
      data: {
        name: newFile.name,
        size: newFile.size,
        extension: path.extname(newFile.name),
      },
    });

    return { success: true, message: "Archivo actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar el archivo:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al actualizar el archivo",
    };
  }
};
