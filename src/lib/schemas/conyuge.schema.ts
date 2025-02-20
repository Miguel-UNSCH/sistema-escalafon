import { object, string, z } from "zod";
import { Status } from "@/lib/zod";

export const conyugeSchema = object({
  personalId: z.number({ required_error: "El ID del personal es requerido" }).int("El ID del personal debe ser un número entero"),
  nombres: string({ required_error: "El nombre es requerido" }),
  apellidos: string({ required_error: "El apellido es requerido" }),
  departamento: string({ required_error: "El departamento es requerido" }),
  provincia: string({ required_error: "La provincia es requerida" }),
  distrito: string({ required_error: "El distrito es requerido" }),
  fechaNacimiento: string().transform((str) => new Date(str)),
  gradoInstruccion: string({ required_error: "El grado de instrucción es requerido" }),
  profesion: string().optional(),
  ocupacion: string().optional(),
  centroTrabajo: string().optional(),
  postgrado: string().optional(),
  status: Status.optional(),
});

export type Conyuge = z.infer<typeof conyugeSchema>;
