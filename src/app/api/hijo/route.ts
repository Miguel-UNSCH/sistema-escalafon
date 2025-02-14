import { errMessages } from "@/helpers";
import { prisma } from "@/lib/prisma";
import { hijoSchema } from "@/lib/schemas/hijo.schema";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, ConflictError, NotFoundError } from "@/utils/customErrors";
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

    const hijos = await prisma.hijo.findMany({ where, include: { User: true } });
    if (!hijos.length) throw NotFoundError("Hijo(s) no encontrado(s)");

    return NextResponse.json(hijos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const values = await req.json();

    const { data, success, error } = hijoSchema.safeParse(values);
    if (!success) throw BadRequestError(errMessages(error));

    let ubigeoId = null;
    if (data.departamento && data.provincia && data.distrito) {
      const ubigeo = await prisma.ubigeo.findFirst({
        where: { departamento: data.departamento, provincia: data.provincia, distrito: data.distrito },
      });
      if (!ubigeo) throw BadRequestError("Ubigeo no encontrado");
      ubigeoId = ubigeo.id;
    } else if (data.inei || data.reniec) {
      const ubigeo = await prisma.ubigeo.findFirst({ where: { inei: data.inei || undefined, reniec: data.reniec || undefined } });
      if (!ubigeo) throw BadRequestError("Ubigeo no encontrado por INEI/RENIEC");
      ubigeoId = ubigeo.id;
    }

    let user = await prisma.user.findFirst({ where: { nombres: data.nombres, apellidos: data.apellidos } });
    if (!user) user = await prisma.user.create({ data: { nombres: data.nombres, apellidos: data.apellidos, ubigeoId } });
    else await prisma.user.update({ where: { id: user.id }, data: { ubigeoId } });

    const hijoData = {
      userId: user.id,
      personalId: data.personalId,
      fechaNacimiento: data.fechaNacimiento,
      edad: data.edad,
      gradoInstruccion: data.gradoInstruccion,
    };

    const newHijo = await prisma.hijo.create({ data: hijoData });
    if (!newHijo) throw ConflictError("Hijo no creado");
    await prisma.user.update({ where: { id: user.id }, data: { hijoId: newHijo.id } });

    return NextResponse.json(newHijo, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
