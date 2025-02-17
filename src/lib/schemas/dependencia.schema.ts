import { z, object } from "zod";

export const dependenciaSchema = object({
  nombre: z.string({ required_error: "Nombre es requerido" }).min(3, "Nombre debe tener como minimo 3 caracteres"),
  direccion: z.string().min(3, "Direccion debe tener como minimo 3 caracteres").optional(),
  codigo: z.string().min(3, "Codigo debe tener como minimo 3 caracteres").optional(),
});

export type Dependencia = z.infer<typeof dependenciaSchema>;
