import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { IParams } from "@/interfaces";

export const GET = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id de la dependencia");
    if (isNaN(parseInt(id))) throw BadRequestError("El id de la dependencia debe ser un número");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: parseInt(id) } });
    if (!dependencia) throw NotFoundError("dependencia no encontrada");

    return NextResponse.json(dependencia, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const PUT = async (req: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id de la dependencia");
    if (isNaN(parseInt(id))) throw BadRequestError("El id de la dependencia debe ser un número");

    const dependencia = await prisma.dependencia.findUnique({ where: { id: parseInt(id) } });
    if (!dependencia) throw NotFoundError("Dependencia no encontrada");

    const { nombre, direccion, codigo } = await req.json();
    if (!nombre && !direccion && !codigo) throw BadRequestError("Falta el nombre, direccion o codigo de la dependencia");

    const updatedDependencia = await prisma.dependencia.update({
      where: { id: parseInt(id) },
      data: { nombre, direccion, codigo },
    });

    return NextResponse.json(updatedDependencia, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const DELETE = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id de la dependencia");
    if (isNaN(parseInt(id))) throw BadRequestError("El id de la dependencia debe ser un número");

    await prisma.dependencia.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Dependencia eliminada correctamente" }, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
