import { prisma } from "@/config/prisma.config";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const fileId = params.id;

    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) return NextResponse.json({ message: "Archivo no encontrado" }, { status: 404 });

    const filePath = path.join(process.cwd(), file.path, `${fileId}${file.extension}`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "El archivo no existe en el servidor" }, { status: 404 });
    }

    const fileStream = fs.createReadStream(filePath);
    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });
    return new Response(readableStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${file.name}${file.extension}"`,
      },
    });
  } catch (error) {
    console.error("Error al servir el archivo:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
};
