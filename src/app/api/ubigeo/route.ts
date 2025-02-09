/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    const { departamento, provincia, distrito } = await req.json();

    const newUbigeo = await prisma.ubigeo.create({
      data: { departamento, provincia, distrito },
    });

    return NextResponse.json(newUbigeo, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Error al crear Ubigeo" }, { status: 500 });
  }
};
