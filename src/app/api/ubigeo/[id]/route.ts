/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    const ubigeo = await prisma.ubigeo.findUnique({ where: { id: parseInt(id) } });

    if (!ubigeo) return NextResponse.json({ error: "Ubigeo no encontrado" }, { status: 404 });

    return NextResponse.json(ubigeo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener Ubigeo(s)" }, { status: 500 });
  }
};

export const DELETE = async (_: any, { params }: Params) => {
  try {
    const { id } = await params;

    await prisma.ubigeo.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Ubigeo eliminado correctamente" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al eliminar Ubigeo" }, { status: 500 });
  }
};
