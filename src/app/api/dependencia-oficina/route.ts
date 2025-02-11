/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const nombre = searchParams.get("nombre");
    const direccion = searchParams.get("direccion");
    const codigo = searchParams.get("codigo");

    const filters: any = {};

    if (nombre) filters.nombre = nombre;
    if (direccion) filters.direccion = direccion;
    if (codigo) filters.codigo = codigo;

    if (Object.keys(filters).length === 0) {
      const dependenciaOficinas = await prisma.dependenciaOficina.findMany();
      if (dependenciaOficinas.length === 0) return NextResponse.json({ error: "DependenciaOficinas no encontradas" }, { status: 404 });
      return NextResponse.json(dependenciaOficinas, { status: 200 });
    }

    const dependenciaOficinas = await prisma.dependenciaOficina.findMany({ where: filters });
    if (dependenciaOficinas.length === 0) return NextResponse.json({ error: "DependenciaOficinas no encontradas" }, { status: 404 });
    return NextResponse.json(dependenciaOficinas, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const dependenciaOficina = await req.json();
    const newDependenciaOficina = await prisma.dependenciaOficina.create({ data: dependenciaOficina });
    return NextResponse.json(newDependenciaOficina, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al crear DependenciaOficina" }, { status: 500 });
  }
};
