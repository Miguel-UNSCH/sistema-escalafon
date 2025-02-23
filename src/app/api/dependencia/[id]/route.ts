import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { IParams } from "@/interfaces";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";

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
