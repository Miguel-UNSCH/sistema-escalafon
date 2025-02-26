import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { prisma } from "@/lib/prisma";

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const personalId = searchParams.get("personalId");
    const folder = searchParams.get("folder") || "";

    if (!personalId) throw BadRequestError("El personalId es requerido");

    const currentPersonal = await prisma.personal.findUnique({ where: { id: personalId } });
    if (!currentPersonal) throw NotFoundError("Personal no encontrado");

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) throw NotFoundError("No se proporcionó un archivo");

    // Validar tamaño y extensión
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) throw BadRequestError("Formato de archivo no permitido");
    if (file.size > MAX_FILE_SIZE) throw BadRequestError("El archivo excede el tamaño máximo permitido");

    // Crear la estructura de carpetas
    const personalFolder = path.join(UPLOADS_DIR, personalId);
    const finalFolder = folder ? path.join(personalFolder, folder) : personalFolder;

    if (!fs.existsSync(finalFolder)) fs.mkdirSync(finalFolder, { recursive: true });

    // Generar nombre único basado en la fecha actual
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Formato seguro para nombres de archivos
    const uniqueFileName = `${timestamp}${ext}`;
    const filePath = path.join(finalFolder, uniqueFileName);

    // Guardar archivo en el sistema
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Guardar información en la base de datos con el nombre original
    const archivo = await prisma.archivo.create({
      data: {
        name: file.name, // Guardamos el nombre original
        path: filePath, // Guardamos la ruta con el nombre único
        size: file.size,
      },
    });

    return NextResponse.json(archivo.id, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
}
