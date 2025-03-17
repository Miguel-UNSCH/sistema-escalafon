"use server";

import * as XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";
import { prisma } from "@/config/prisma.config";

export type ModelType = "cargo" | "usuario" | "dependencia";

interface CargoInput {
  nombre: string;
}

interface UsuarioInput {
  name: string;
  last_name: string;
  email: string;
  password: string;
  dni: string;
  modification_end_time: Date;
}

interface DependenciaInput {
  nombre: string;
  direccion?: string;
  codigo: string;
}

export const processFile = async (fileId: string, model: ModelType) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new Error("Archivo no encontrado.");

    const filePath = path.join(process.cwd(), file.path, `${file.id}${file.extension}`);

    await fs.access(filePath);
    const fileBuffer = await fs.readFile(filePath);
    let dataRecords: any[] = [];

    if (file.extension === ".json") {
      dataRecords = JSON.parse(fileBuffer.toString());
    } else if (file.extension === ".xlsx") {
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      dataRecords = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName]);
    } else throw new Error("Formato de archivo no soportado.");

    if (dataRecords.length === 0) throw new Error("El archivo no contiene datos.");

    let formattedRecords: any[] = [];

    if (model === "cargo") {
      formattedRecords = dataRecords.map(
        (record): CargoInput => ({
          nombre: record.nombre?.toUpperCase() || "",
        })
      );
    } else if (model === "usuario") {
      formattedRecords = dataRecords.map(
        (record): UsuarioInput => ({
          name: record.name?.toUpperCase() || "",
          last_name: record.last_name?.toUpperCase() || "",
          email: record.email?.toUpperCase() || "",
          password: record.password || "default_password",
          dni: record.dni.toString() || "",
          modification_end_time: new Date(Date.now() + 1 * 60 * 1000), // 🔹 Agregado aquí
        })
      );
    } else if (model === "dependencia") {
      formattedRecords = dataRecords.map(
        (record): DependenciaInput => ({
          nombre: record.nombre?.toUpperCase() || "",
          direccion: record.direccion?.toUpperCase() || undefined,
          codigo: record.codigo?.toUpperCase() || "",
        })
      );
    } else {
      throw new Error("Modelo no válido.");
    }

    if (model === "cargo") {
      await prisma.cargo.createMany({ data: formattedRecords, skipDuplicates: true });
    } else if (model === "usuario") {
      console.log({ data: { ...formattedRecords, modification_end_time: new Date(Date.now() + 1 * 60 * 1000) }, skipDuplicates: true });
      await prisma.user.createMany({ data: formattedRecords, skipDuplicates: true });
    } else if (model === "dependencia") {
      await prisma.dependencia.createMany({ data: formattedRecords, skipDuplicates: true });
    }

    return { success: true, message: `${model}s insertados correctamente.` };
  } catch (error: unknown) {
    let message = "Error al procesar el archivo.";
    if (error instanceof Error) message = error.message;
    return { success: false, message: message };
  }
};
