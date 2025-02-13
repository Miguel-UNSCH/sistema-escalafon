import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { ForbiddenError } from "@/utils/customErrors";
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

    const { role } = await r.json();
    if (!role) throw ForbiddenError("Falta el role del usuario");

    await prisma.user.update({ where: { id }, data: { role } });
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const DELETE = async (_: NextRequest, { params }: IParams) => {
  try {
    const { id } = await params;
    if (!id) throw ForbiddenError("Falta el id del usuario");

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "Usuario eliminado correctamente" }, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
