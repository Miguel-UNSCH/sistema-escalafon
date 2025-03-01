import { z } from "zod";
import { UbigeoSchema } from "./ubigeo.schema";
import { GradoInstruccion } from "../zod";

export const hijoSchema = z.object({
  personalId: z.string(),
  nombres: z.string(),
  apellidos: z.string(),
  fechaNacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  gradoInstruccion: GradoInstruccion,

  ubigeo: UbigeoSchema,
});

export type ZHijo = z.infer<typeof hijoSchema>;
