import { NextRequest, NextResponse } from "next/server";

import { CustomError, handleError } from "@/middleware/errorHandler";
import { prisma } from "@/lib/prisma";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";

interface Params {
  params: Promise<{ id: string }>;
}
export const GET = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id del cargo");
    if (isNaN(parseInt(id))) throw BadRequestError("El id del cargo debe ser un número");

    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
    if (!cargo) throw NotFoundError("Cargo no encontrado");

    return NextResponse.json(cargo, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id del cargo");
    if (isNaN(parseInt(id))) throw BadRequestError("El id del cargo debe ser un número");

    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
    if (!cargo) throw NotFoundError("Cargo no encontrado");

    const { nombre } = await req.json();
    if (!nombre) throw BadRequestError("Falta el nombre del cargo");

    const updatedCargo = await prisma.cargo.update({ where: { id: parseInt(id) }, data: { nombre } });
    if (!updatedCargo) throw BadRequestError("No se pudo actualizar el cargo");

    return NextResponse.json(updatedCargo, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) throw BadRequestError("Falta el id del cargo");
    if (isNaN(parseInt(id))) throw BadRequestError("El id del cargo debe ser un número");

    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
    if (!cargo) throw NotFoundError("Cargo no encontrado");

    const deleteCargo = await prisma.cargo.delete({ where: { id: parseInt(id) } });
    if (!deleteCargo) throw BadRequestError("No se pudo eliminar el cargo");

    return NextResponse.json({ message: "Cargo eliminado correctamente" }, { status: 200 });
  } catch (error: unknown) {
    return handleError(error as CustomError);
  }
};
