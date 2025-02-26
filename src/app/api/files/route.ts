import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  try {
    // Obtener parámetros de la URL
    const { searchParams } = new URL(req.url);
    const personalId = searchParams.get("personalId");
    const folder = searchParams.get("folder") || ""; // Puede ser "estudios" o vacío

    if (!personalId) {
      return NextResponse.json({ error: "El personalId es requerido" }, { status: 400 });
    }

    // Leer el archivo desde la solicitud
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó un archivo" }, { status: 400 });
    }

    // Validar tamaño y extensión
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: "Formato de archivo no permitido" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "El archivo excede el tamaño máximo permitido" }, { status: 400 });
    }

    // Crear la estructura de carpetas
    const personalFolder = path.join(UPLOADS_DIR, personalId);
    const finalFolder = folder ? path.join(personalFolder, folder) : personalFolder;

    if (!fs.existsSync(finalFolder)) {
      fs.mkdirSync(finalFolder, { recursive: true });
    }

    // Guardar el archivo
    const filePath = path.join(finalFolder, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Guardar en la base de datos
    const archivo = await prisma.archivo.create({
      data: {
        name: file.name,
        path: filePath,
        size: file.size,
      },
    });

    return NextResponse.json({ message: "Archivo subido con éxito", archivo });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
