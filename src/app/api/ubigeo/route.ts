/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async () => {
  try {
    const ubigeos = await prisma.ubigeo.findMany();
    return NextResponse.json(ubigeos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al obtener Ubigeos" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const ubigeos: Array<{ inei: string; reniec: string; departamento: string; provincia: string; distrito: string }> = await req.json();

    const newUbigeos = await prisma.ubigeo.createMany({
      data: ubigeos,
    });

    return NextResponse.json(newUbigeos, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Error al crear Ubigeos" }, { status: 500 });
  }
};
