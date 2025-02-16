import { object, string, date, optional, z } from "zod";

export const conyugeSchema = object({
  personalId: string().min(1, "El ID del personal es obligatorio"),
  fechaNacimiento: date().min(new Date(1950, 0, 1), "La fecha de nacimiento debe ser válida"),
  gradoInstruccion: string().min(1, "El grado de instrucción es obligatorio"),
  profesion: optional(string().min(1, "La profesión es obligatoria")),
  ocupacion: optional(string().min(1, "La ocupación es obligatoria")),
  centroTrabajo: optional(string().min(1, "El centro de trabajo es obligatorio")),
  postgrado: optional(string().min(1, "El postgrado es obligatorio")),
});

export type Conyuge = z.infer<typeof conyugeSchema>;
