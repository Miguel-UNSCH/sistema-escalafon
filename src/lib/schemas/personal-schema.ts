import { z } from "zod";
import { UbigeoSchema } from "./others-schema";
import { EstadoCivil, GradoInstruccion, GrupoSanguineo, Sexo } from "./enums";

export const personalSchema = z
  .object({
    sexo: Sexo,
    grupo_sanguineo: GrupoSanguineo,
    n_autogenerado: z.string({ required_error: "Número autogenerado es requerido" }),
    licencia_conducir: z.string().optional(),
    fecha_ingreso: z
      .string({ required_error: "Fecha de ingreso es requerida" })
      .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
      .transform((date) => new Date(date)),
    fecha_nacimiento: z
      .string({ required_error: "Fecha de nacimiento es requerida" })
      .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
      .transform((date) => new Date(date)),
    domicilio: z.string({ required_error: "Domicilio es requerido" }),
    numero_contacto: z.string({ required_error: "Celular es requerido" }),
    estado_civil: EstadoCivil,
    discapacidad: z.boolean({ required_error: "Discapacidad es requerida" }),
    numero_hijos: z
      .string({ required_error: "Número de hijos es requerido" })
      .refine((val) => /^[0-9]+$/.test(val), {
        message: "Solo se permiten números positivos",
      })
      .transform((val) => Number(val))
      .refine((val) => val >= 1 && val <= 10, {
        message: "El número de hijos debe estar entre 1 y 10",
      }),
    ubigeo: UbigeoSchema,
  })
  .superRefine((data, ctx) => {
    const { fecha_ingreso, fecha_nacimiento } = data;
    const edadMinima = 18;
    const diffAnios = fecha_ingreso.getFullYear() - fecha_nacimiento.getFullYear();
    const cumpleEdadMinima =
      diffAnios > edadMinima ||
      (diffAnios === edadMinima &&
        (fecha_ingreso.getMonth() > fecha_nacimiento.getMonth() ||
          (fecha_ingreso.getMonth() === fecha_nacimiento.getMonth() && fecha_ingreso.getDate() >= fecha_nacimiento.getDate())));

    if (!cumpleEdadMinima) {
      ctx.addIssue({
        path: ["fecha_ingreso"],
        code: z.ZodIssueCode.custom,
        message: "La fecha de ingreso debe ser al menos 18 años después de la fecha de nacimiento.",
      });
    }
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
