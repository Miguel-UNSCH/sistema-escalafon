import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { errMessages } from "@/helpers";
import { dependenciaSchema } from "@/lib/schemas/dependencia.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";

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

export const POST = async (req: NextRequest) => {
  try {
    const dependenciaOficina = await req.json();
    const { data, success, error } = dependenciaSchema.safeParse(dependenciaOficina);
    if (!success) throw BadRequestError(errMessages(error));

    if (data.codigo) {
      const dependenciaExiste = await prisma.dependencia.findFirst({ where: { codigo: data.codigo } });
      if (dependenciaExiste) throw BadRequestError("La dependencia con ese codigo ya existe");
    }

    if (data.nombre) {
      const dependenciaExiste = await prisma.dependencia.findFirst({ where: { nombre: data.nombre } });
      if (dependenciaExiste) throw BadRequestError("La dependencia con ese nombre ya existe");
    }

    const newDependencia = await prisma.dependencia.create({ data });
    return NextResponse.json(newDependencia, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
