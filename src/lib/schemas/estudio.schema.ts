import { z } from "zod";

const periodoSchema = z.object({
  from: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
  to: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
});

export const estudioSchema = z.object({
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  nivel: z.string().min(3, "El nivel de estudios es obligatorio"),
  periodo: periodoSchema, // Se valida como un objeto JSON con { from, to }
  institucion: z.string().min(3, "El nombre de la institución es obligatorio"),
  otrosEstudios: z.string().optional(),
});

export type ZEstudio = z.infer<typeof estudioSchema>;
