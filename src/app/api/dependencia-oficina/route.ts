import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

interface IFilters {
  nombre?: string;
  direccion?: string;
  codigo?: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre = searchParams.get("nombre");
    const direccion = searchParams.get("direccion");
    const codigo = searchParams.get("codigo");

    const filters: IFilters = {};

    if (nombre) filters.nombre = nombre;
    if (direccion) filters.direccion = direccion;
    if (codigo) filters.codigo = codigo;

    if (Object.keys(filters).length === 0) {
      const dependenciaOficinas = await prisma.dependenciaOficina.findMany();
      if (dependenciaOficinas.length === 0) throw NotFoundError("DependenciaOficinas no encontradas");
      return NextResponse.json(dependenciaOficinas, { status: 200 });
    }

    const dependenciaOficinas = await prisma.dependenciaOficina.findMany({ where: filters });
    if (dependenciaOficinas.length === 0) throw NotFoundError("DependenciaOficinas no encontradas");
    return NextResponse.json(dependenciaOficinas, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const dependenciaOficina = await req.json();
    const newDependenciaOficina = await prisma.dependenciaOficina.create({ data: dependenciaOficina });
    return NextResponse.json(newDependenciaOficina, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
