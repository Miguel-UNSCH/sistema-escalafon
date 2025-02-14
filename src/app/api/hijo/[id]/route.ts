import { IParams } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, ForbiddenError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;

    if (!id) throw BadRequestError("Falta el id del personal");
    if (isNaN(parseInt(id))) throw ForbiddenError("El id del personal debe ser un número");

    const hijo = await prisma.hijo.findUnique({
      where: { id: Number(id) },
      include: {
        User: true,
        personales: true,
      },
    });

    if (!hijo) throw NotFoundError(`No se encontró un registro de Hijo con el ID ${id}`);

    return NextResponse.json(hijo, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
