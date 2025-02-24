import { prisma } from "@/lib/prisma";
import { hijoSchema } from "@/lib/schemas/hijo.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const personalId = searchParams.get("personalId");
    if (!personalId) throw BadRequestError("El ID del personal es obligatorio.");

    const hijos = await prisma.hijo.findMany({ where: { personalId: parseInt(personalId, 10) } });
    if (!hijos.length) throw NotFoundError("No se encontraron hijos asociados al personal.");

    return NextResponse.json(hijos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const values = await request.json();

    const result = hijoSchema.safeParse(values);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      throw BadRequestError(errorMessages);
    }

    const validatedHijo = result.data;

    const personal = await prisma.personal.findUnique({ where: { id: validatedHijo.personalId } });
    if (!personal) throw NotFoundError("El personal proporcionado no existe.");

    const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: validatedHijo.ubigeo.inei } });
    if (!ubigeo) throw BadRequestError("El ubigeo proporcionado no existe.");

    const newHijo = await prisma.hijo.create({
      data: {
        personalId: validatedHijo.personalId,
        nombres: validatedHijo.nombres,
        apellidos: validatedHijo.apellidos,
        fechaNacimiento: validatedHijo.fechaNacimiento,
        gradoInstruccion: validatedHijo.gradoInstruccion,
        ubigeoId: ubigeo.id,
      },
    });

    return NextResponse.json(newHijo, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
