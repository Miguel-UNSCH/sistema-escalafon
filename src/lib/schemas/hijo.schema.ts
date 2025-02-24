import { z } from "zod";
import { UbigeoSchema } from "./ubigeo.schema";

export const hijoSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  fechaNacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  gradoInstruccion: z.string().min(1, "El grado de instrucción es obligatorio"),

  ubigeo: UbigeoSchema,
});

export type ZHijo = z.infer<typeof hijoSchema>;
