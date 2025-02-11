/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/** modificar para que la busqueda por query no sea exclusiva, si no inclusiva */
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre = searchParams.get("nombre");

    const filters: any = {};

    if (nombre) filters.nombre = nombre;

    if (Object.keys(filters).length === 0) {
      const cargos = await prisma.cargo.findMany();
      return NextResponse.json(cargos, { status: 200 });
    }

    const cargos = await prisma.cargo.findMany({ where: filters });
    return NextResponse.json(cargos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al obtener Ubigeos" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const cargo = await req.json();
    const newCargo = await prisma.cargo.create({ data: cargo });
    return NextResponse.json(newCargo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
