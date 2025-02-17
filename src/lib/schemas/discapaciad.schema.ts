import { object, string, z } from "zod";
import { Status } from "../zod";

export const discapacidadSchema = object({
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  tipo: string().min(1, "El tipo de discapacidad es obligatorio"),
  documentoSustento: string().min(1, "El documento sustento es obligatorio"),
  organoEstructurado: string().min(1, "El órgano estructurado es obligatorio"),
  condicionLaboral: string().min(1, "La condición laboral es obligatoria"),
  status: Status.optional(),
});

export type Discapacidad = z.infer<typeof discapacidadSchema>;
