import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/middleware/errorHandler";
import { BadRequestError, CustomError } from "@/utils/customErrors";

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("id no proporcionado");
    if (isNaN(parseInt(id))) throw BadRequestError("id debe ser un número");

    const ubigeo = await prisma.ubigeo.findUnique({ where: { id: parseInt(id) } });

    if (!ubigeo) throw BadRequestError("ubigeo no encontrado");

    return NextResponse.json(ubigeo, { status: 200 });
  } catch (error: unknown) {
    // Aseguramos que el error sea de tipo CustomError
    if ((error as CustomError).statusCode) return handleError(error as CustomError); // Usamos la función handleError con el tipo CustomError

    // Si el error no es un CustomError, lo manejamos como un error genérico
    return handleError({
      statusCode: 500,
      message: "Error interno del servidor",
    });
  }
};
