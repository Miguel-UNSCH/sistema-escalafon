import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { estudioSchema } from "@/lib/schemas/estudio.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const personalId = searchParams.get("personalId");

    if (!personalId) throw BadRequestError("El ID del personal es requerido.");

    const estudios = await prisma.estudios.findMany({
      where: { personalId: parseInt(personalId, 10) },
    });

    if (!estudios.length) throw NotFoundError("No se encontraron estudios para este personal.");

    return NextResponse.json(estudios, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validation = estudioSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.errors.map((err) => err.message).join(", ");
      throw BadRequestError(errorMessages);
    }

    const validatedData = validation.data;

    const personal = await prisma.personal.findUnique({
      where: { id: validatedData.personalId },
    });
    if (!personal) throw NotFoundError("El personal proporcionado no existe.");

    const newEstudio = await prisma.estudios.create({
      data: {
        personalId: validatedData.personalId,
        nivel: validatedData.nivel,
        periodo: JSON.stringify(validatedData.periodo), // Convertir a JSON
        institucion: validatedData.institucion,
        otrosEstudios: validatedData.otrosEstudios,
      },
    });

    return NextResponse.json(newEstudio, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
