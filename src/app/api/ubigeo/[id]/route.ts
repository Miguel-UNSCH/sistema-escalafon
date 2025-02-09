/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export const DELETE = async (_: any, { params }: Params) => {
  try {
    const { id } = await params;

    await prisma.ubigeo.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Ubigeo eliminado correctamente" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al eliminar Ubigeo" }, { status: 500 });
  }
};
