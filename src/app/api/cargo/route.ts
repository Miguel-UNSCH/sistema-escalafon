import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

interface IFilterss {
  nombre?: string;
}

/** modificar para que la busqueda por query no sea exclusiva, si no inclusiva */
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre = searchParams.get("nombre");

    const filters: IFilterss = {};

    if (nombre) filters.nombre = nombre;

    if (Object.keys(filters).length === 0) {
      const cargos = await prisma.cargo.findMany();
      if (cargos.length === 0) throw NotFoundError("Cargos no encontrados");
      return NextResponse.json(cargos, { status: 200 });
    }

    const cargos = await prisma.cargo.findMany({ where: filters });
    if (!cargos.length) throw NotFoundError("Cargos no encontrados");

    return NextResponse.json(cargos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const cargo = await req.json();
    const newCargo = await prisma.cargo.create({ data: cargo });
    return NextResponse.json(newCargo, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
