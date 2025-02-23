import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { IParams } from "@/interfaces";
import { ForbiddenError } from "@/utils/customErrors";
import { CustomError, handleError } from "@/middleware/errorHandler";

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
