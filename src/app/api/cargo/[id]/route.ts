import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { IParams } from "@/interfaces";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";

export const GET = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id del cargo");
    if (isNaN(parseInt(id))) throw BadRequestError("El id del cargo debe ser un número");

    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
    if (!cargo) throw NotFoundError("Cargo no encontrado");

    return NextResponse.json(cargo, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
