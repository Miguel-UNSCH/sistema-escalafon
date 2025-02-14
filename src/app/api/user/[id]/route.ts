import { errMessages } from "@/helpers";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/zod";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, ConflictError, ForbiddenError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}

export const GET = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw ForbiddenError("Falta el id del usuario");

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw ForbiddenError("Usuario no encontrado");

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const PATCH = async (r: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw ForbiddenError("Usuario no encontrado");

    const values = await r.json();
    const { data, success, error } = userSchema.pick({ role: true }).safeParse(values);
    if (!success) throw BadRequestError(errMessages(error));
    if (user.role === data.role) throw ConflictError("Estas tratando de actualizar el mismo rol");

    const newUser = await prisma.user.update({ where: { id }, data: { role: data.role } });
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

    const delUser = await prisma.user.delete({ where: { id } });
    if (!delUser) throw ForbiddenError("No se pudo eliminar el usuario");

    return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
