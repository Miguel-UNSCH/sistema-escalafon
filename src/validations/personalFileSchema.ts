import { z } from "zod";

export const capacitacionSchema = z.object({
  centroCapacitacion: z.string().nonempty("Este campo es obligatorio"),
  materia: z.string().nonempty("Este campo es obligatorio"),
  especialidad: z.string().nonempty("Este campo es obligatorio"),
  peridoInicio: z.string().nonempty("Este campo es obligatorio"),
  periodoFin: z.string().nonempty("Este campo es obligatorio"),
  horasLectivas: z.string().nonempty("Este campo es obligatorio"),
  fechaEmision: z.string().nonempty("Este campo es obligatorio"),
  // certificadoEscaneado: z.optional(z.string().url("La URL no es válida")),
});
