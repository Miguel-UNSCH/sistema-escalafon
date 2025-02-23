import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { BadRequestError } from "@/utils/customErrors";
import { CustomError, handleError } from "@/middleware/errorHandler";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const inei: string | null = searchParams.get("inei");
    const reniec: string | null = searchParams.get("reniec");
    const departamento: string | null = searchParams.get("departamento");
    const provincia: string | null = searchParams.get("provincia");
    const distrito: string | null = searchParams.get("distrito");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};

    if (inei) filters.inei = { contains: inei, mode: "insensitive" };
    if (reniec) filters.reniec = { contains: reniec, mode: "insensitive" };
    if (departamento) filters.departamento = { contains: departamento, mode: "insensitive" };
    if (provincia) filters.provincia = { contains: provincia, mode: "insensitive" };
    if (distrito) filters.distrito = { contains: distrito, mode: "insensitive" };

    if (!Object.keys(filters).length) {
      const ubigeos = await prisma.ubigeo.findMany();
      if (!ubigeos.length) throw BadRequestError("ubigeo(s) no encontrados");
      return NextResponse.json(ubigeos, { status: 200 });
    }

    const ubigeos = await prisma.ubigeo.findMany({ where: filters });
    if (!ubigeos.length) throw BadRequestError("ubigeo(s) no encontrado(s)");

    return NextResponse.json(ubigeos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
