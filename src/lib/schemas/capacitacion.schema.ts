import { object, string, number, date, z } from "zod";

export const capacitacionSchema = object({
  personalId: string().min(1, "El ID del personal es obligatorio"),
  centroCapacitacion: string().min(1, "El centro de capacitación es obligatorio"),
  materia: string().min(1, "La materia es obligatoria"),
  especialidad: string().min(1, "La especialidad es obligatoria"),
  periodo: string()
    .regex(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/, "El formato del periodo debe ser 'dd/mm/yyyy - dd/mm/yyyy'")
    .min(1, "El periodo es obligatorio"),
  horasLectivas: number().min(1, "Las horas lectivas deben ser un número positivo"),
  fechaEmision: date().min(new Date(1900, 0, 1), "La fecha de emisión debe ser válida"),
  certificadoPdf: string().min(1, "El enlace al certificado PDF es obligatorio"),
});

export type Capacitacion = z.infer<typeof capacitacionSchema>;
