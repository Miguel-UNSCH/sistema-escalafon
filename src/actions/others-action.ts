"use server";

import { prisma } from "@/config/prisma.config";
import { ZCargo, ZDependencia } from "@/lib/schemas/others-schema";
import { Cargo, Dependencia, Prisma, Ubigeo } from "@prisma/client";

export const getUbigeos = async (search?: string): Promise<{ success: boolean; message?: string; data?: Ubigeo[] }> => {
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
};

export async function getUbigeosField({
  departamento,
  provincia,
  distrito,
}: {
  departamento?: string;
  provincia?: string;
  distrito?: string;
}): Promise<{ success: boolean; message?: string; data?: Ubigeo[] }> {
  try {
    const filters: any = {};

    if (departamento) filters.departamento = departamento;
    if (provincia) filters.provincia = provincia;
    if (distrito) filters.distrito = distrito;

    const ubigeos: Ubigeo[] | null = await prisma.ubigeo.findMany({ where: filters, orderBy: { inei: "asc" } });
    if (!ubigeos) throw new Error("No se encontraron ubigeos.");

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

export const getDependencia = async (id: number): Promise<{ success: boolean; message?: string; data?: Dependencia | null }> => {
  try {
    const response = await prisma.dependencia.findUnique({ where: { id } });
    if (!response) throw new Error("No se encontró la dependencia.");

    return { success: true, data: response };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener la dependencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
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

/** ---------------------------------------------------------------------------------------------------------------- */
export type cargoDependenciaRecord = {
  id: number;
  nombre: string;
  direccion: string | null;
  codigo: string;
  cargos: Cargo[];
};

export const getCargosDependencias = async (search?: string): Promise<{ success: boolean; message?: string; data?: cargoDependenciaRecord[] }> => {
  try {
    const dependencias = await prisma.dependencia.findMany({
      where: { OR: [{ nombre: { contains: search, mode: Prisma.QueryMode.insensitive } }, { codigo: { contains: search, mode: Prisma.QueryMode.insensitive } }] },
      orderBy: { codigo: "asc" },
      include: { cargos: { include: { cargo: true } } },
    });
    if (!dependencias.length) throw new Error("No se encontraron dependencias.");

    const response = dependencias.map((dependencia) => ({
      id: dependencia.id,
      nombre: dependencia.nombre,
      direccion: dependencia.direccion,
      codigo: dependencia.codigo,
      cargos: dependencia.cargos.map((cargoDep) => cargoDep.cargo),
    }));

    return { success: true, data: response };
  } catch (error) {
    let errorMessage = "Error al obtener las dependencias con cargos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getCargosDependenciasUser = async (id: string): Promise<{ success: boolean; message?: string; data?: cargoDependenciaRecord[] }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id } });
    if (!current_user) throw new Error("No se encontró el usuario.");

    const relaciones = await prisma.usuarioCargoDependencia.findMany({
      where: { userId: id },
      include: {
        cargoDependencia: {
          include: {
            cargo: true,
            dependencia: true,
          },
        },
      },
    });

    if (!relaciones.length) throw new Error("No se encontraron dependencias asociadas a este usuario.");

    const dependenciaMap = new Map<number, cargoDependenciaRecord>();

    for (const rel of relaciones) {
      const dep = rel.cargoDependencia.dependencia;
      const cargo = rel.cargoDependencia.cargo;

      if (!dependenciaMap.has(dep.id)) {
        dependenciaMap.set(dep.id, {
          id: dep.id,
          nombre: dep.nombre,
          direccion: dep.direccion,
          codigo: dep.codigo,
          cargos: [cargo],
        });
      } else {
        const existing = dependenciaMap.get(dep.id)!;
        if (!existing.cargos.some((c) => c.id === cargo.id)) {
          existing.cargos.push(cargo);
        }
      }
    }

    return {
      success: true,
      data: Array.from(dependenciaMap.values()),
    };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las dependencias con cargos.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getDependenciasUser = async (userId: string, search?: string): Promise<{ success: boolean; message?: string; data?: Dependencia[] }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: userId } });
    if (!current_user) throw new Error("No se encontró el usuario.");

    const relaciones = await prisma.usuarioCargoDependencia.findMany({
      where: { userId },
      include: {
        cargoDependencia: {
          include: { dependencia: true },
        },
      },
    });

    if (!relaciones.length) throw new Error("No se encontraron dependencias asociadas al usuario.");

    const dependenciaMap = new Map<number, Dependencia>();

    for (const rel of relaciones) {
      const dep = rel.cargoDependencia.dependencia;

      const matchesSearch = !search || dep.nombre.toLowerCase().includes(search.toLowerCase()) || dep.codigo.toLowerCase().includes(search.toLowerCase());

      if (matchesSearch && !dependenciaMap.has(dep.id)) {
        dependenciaMap.set(dep.id, dep);
      }
    }

    const result = Array.from(dependenciaMap.values());

    if (!result.length) throw new Error("No se encontraron dependencias que coincidan con la búsqueda.");

    return { success: true, data: result };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener las dependencias del usuario.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getCargosUser = async (userId: string, dependenciaId: number): Promise<{ success: boolean; message?: string; data?: Cargo[] }> => {
  try {
    const relaciones = await prisma.usuarioCargoDependencia.findMany({
      where: { userId },
      include: {
        cargoDependencia: {
          include: {
            dependencia: true,
            cargo: true,
          },
        },
      },
    });

    if (!relaciones.length) {
      throw new Error("El usuario no tiene cargos registrados.");
    }

    const cargosFiltrados = relaciones.filter((rel) => rel.cargoDependencia.dependencia.id === dependenciaId).map((rel) => rel.cargoDependencia.cargo);

    if (!cargosFiltrados.length) {
      throw new Error("El usuario no tiene cargos en la dependencia indicada.");
    }

    return {
      success: true,
      data: cargosFiltrados,
    };
  } catch (error: unknown) {
    let errorMessage = "Error al obtener los cargos del usuario en la dependencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const getCargosPorDependencia = async (dependencia_id: number): Promise<{ success: boolean; message?: string; data?: Cargo[] }> => {
  try {
    const dependencia = await prisma.dependencia.findUnique({
      where: { id: dependencia_id },
      include: { cargos: { include: { cargo: true } } },
    });

    if (!dependencia || !dependencia.cargos.length) throw new Error("No se encontraron cargos para esta dependencia.");

    const cargos = dependencia.cargos.map((cargoDep) => ({
      id: cargoDep.cargo.id,
      nombre: cargoDep.cargo.nombre,
    }));

    return { success: true, data: cargos };
  } catch (error) {
    let errorMessage = "Error al obtener los cargos de la dependencia.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const createCargoDependencia = async (dependencia_id: number, cargo_name: string): Promise<{ success: boolean; message: string }> => {
  try {
    const dependencia = await prisma.dependencia.findUnique({ where: { id: dependencia_id } });
    if (!dependencia) throw new Error("La dependencia no existe.");

    const cargo = await prisma.cargo.findUnique({ where: { nombre: cargo_name } });
    if (!cargo) throw new Error("El cargo no existe.");

    const existingRelation = await prisma.cargoDependencia.findFirst({ where: { dependenciaId: dependencia.id, cargoId: cargo.id } });
    if (existingRelation) throw new Error("El cargo ya se encuentra agregado a esta dependencia.");

    await prisma.cargoDependencia.create({ data: { dependenciaId: dependencia.id, cargoId: cargo.id } });

    return { success: true, message: "Relación creada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al crear la relación.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};

export const deleteCargoDependencia = async (dependencia_id: number, cargo_id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const relation = await prisma.cargoDependencia.findUnique({ where: { cargoId_dependenciaId: { cargoId: cargo_id, dependenciaId: dependencia_id } } });
    if (!relation) throw new Error("La relación especificada no existe.");

    await prisma.cargoDependencia.delete({ where: { id: relation.id } });

    return { success: true, message: "Relación eliminada exitosamente." };
  } catch (error: unknown) {
    let errorMessage = "Error al eliminar la relación.";
    if (error instanceof Error) errorMessage = error.message;
    return { success: false, message: errorMessage };
  }
};
