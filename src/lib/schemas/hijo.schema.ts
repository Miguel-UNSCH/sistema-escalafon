import { z } from "zod";
import { UbigeoSchema } from "./ubigeo.schema";
import { Status } from "../zod";

export const hijoSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  inei: z.string().optional(),
  reniec: z.string().optional(),
  departamento: z.string().optional(),
  provincia: z.string().optional(),
  distrito: z.string().optional(),
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  fechaNacimiento: z.string(),
  edad: z.number().int().min(0, "La edad no puede ser negativa"),
  gradoInstruccion: z.string().min(1, "El grado de instrucción es obligatorio"),
  status: Status.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ubigeo: UbigeoSchema,
});

export type Hijo = z.infer<typeof hijoSchema>;
