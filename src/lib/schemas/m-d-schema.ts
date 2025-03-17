import { z } from "zod";
import { cargoSchema, dependenciaSchema } from "./others-schema";
import { fileSchema, userSchema } from "../zod";

export const meritoSchema = z.object({
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema.optional(),
});
export type ZMerito = z.infer<typeof meritoSchema>;

export const tipo_sancion_z = z.enum(["sgl", "amo", "ppe", "nin"]);

export const demeritoSchema = z.object({
  user: userSchema,
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  tipo_sancion: tipo_sancion_z,
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema,
});
export type ZDemerito = z.infer<typeof demeritoSchema>;
