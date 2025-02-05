import { z } from "zod";

export const studiesTrainingSchema = z.object({
  nombre: z.string().nonempty("Este campo es obligatorio"),
});
