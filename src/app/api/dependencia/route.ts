import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/utils/customErrors";
import { CustomError, handleError } from "@/middleware/errorHandler";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre = searchParams.get("nombre");
    const direccion = searchParams.get("direccion");
    const codigo = searchParams.get("codigo");

    const filters: { nombre?: string; direccion?: string; codigo?: string } = {};

    if (nombre) filters.nombre = nombre;
    if (direccion) filters.direccion = direccion;
    if (codigo) filters.codigo = codigo;

    if (Object.keys(filters).length === 0) {
      const dependencias = await prisma.dependencia.findMany();
      if (!dependencias.length) throw NotFoundError("Dependencias no encontradas");
      return NextResponse.json(dependencias, { status: 200 });
    }

    const dependencias = await prisma.dependencia.findMany({ where: filters });
    if (!dependencias.length) throw NotFoundError("Dependencias no encontradas");
    return NextResponse.json(dependencias, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
