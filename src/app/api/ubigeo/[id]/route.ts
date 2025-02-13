import { NextRequest, NextResponse } from "next/server";

import { CustomError, handleError } from "@/middleware/errorHandler";
import { prisma } from "@/lib/prisma";
import { BadRequestError } from "@/utils/customErrors";

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("id no proporcionado");
    if (isNaN(parseInt(id))) throw BadRequestError("id debe ser un número");

    const ubigeo = await prisma.ubigeo.findUnique({ where: { id: parseInt(id) } });
    if (!ubigeo) throw BadRequestError("ubigeo no encontrado");

    return NextResponse.json(ubigeo, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
