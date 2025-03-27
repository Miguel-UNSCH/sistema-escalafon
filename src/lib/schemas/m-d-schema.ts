import { z } from "zod";
import { fileSchema } from "../zod";
import { tipo_sancion } from "./enums";

export const meritoSchema = z.object({
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  motivo: z.string(),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZMerito = z.infer<typeof meritoSchema>;

export const demeritoSchema = z.object({
  user: z.object({
    name: z.string(),
    dni: z.string(),
    id: z.string(),
  }),
  tipo_sancion: tipo_sancion,
  tipo_documento: z.string(),
  asunto: z.string(),
  fecha_start: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  fecha_end: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date))
    .optional(),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZDemerito = z.infer<typeof demeritoSchema>;
