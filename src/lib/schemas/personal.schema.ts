import { object, string, number, date, boolean, z } from "zod";

enum EstadoCivil {
  S = "S",
  C = "C",
  D = "D",
  V = "V",
}

enum GrupoSanguineo {
  A_POSITIVO = "A_POSITIVO",
  A_NEGATIVO = "A_NEGATIVO",
  B_POSITIVO = "B_POSITIVO",
  B_NEGATIVO = "B_NEGATIVO",
  AB_POSITIVO = "AB_POSITIVO",
  AB_NEGATIVO = "AB_NEGATIVO",
  O_POSITIVO = "O_POSITIVO",
  O_NEGATIVO = "O_NEGATIVO",
}

enum Sexo {
  M = "M",
  F = "F",
}

enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const personalSchema = object({
  userId: string().min(1, "El ID de usuario es obligatorio"),
  sexo: z.enum([Sexo.M, Sexo.F]),
  edad: number().int().positive("La edad debe ser un número positivo"),
  dni: string().min(1, "El DNI es obligatorio").max(20, "El DNI debe tener un máximo de 20 caracteres"),
  nAutogenerado: string().min(1, "El número autogenerado es obligatorio"),
  licenciaConducir: string().optional(),
  grupoSanguineo: z.enum([
    GrupoSanguineo.A_POSITIVO,
    GrupoSanguineo.A_NEGATIVO,
    GrupoSanguineo.B_POSITIVO,
    GrupoSanguineo.B_NEGATIVO,
    GrupoSanguineo.AB_POSITIVO,
    GrupoSanguineo.AB_NEGATIVO,
    GrupoSanguineo.O_POSITIVO,
    GrupoSanguineo.O_NEGATIVO,
  ]),
  fechaIngreso: date().refine((date) => !isNaN(date.getTime()), "La fecha de ingreso es inválida"),
  unidadEstructurada: string().min(1, "La unidad estructurada es obligatoria"),
  fechaNacimiento: date().refine((date) => !isNaN(date.getTime()), "La fecha de nacimiento es inválida"),
  nacionalidad: string().min(1, "La nacionalidad es obligatoria"),
  domicilio: string().min(1, "El domicilio es obligatorio"),
  interiorUrbanizacion: string().optional(),
  telefono: string().optional(),
  celular: string().min(1, "El celular es obligatorio"),
  regimenPensionario: string().min(1, "El régimen pensionario es obligatorio"),
  nombreAfp: string().optional(),
  situacionLaboral: string().min(1, "La situación laboral es obligatoria"),
  estadoCivil: z.enum([EstadoCivil.S, EstadoCivil.C, EstadoCivil.D, EstadoCivil.V]),
  discapacidad: boolean(),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Valor por defecto 'ENABLED'
  cargoId: number().int().positive("El ID del cargo debe ser un número positivo"),
  dependenciaOficinaId: number().int().positive("El ID de la dependencia de oficina debe ser un número positivo"),
  discapacidadId: number().optional(),
  conyugeId: number().optional(), // Relación opcional con Conyuge
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type Personal = z.infer<typeof personalSchema>;
