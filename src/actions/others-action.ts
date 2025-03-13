// eslint-disable no-console
/* eslint-disable no-unused-vars */
"use server";

import { prisma } from "@/config/prisma.config";
import { ZCargo, ZDependencia, ZUbigeo } from "@/lib/schemas/others-schema";
import { Cargo, Dependencia } from "@prisma/client";

export async function getUbigeos({ departamento, provincia, distrito }: { departamento?: string; provincia?: string; distrito?: string }) {
  try {
    const filters: any = {};

    if (departamento) filters.departamento = departamento;
    if (provincia) filters.provincia = provincia;
    if (distrito) filters.distrito = distrito;

    const ubigeos: ZUbigeo[] | null = await prisma.ubigeo.findMany({ where: filters, orderBy: { inei: "asc" } });
    if (!ubigeos) throw new Error("No se encontraron ubigeos.");

    return ubigeos;
  } catch (error) {
    console.error("Error al obtener ubigeos:", error);
    throw new Error("Error al obtener los ubigeos");
  }
}

export const getAllCargos = async (nombre?: string) => {
  try {
    const cargos: Cargo[] | null = await prisma.cargo.findMany({ where: nombre ? { nombre: { contains: nombre, mode: "insensitive" } } : undefined, orderBy: { nombre: "asc" } });
    return cargos;
  } catch (error) {
    return null;
  }
};

export const getCargo = async (id: number): Promise<Cargo | null> => {
  try {
    const currentCargo: Cargo | null = await prisma.cargo.findUnique({ where: { id } });
    return currentCargo;
  } catch (error) {
    return null;
  }
};

export const createCargo = async (data: ZCargo): Promise<{ success: boolean; message: string }> => {
  try {
    const nombreUpperCase = data.nombre.trim().toUpperCase();

    const currentCargo = await prisma.cargo.findFirst({ where: { nombre: { equals: nombreUpperCase } } });
    if (currentCargo) return { success: false, message: "El cargo ya existe." };

    await prisma.cargo.create({ data: { nombre: nombreUpperCase } });

    return { success: true, message: "Cargo creado exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const patchCargo = async (id: number, nombre: string): Promise<{ success: boolean; message: string }> => {
  try {
    const nombreUpperCase = nombre.trim().toUpperCase();

    const existingCargo = await prisma.cargo.findFirst({ where: { nombre: nombreUpperCase } });
    if (existingCargo) return { success: false, message: "Ya existe un cargo con ese nombre." };

    await prisma.cargo.update({ where: { id }, data: { nombre: nombreUpperCase } });

    return { success: true, message: "Cargo actualizado correctamente." };
  } catch (error) {
    return { success: false, message: "Error al actualizar el cargo." };
  }
};

export const deleteCargo = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const existingCargo = await prisma.cargo.findUnique({ where: { id } });
    if (!existingCargo) return { success: false, message: "El cargo no existe." };

    await prisma.cargo.delete({ where: { id } });

    return { success: true, message: "Cargo eliminado correctamente." };
  } catch (error) {
    return { success: false, message: "Error al eliminar el cargo." };
  }
};

export const getAllDependencias = async (params?: { nombre?: string; codigo?: string }): Promise<Dependencia[] | null> => {
  try {
    const filters: any = {};

    if (params?.nombre) {
      filters.nombre = { contains: params.nombre, mode: "insensitive" };
    }
    if (params?.codigo) {
      filters.codigo = { contains: params.codigo, mode: "insensitive" };
    }

    const dependencias = await prisma.dependencia.findMany({
      where: Object.keys(filters).length ? filters : undefined,
      orderBy: { nombre: "asc" },
    });

    return dependencias;
  } catch (error) {
    console.error("Error al obtener las dependencias:", error);
    return null;
  }
};

export const getDependencia = async (id: number) => {
  try {
    const dependencia = await prisma.dependencia.findUnique({ where: { id } });
    return dependencia;
  } catch (error) {
    console.error(`Error al obtener la dependencia con ID ${id}:`, error);
    return null;
  }
};

export const createDependencia = async (data: ZDependencia): Promise<{ success: boolean; message: string }> => {
  try {
    const newData = {
      nombre: data.nombre.trim().toUpperCase(),
      direccion: data.direccion ? data.direccion.trim().toUpperCase() : null,
      codigo: data.codigo.trim().toUpperCase(),
    };

    const existingDependencia = await prisma.dependencia.findFirst({
      where: { OR: [{ nombre: newData.nombre }, { codigo: newData.codigo }] },
    });

    if (existingDependencia) return { success: false, message: "El nombre o código ya están en uso." };

    await prisma.dependencia.create({ data: newData });

    return { success: true, message: "Dependencia creada exitosamente." };
  } catch (error) {
    console.error("Error al crear la dependencia:", error);
    return { success: false, message: "Error al crear la dependencia." };
  }
};

export const updateDependencia = async (id: number, data: ZDependencia): Promise<{ success: boolean; message: string }> => {
  try {
    const updatedData = {
      nombre: data.nombre.trim().toUpperCase(),
      direccion: data.direccion ? data.direccion.trim().toUpperCase() : null,
      codigo: data.codigo.trim().toUpperCase(),
    };

    const existingDependencia = await prisma.dependencia.findFirst({
      where: { AND: [{ id: { not: id } }, { OR: [{ nombre: updatedData.nombre }, { codigo: updatedData.codigo }] }] },
    });
    if (existingDependencia) return { success: false, message: "El nombre o código ya están en uso." };

    await prisma.dependencia.update({ where: { id }, data: updatedData });

    return { success: true, message: "Dependencia actualizada correctamente." };
  } catch (error) {
    console.error(`Error al actualizar la dependencia con ID ${id}:`, error);
    return { success: false, message: "Error al actualizar la dependencia." };
  }
};

export const deleteDependencia = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const existingDependencia: Dependencia | null = await prisma.dependencia.findUnique({ where: { id } });
    if (!existingDependencia) return { success: false, message: "La dependencia no existe." };

    await prisma.dependencia.delete({ where: { id } });

    return { success: true, message: "Dependencia eliminada correctamente." };
  } catch (error) {
    console.error(`Error al eliminar la dependencia con ID ${id}:`, error);
    return { success: false, message: "Error al eliminar la dependencia." };
  }
};
