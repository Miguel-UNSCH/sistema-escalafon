/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export const GET = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    const dependenciaOficina = await prisma.dependenciaOficina.findUnique({ where: { id: parseInt(id) } });
    if (!dependenciaOficina) return NextResponse.json({ error: "datos no encontrados" }, { status: 500 });
    return NextResponse.json(dependenciaOficina, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al obtener DependenciaOficinas" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Falta el id de la dependencia" }, { status: 400 });
    const dependenciaOficina = await prisma.dependenciaOficina.findUnique({ where: { id: parseInt(id) } });
    if (!dependenciaOficina) return NextResponse.json({ error: "datos no encontrados" }, { status: 500 });

    const { nombre, direccion, codigo } = await req.json();
    const updatedDependenciaOficina = await prisma.dependenciaOficina.update({
      where: { id: parseInt(id) },
      data: { nombre, direccion, codigo },
    });

    return NextResponse.json(updatedDependenciaOficina, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al actualzar DependenciaOficina" }, { status: 500 });
  }
};

export const DELETE = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    await prisma.dependenciaOficina.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Dependencia eliminada correctamente" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al eliminar Dependencia" }, { status: 500 });
  }
};
