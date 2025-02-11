/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { BadRequestError, NotFoundError } from "@/utils/customErrors";
import { handleError } from "@/middleware/errorHandler";

interface Params {
  params: Promise<{ id: string }>;
}
export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    if (!id) throw BadRequestError("Falta el id del cargo");
    if (isNaN(parseInt(id))) throw BadRequestError("El id del cargo debe ser un número");

    const cargo = await prisma.cargo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cargo) throw NotFoundError("Cargo no encontrado");

    return NextResponse.json(cargo, { status: 200 });
  } catch (error: any) {
    return handleError(error);
  }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
    if (!cargo) return NextResponse.json({ error: "Cargo no encontrado" }, { status: 404 });

    const { nombre } = await req.json();
    const updatedCargo = await prisma.cargo.update({
      where: { id: parseInt(id) },
      data: { nombre },
    });

    return NextResponse.json(updatedCargo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
    if (!cargo) return NextResponse.json({ error: "Cargo no encontrado" }, { status: 404 });
    await prisma.cargo.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Cargo eliminado correctamente" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
