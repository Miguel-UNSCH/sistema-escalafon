import { NextRequest, NextResponse } from "next/server";

import { CustomError, handleError } from "@/middleware/errorHandler";
import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/utils/customErrors";

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
    const { nombre } = await req.json();
    if (!nombre) throw new Error("Falta el nombre del cargo");

    if (nombre) {
      const cargoExiste = await prisma.cargo.findFirst({ where: { nombre } });
      if (cargoExiste) throw new Error("El cargo ya existe");
    }

    const newCargo = await prisma.cargo.create({ data: { nombre } });
    return NextResponse.json(newCargo, { status: 201 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
