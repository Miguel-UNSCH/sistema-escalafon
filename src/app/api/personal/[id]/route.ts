import { errMessages } from "@/helpers";
import { IParams } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { personalSchema } from "@/lib/schemas/personal.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, ForbiddenError, NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw ForbiddenError("Falta el id del usuario");
    if (isNaN(parseInt(id))) throw ForbiddenError("El id del usuario debe ser un número");

    const user = await prisma.personal.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw NotFoundError("Usuario no encontrado");

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const PUT = async (r: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw ForbiddenError("Falta el id del usuario");
    if (isNaN(parseInt(id))) throw ForbiddenError("El id del usuario debe ser un número");

    const user = await prisma.personal.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw NotFoundError("Usuario no encontrado");

    const values = await r.json();
    const { data, success, error } = personalSchema.safeParse(values);
    if (!success) throw BadRequestError(errMessages(error));

    const newUser = await prisma.personal.update({ where: { id: parseInt(id) }, data });
    if (!newUser) throw ForbiddenError("No se pudo actualizar el usuario");

    return NextResponse.json(newUser, { status: 200 });
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
