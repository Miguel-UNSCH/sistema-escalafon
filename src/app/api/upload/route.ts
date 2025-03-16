// eslint-disable no-console
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/config/prisma.config";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session || !session?.user?.email) throw new Error("No autorizado");

    const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) throw new Error("Usuario no encontrado");

    const user_id = currentUser.id;

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string) || "data";
    const subfolder = (formData.get("subfolder") as string) || "general";

    if (!file) throw new Error("Archivo no recibido");

    const originalName = file.name;
    const extension = path.extname(originalName);
    const name = path.basename(originalName, extension);

    let storagePath = path.join(process.cwd(), "src/files", category);
    if (category === "data") storagePath = path.join(storagePath, user_id, subfolder);

    await fs.mkdir(storagePath, { recursive: true });

    const newFile = await prisma.file.create({
      data: {
        name,
        path: `src/files/${category}${category === "data" ? `/${user_id}/${subfolder}` : ""}`,
        size: file.size,
        extension,
        uploaded_by_id: user_id,
        folder: category === "data" ? subfolder : category,
      },
    });

    const fileId = newFile.id;
    const filePath = path.join(storagePath, `${fileId}${extension}`);

    try {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);
    } catch (error) {
      await prisma.file.delete({ where: { id: fileId } });
      console.error("Error al escribir el archivo:", error);
      throw new Error("Error al guardar el archivo en el servidor");
    }

    return NextResponse.json({ message: "Archivo subido correctamente", file: newFile }, { status: 201 });
  } catch (error) {
    console.error("Error en la subida del archivo:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "Error interno del servidor" }, { status: 500 });
  }
};
