import { errMessages } from "@/helpers";
import { prisma } from "@/lib/prisma";
import { dependenciaSchema } from "@/lib/schemas/dependencia.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
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
      if (dependenciaOficinas.length === 0) throw NotFoundError("Dependencias no encontradas");
      return NextResponse.json(dependenciaOficinas, { status: 200 });
    }

    const dependenciaOficinas = await prisma.dependenciaOficina.findMany({ where: filters });
    if (dependenciaOficinas.length === 0) throw NotFoundError("Dependencias no encontradas");
    return NextResponse.json(dependenciaOficinas, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const dependenciaOficina = await req.json();
    const { data, success, error } = dependenciaSchema.safeParse(dependenciaOficina);
    if (!success) throw BadRequestError(errMessages(error));

    if (data.codigo) {
      const dependenciaOficinaExiste = await prisma.dependenciaOficina.findFirst({ where: { codigo: data.codigo } });
      if (dependenciaOficinaExiste) throw BadRequestError("La dependencia con ese codigo ya existe");
    }

    if (data.nombre) {
      const dependenciaOficinaExiste = await prisma.dependenciaOficina.findFirst({ where: { nombre: data.nombre } });
      if (dependenciaOficinaExiste) throw BadRequestError("La dependencia con ese nombre ya existe");
    }

    const newDependenciaOficina = await prisma.dependenciaOficina.create({ data });
    return NextResponse.json(newDependenciaOficina, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
