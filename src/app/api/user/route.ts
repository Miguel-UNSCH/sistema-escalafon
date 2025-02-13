import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { NotFoundError } from "@/utils/customErrors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (r: NextRequest) => {
  try {
    const { searchParams } = r.nextUrl;
    const nombres = searchParams.get("nombres");
    const apellidos = searchParams.get("apellidos");
    const role = searchParams.get("role");
    const email = searchParams.get("email");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (nombres) where.nombres = { contains: nombres };

    if (apellidos) where.apellidos = { contains: apellidos };

    if (role) where.role = role as "Role";

    if (email) where.email = email;

    const users = await prisma.user.findMany({ where: where });

    if (!users || users.length === 0) throw NotFoundError("Usuarios no encontrados");

    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
