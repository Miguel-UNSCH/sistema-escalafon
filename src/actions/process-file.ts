"use server";

import * as XLSX from "xlsx";

import path from "path";
import fs from "fs/promises";
import { prisma } from "@/config/prisma.config";

export const processFile = async (fileId: string) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new Error("Archivo no encontrado.");

    const filePath = path.join(process.cwd(), file.path, `${file.id}${file.extension}`);

    await fs.access(filePath);
    const fileBuffer = await fs.readFile(filePath);
    let cargos: { nombre: string }[] = [];

    if (file.extension === ".json") {
      cargos = JSON.parse(fileBuffer.toString());
    } else if (file.extension === ".xlsx") {
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json<{ nombre: string }>(workbook.Sheets[sheetName]);
      cargos = data;
    } else throw new Error("Formato de archivo no soportado.");

    const formattedCargos = cargos.map((cargo) => ({ nombre: cargo.nombre.toUpperCase() }));

    await prisma.cargo.createMany({ data: formattedCargos, skipDuplicates: true });

    return { success: true, message: "Cargos insertados correctamente." };
  } catch (error: unknown) {
    let message = "Error al procesar el archivo.";
    if (error instanceof Error) message = error.message;
    return { success: false, message: message || "Error al procesar el archivo." };
  }
};
