import { z } from "zod";
import { cargoSchema, dependenciaSchema } from "./others-schema";
import { fileSchema } from "../zod";

export const meritoSchema = z.object({
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema,
});
export type ZMerito = z.infer<typeof meritoSchema>;

export const demeritoSchema = z.object({});
export type ZDemerito = z.infer<typeof demeritoSchema>;
