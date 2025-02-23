/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/utils/customErrors";
import { CustomError, handleError } from "@/middleware/errorHandler";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre: string | null = searchParams.get("nombre");
    const direccion: string | null = searchParams.get("direccion");
    const codigo: string | null = searchParams.get("codigo");

    const filters: any = {};

    if (nombre) filters.nombre = { contains: nombre, mode: "insensitive" };
    if (direccion) filters.direccion = { contains: direccion, mode: "insensitive" };
    if (codigo) filters.codigo = { contains: codigo, mode: "insensitive" };

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
