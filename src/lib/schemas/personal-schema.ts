import { z } from "zod";
import { cargoSchema, dependenciaSchema, UbigeoSchema } from "./others-schema";
import { EstadoCivil, GradoInstruccion, GrupoSanguineo, RegimenPensionario, Sexo, SituacionLaboral } from "./enums";

export const personalSchema = z.object({
  sexo: Sexo,
  grupo_sanguineo: GrupoSanguineo,
  n_autogenerado: z.string({ required_error: "Número autogenerado es requerido" }),
  licencia_conducir: z.string().optional(),
  fecha_ingreso: z
    .string({ required_error: "Fecha de ingreso es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  anios_servicio: z.number({ required_error: "" }),
  fecha_nacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  domicilio: z.string({ required_error: "Domicilio es requerido" }),
  numero_contacto: z.string({ required_error: "Celular es requerido" }),
  unidad_estructurada: z.string({ required_error: "Unidad estructurada es requerida" }),
  regimen_pensionario: RegimenPensionario,
  situacion_laboral: SituacionLaboral,
  estado_civil: EstadoCivil,
  discapacidad: z.boolean({ required_error: "Discapacidad es requerida" }),
  numero_hijos: z.number({ required_error: "Número de hijos es requerido" }),

  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  ubigeo: UbigeoSchema,
});
export type ZPersonal = z.infer<typeof personalSchema>;

export const conyugeSchema = z.object({
  nombres: z.string({ required_error: "Nombres son requeridos" }),
  apellidos: z.string({ required_error: "Apellidos son requeridos" }),
  dni: z.string({ required_error: "DNI es requerido" }),
  fecha_nacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  ubigeo: UbigeoSchema,
  grado_instruccion: GradoInstruccion,
});
export type ZConyuge = z.infer<typeof conyugeSchema>;

export const childrenSchema = z.object({
  nombres: z.string({ required_error: "Nombres son requeridos" }),
  apellidos: z.string({ required_error: "Apellidos son requeridos" }),
  dni: z.string({ required_error: "DNI es requerido" }),
  fecha_nacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  ubigeo: UbigeoSchema,
  grado_instruccion: GradoInstruccion,
});
export type ZChildren = z.infer<typeof childrenSchema>;
