import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError } from "@/utils/customErrors";

interface IFilters {
  inei?: string;
  reniec?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const inei = searchParams.get("inei");
    const reniec = searchParams.get("reniec");
    const departamento = searchParams.get("departamento");
    const provincia = searchParams.get("provincia");
    const distrito = searchParams.get("distrito");

    const filters: IFilters = {};

    if (inei) filters.inei = inei;
    if (reniec) filters.reniec = reniec;
    if (departamento) filters.departamento = departamento;
    if (provincia) filters.provincia = provincia;
    if (distrito) filters.distrito = distrito;

    if (!Object.keys(filters).length) {
      const ubigeos = await prisma.ubigeo.findMany();
      if (!ubigeos.length) throw BadRequestError("ubigeo(s) no encontrados");
      return NextResponse.json(ubigeos, { status: 200 });
    }

    const ubigeos = await prisma.ubigeo.findMany({ where: filters });
    if (ubigeos.length === 0) throw BadRequestError("ubigeo(s) no encontrado(s)");
    return NextResponse.json(ubigeos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
