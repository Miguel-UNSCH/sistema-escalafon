// eslint-disable no-console
/* eslint-disable no-unused-vars */
"use server";

import { prisma } from "@/config/prisma.config";
import { ZCargo, ZDependencia, ZUbigeo } from "@/lib/schemas/others-schema";
import { Cargo, Dependencia, Prisma, Ubigeo } from "@prisma/client";

export async function getUbigeos(search?: string): Promise<{ success: boolean; message?: string; data?: Ubigeo[] }> {
  try {
    const searchFilter =
      search && search.trim() !== ""
        ? {
            OR: [
              { inei: { contains: search, mode: Prisma.QueryMode.insensitive } },
              { reniec: { contains: search, mode: Prisma.QueryMode.insensitive } },
              { departamento: { contains: search, mode: Prisma.QueryMode.insensitive } },
              { provincia: { contains: search, mode: Prisma.QueryMode.insensitive } },
              { distrito: { contains: search, mode: Prisma.QueryMode.insensitive } },
            ],
          }
        : {};

    const ubigeos: Ubigeo[] = await prisma.ubigeo.findMany({
      where: searchFilter,
      orderBy: { inei: "asc" },
    });

    if (!ubigeos.length) throw new Error("No se encontraron ubigeos.");

    return { success: true, data: ubigeos };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los ubigeos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
}

/** ---------------------------------------------------------------------------------------------------------------- */
export const getCargos = async (search?: string): Promise<{ success: boolean; message?: string; data?: Cargo[] }> => {
  try {
    const cargos: Cargo[] | null = await prisma.cargo.findMany({
      where: { nombre: { contains: search, mode: Prisma.QueryMode.insensitive } },
      orderBy: { nombre: "asc" },
    });
    if (!cargos.length) throw new Error("No se encontraron cargos.");

    return { success: true, data: cargos };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los cargos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

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
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteCargo = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const existingCargo = await prisma.cargo.findUnique({ where: { id } });
    if (!existingCargo) return { success: false, message: "El cargo no existe." };

    await prisma.cargo.delete({ where: { id } });

    return { success: true, message: "Cargo eliminado correctamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al elimar cargo.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

/** ---------------------------------------------------------------------------------------------------------------- */
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

export const getDependencias = async (search?: string): Promise<{ success: boolean; message?: string; data?: Dependencia[] }> => {
  try {
    const dependencias: Dependencia[] | null = await prisma.dependencia.findMany({
      where: { OR: [{ nombre: { contains: search, mode: Prisma.QueryMode.insensitive } }, { codigo: { contains: search, mode: Prisma.QueryMode.insensitive } }] },
      orderBy: { nombre: "asc" },
    });
    if (!dependencias.length) throw new Error("No se encontraron dependencias.");

    return { success: true, data: dependencias };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las dependencias.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
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
  } catch (error: unknown) {
    let errorMessage = "Error al crear la dependencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
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
  } catch (error: unknown) {
    let errorMessage = "Error al actualizar la dependencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteDependencia = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const existingDependencia: Dependencia | null = await prisma.dependencia.findUnique({ where: { id } });
    if (!existingDependencia) return { success: false, message: "La dependencia no existe." };

    await prisma.dependencia.delete({ where: { id } });

    return { success: true, message: "Dependencia eliminada correctamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al elimar dependencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
