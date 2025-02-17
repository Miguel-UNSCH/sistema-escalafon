import { prisma } from "@/lib/prisma";
import { hijoSchema } from "@/lib/schemas/hijo.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (r: NextRequest) => {
  try {
    const { searchParams } = r.nextUrl;
    const personalId = searchParams.get("personalId");
    const nombres = searchParams.get("nombres");
    const apellidos = searchParams.get("apellidos");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (personalId) where.personalId = parseInt(personalId, 10);
    if (nombres) where.User = { nombres: { contains: nombres, mode: "insensitive" } };
    if (apellidos) where.User = { ...where.User, apellidos: { contains: apellidos, mode: "insensitive" } };

    const hijos = await prisma.hijo.findMany({ where, include: { user: true } });
    if (!hijos.length) throw NotFoundError("Hijo(s) no encontrado(s)");

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

    const ubigeo = await prisma.ubigeo.findFirst({
      where: {
        departamento: { equals: validatedHijo.ubigeo.departamento, mode: "insensitive" },
        provincia: { equals: validatedHijo.ubigeo.provincia, mode: "insensitive" },
        distrito: { equals: validatedHijo.ubigeo.distrito, mode: "insensitive" },
      },
    });
    if (!ubigeo) throw BadRequestError("El ubigeo proporcionado no existe.");

    const newUser = await prisma.user.create({
      data: {
        nombres: validatedHijo.nombres,
        apellidos: validatedHijo.apellidos,
        ubigeoId: ubigeo.id,
      },
    });

    const newHijo = await prisma.hijo.create({
      data: {
        userId: newUser.id,
        personalId: validatedHijo.personalId,
        fechaNacimiento: validatedHijo.fechaNacimiento,
        edad: validatedHijo.edad,
        gradoInstruccion: validatedHijo.gradoInstruccion,
      },
    });

    await prisma.personal.update({
      where: { id: validatedHijo.personalId },
      data: {
        hijos: {
          connect: { id: newHijo.id },
        },
      },
    });

    return NextResponse.json(newHijo, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
