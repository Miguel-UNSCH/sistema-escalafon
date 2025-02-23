import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/utils/customErrors";
import { CustomError, handleError } from "@/middleware/errorHandler";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre: string | null = searchParams.get("nombre");

    if (nombre) {
      const cargos = await prisma.cargo.findMany({ where: { nombre: { contains: nombre, mode: "insensitive" } } });
      if (!cargos.length) throw NotFoundError("Cargos no encontrados con ese nombre");
      return NextResponse.json(cargos, { status: 200 });
    }

    const cargos = await prisma.cargo.findMany();
    if (!cargos.length) throw NotFoundError("Cargos no encontrados");

    return NextResponse.json(cargos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
