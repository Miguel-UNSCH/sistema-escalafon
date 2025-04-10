import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ t: string; n: string }> }) {
  const { t, n } = await params;
  const filePath = path.resolve(`src/files/data/reports/${t}/${n}`);

  try {
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
        "Content-Type": "application/zip",
        "Content-Disposition": `inline; filename="${n}.zip"`,
      },
    });
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error("Error al servir el archivo:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
