import { z } from "zod";

const periodoSchema = z.object({
  from: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
  to: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date()),
});

export const capacitacionSchema = z.object({
  personalId: z.number().min(1, "El ID del personal es obligatorio"),
  centroCapacitacion: z.string().min(1, "El centro de capacitación es obligatorio"),
  materia: z.string().min(1, "La materia es obligatoria"),
  especialidad: z.string().min(1, "La especialidad es obligatoria"),
  periodo: periodoSchema, // Se valida como un objeto JSON con { from, to }
  horasLectivas: z.number().min(1, "Las horas lectivas deben ser un número positivo"),
  fechaEmision: z
    .string({ required_error: "Fecha de emision" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  certificadoPdf: z.string().min(1, "El enlace al certificado PDF es obligatorio"),
});

export type ZCapacitacion = z.infer<typeof capacitacionSchema>;
