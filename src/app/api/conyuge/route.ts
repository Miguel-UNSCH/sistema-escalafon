import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { conyugeSchema } from "@/lib/schemas/conyuge.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, ConflictError, NotFoundError } from "@/utils/customErrors";

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) throw BadRequestError("El ID de usuario es requerido.");

    const conyuge = await prisma.conyuge.findUnique({ where: { userId }, include: { user: true, personal: true } });

    if (!conyuge) throw NotFoundError("Cónyuge no encontrado.");

    return NextResponse.json(conyuge, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const values = await request.json();

    const result = conyugeSchema.safeParse(values);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      throw BadRequestError(errorMessages);
    }

    const validatedConyuge = result.data;

    const personal = await prisma.personal.findUnique({ where: { id: validatedConyuge.personalId } });
    if (!personal) throw NotFoundError("El personal proporcionado no existe.");
    if (!["C", "V"].includes(personal.estadoCivil)) throw ConflictError("El personal no es casado o viudo");

    const ubigeo = await prisma.ubigeo.findFirst({
      where: {
        departamento: { equals: validatedConyuge.departamento, mode: "insensitive" },
        provincia: { equals: validatedConyuge.provincia, mode: "insensitive" },
        distrito: { equals: validatedConyuge.distrito, mode: "insensitive" },
      },
    });
    if (!ubigeo) throw BadRequestError("El ubigeo proporcionado no existe.");

    const newUser = await prisma.user.create({
      data: {
        nombres: validatedConyuge.nombres,
        apellidos: validatedConyuge.apellidos,
        ubigeoId: ubigeo.id,
        status: validatedConyuge.status,
      },
    });

    const newConyuge = await prisma.conyuge.create({
      data: {
        userId: newUser.id,
        fechaNacimiento: new Date(validatedConyuge.fechaNacimiento),
        gradoInstruccion: validatedConyuge.gradoInstruccion,
        profesion: validatedConyuge.profesion,
        ocupacion: validatedConyuge.ocupacion,
        centroTrabajo: validatedConyuge.centroTrabajo,
        postgrado: validatedConyuge.postgrado,
        status: validatedConyuge.status,
      },
    });

    await prisma.personal.update({ where: { id: validatedConyuge.personalId }, data: { conyugeId: newConyuge.id } });

    return NextResponse.json(newConyuge, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
