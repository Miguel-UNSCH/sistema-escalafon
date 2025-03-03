import { object, string, z } from "zod";

export const discapacidadSchema = object({
  personalId: z.string({ required_error: "el id del personal es requerido" }),
  tipo: string().min(1, "El tipo de discapacidad es obligatorio"),
  documentoSustento: string().min(1, "El documento sustento es obligatorio"),
  organoEstructurado: string().min(1, "El órgano estructurado es obligatorio"),
  condicionLaboral: string().min(1, "La condición laboral es obligatoria"),
});

export type ZDiscapacidad = z.infer<typeof discapacidadSchema>;
