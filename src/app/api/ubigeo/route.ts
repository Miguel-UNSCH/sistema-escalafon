/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const inei = searchParams.get("inei");
    const reniec = searchParams.get("reniec");
    const departamento = searchParams.get("departamento");
    const provincia = searchParams.get("provincia");
    const distrito = searchParams.get("distrito");

    const filters: any = {};

    if (inei) filters.inei = inei;
    if (reniec) filters.reniec = reniec;
    if (departamento) filters.departamento = departamento;
    if (provincia) filters.provincia = provincia;
    if (distrito) filters.distrito = distrito;

    if (Object.keys(filters).length === 0) {
      const ubigeos = await prisma.ubigeo.findMany();
      return NextResponse.json(ubigeos, { status: 200 });
    }

    const ubigeos = await prisma.ubigeo.findMany({ where: filters });
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
