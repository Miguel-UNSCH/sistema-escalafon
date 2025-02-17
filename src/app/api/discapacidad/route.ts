import { prisma } from "@/lib/prisma";
import { discapacidadSchema } from "@/lib/schemas/discapaciad.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const personalId = searchParams.get("personalId");

    if (!personalId) throw BadRequestError("El parámetro 'personalId' es obligatorio.");

    const parsedPersonalId = parseInt(personalId, 10);
    if (isNaN(parsedPersonalId)) throw BadRequestError("El parámetro 'personalId' debe ser un número válido.");

    const discapacidades = await prisma.discapacidad.findMany({ where: { personalId: parsedPersonalId } });

    if (!discapacidades.length)
      return NextResponse.json({ message: `No se encontraron discapacidades para el personal con ID ${personalId}.` }, { status: 404 });

    return NextResponse.json(discapacidades, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const result = discapacidadSchema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      throw BadRequestError(errorMessages);
    }

    const validatedDiscapacidad = result.data;

    const personal = await prisma.personal.findUnique({ where: { id: validatedDiscapacidad.personalId } });

    if (!personal) throw BadRequestError("El personal con el ID proporcionado no existe.");

    if (!personal.discapacidad) throw BadRequestError("El personal no está registrado como una persona con discapacidad.");

    const newDiscapacidad = await prisma.discapacidad.create({
      data: {
        personalId: personal.id,
        tipo: validatedDiscapacidad.tipo,
        documentoSustento: validatedDiscapacidad.documentoSustento,
        organoEstructurado: validatedDiscapacidad.organoEstructurado,
        condicionLaboral: validatedDiscapacidad.condicionLaboral,
      },
    });

    return NextResponse.json(newDiscapacidad, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
