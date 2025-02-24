import { object, string, z } from "zod";
import { Status } from "@/lib/zod";
import { UbigeoSchema } from "./ubigeo.schema";

export const conyugeSchema = object({
  personalId: z.number({ required_error: "El ID del personal es requerido" }).int("El ID del personal debe ser un número entero"),
  nombres: string({ required_error: "El nombre es requerido" }),
  apellidos: string({ required_error: "El apellido es requerido" }),
  fechaNacimiento: z
    .string({ required_error: "Fecha de nacimiento es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  gradoInstruccion: string({ required_error: "El grado de instrucción es requerido" }),
  profesion: string().optional(),
  ocupacion: string(),
  centroTrabajo: string().optional(),
  postgrado: string().optional(),
  status: Status.optional(),

  ubigeo: UbigeoSchema,
});

export type ZConyuge = z.infer<typeof conyugeSchema>;
