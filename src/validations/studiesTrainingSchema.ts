import { z } from "zod";
// sera necesario los apellidos si se supone que esta logueado y que solo puede registrar una vez, la edicion de datos
export const studiesTrainingSchema = z.object({
  centroCapacitacion: z.string().nonempty("Este campo es obligatorio"),
  materiaCapacitacion: z.string().nonempty("Este campo es obligatorio"),
  profesionEspecialidad: z.string().nonempty("Este campo es obligatorio"),
  periodoInicio: z.date(),
  periodoFin: z.date(),
  horasLectivas: z.number().int().min(1, "El valor mínimo es 1"),
  fechaEmisionCertificado: z.date(),
  certificadoEscaneado: z.string().nonempty("Este campo es obligatorio"),
});
