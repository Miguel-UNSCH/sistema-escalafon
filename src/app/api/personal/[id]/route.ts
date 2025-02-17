import { IParams } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { ForbiddenError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw ForbiddenError("Falta el id del personal");
    if (isNaN(parseInt(id))) throw ForbiddenError("El id del personal debe ser un número");

    const personal = await prisma.personal.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        dependencia: true,
        cargo: true,
        discapacidades: true,
        hijos: true,
        estudios: true,
        capacitaciones: true,
        experiencias: true,
        contratos: true,
        renuncias: true,
        desplazamientos: true,
        descansos: true,
        permisos: true,
        ascensos: true,
        bonificacionesPersonales: true,
        bonificacionesFamiliares: true,
        evaluaciones: true,
        meritos: true,
        demeritos: true,
        actasCreadas: true,
        actasRecibidas: true,
      },
    });

    if (!personal) throw NotFoundError("Personal no encontrado");

    return NextResponse.json(personal, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const DELETE = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw ForbiddenError("Falta el id del usuario");
    if (isNaN(parseInt(id))) throw ForbiddenError("El id del usuario debe ser un número");

    const user = await prisma.personal.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw NotFoundError("Usuario no encontrado");

    const delPersonal = await prisma.personal.delete({ where: { id: parseInt(id) } });
    if (!delPersonal) throw ForbiddenError("No se pudo eliminar el usuario");

    return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
