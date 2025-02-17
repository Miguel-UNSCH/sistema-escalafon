import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { CustomError, handleError } from "@/middleware/errorHandler";
import { BadRequestError, ConflictError, NotFoundError } from "@/utils/customErrors";
import { Cargo, cargoSchema } from "@/lib/schemas/cargo.schema";
import { errMessages } from "@/helpers";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre: string | null = searchParams.get("nombre");

    if (nombre) {
      const cargos = await prisma.cargo.findMany({ where: { nombre: { contains: nombre, mode: "insensitive" } } });
      if (!cargos.length) throw NotFoundError("Cargos no encontrados con ese nombre");
      return NextResponse.json(cargos, { status: 200 });
    }

    const cargos = await prisma.cargo.findMany();
    if (!cargos.length) throw NotFoundError("Cargos no encontrados");

    return NextResponse.json(cargos, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const values: Cargo = await req.json();

    const { data, success, error } = cargoSchema.safeParse(values);
    if (!success) throw BadRequestError(errMessages(error));

    if (data?.nombre) {
      const cargoExiste = await prisma.cargo.findFirst({ where: { nombre: data?.nombre } });
      if (cargoExiste) throw ConflictError("El cargo ya existe");
    }

    const newCargo = await prisma.cargo.create({ data });
    return NextResponse.json(newCargo, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
