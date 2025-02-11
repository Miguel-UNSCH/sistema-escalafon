import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    const dependenciaOficina = await prisma.dependenciaOficina.findUnique({ where: { id: parseInt(id) } });
    if (!dependenciaOficina) throw NotFoundError("DependenciaOficina no encontrada");
    return NextResponse.json(dependenciaOficina, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id de la dependenciaOficina");
    if (isNaN(parseInt(id))) throw BadRequestError("El id de la dependenciaOficina debe ser un número");
    const dependenciaOficina = await prisma.dependenciaOficina.findUnique({ where: { id: parseInt(id) } });
    if (!dependenciaOficina) throw NotFoundError("DependenciaOficina no encontrada");

    const { nombre, direccion, codigo } = await req.json();
    const updatedDependenciaOficina = await prisma.dependenciaOficina.update({
      where: { id: parseInt(id) },
      data: { nombre, direccion, codigo },
    });

    return NextResponse.json(updatedDependenciaOficina, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const DELETE = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id de la dependenciaOficina");
    if (isNaN(parseInt(id))) throw BadRequestError("El id de la dependenciaOficina debe ser un número");
    await prisma.dependenciaOficina.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Dependencia eliminada correctamente" }, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
