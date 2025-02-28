import { object, string, z } from "zod";
import { UbigeoSchema } from "./ubigeo.schema";
import { GradoInstruccion } from "../zod";

export const conyugeSchema = object({
  personalId: z.string({ required_error: "el id del personal es requerido" }),
  nombres: string({ required_error: "El nombre es requerido" }),
  apellidos: string({ required_error: "El apellido es requerido" }),
  fechaNacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  gradoInstruccion: GradoInstruccion,
  profesion: string().optional(),
  ocupacion: string(),
  centroTrabajo: string().optional(),
  postgrado: string().optional(),

  ubigeo: UbigeoSchema,
});

export type ZConyuge = z.infer<typeof conyugeSchema>;
